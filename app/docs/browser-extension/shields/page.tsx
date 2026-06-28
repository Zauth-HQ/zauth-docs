import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Browser Extension — Privacy Shields',
};

export default function BrowserExtensionShieldsPage() {
  return (
    <Prose>
      <h1>Privacy Shields</h1>
      <p>
        The extension delivers privacy through three independent shields. Each can be toggled separately
        from the popup. They share the same vault and zkVerify attestation backend but operate at
        different layers of the browsing stack.
      </p>

      <h2>Shield 1 — ZK-Pass (Anonymous Token Wallet)</h2>
      <p>
        <strong>Goal:</strong> Bypass CAPTCHA and anti-bot checks instantly, with zero cross-site tracking.
      </p>

      <h3>How it works</h3>
      <ol>
        <li>
          The user visits the <strong>Proving Portal</strong> once. The portal generates a Noir ZK proof
          (UltraHonk) proving the user completed a valid interaction.
        </li>
        <li>
          The portal sends the proof to the <strong>Attester Node</strong> along with a batch of blinded
          EC points (<code>T_blind = hashToCurve(token) * r</code>).
        </li>
        <li>
          The attester verifies the zkVerify on-chain receipt, then evaluates each blinded point with its
          private key and returns the VOPRF output + DLEQ proof.
        </li>
        <li>
          The portal unblinds the tokens (<code>N = Z * r⁻¹</code>), verifies the DLEQ proof, and
          transfers the token batch to the extension service worker via <code>chrome.runtime.sendMessage</code>.
        </li>
        <li>
          When a partner site calls the Zauth verification endpoint, the content script intercepts the
          challenge, the service worker selects an unspent token, and spends it. The site verifies the
          token signature in <strong>under 1 ms</strong>.
        </li>
      </ol>

      <h3>Privacy guarantee</h3>
      <p>
        Blinding ensures the attester never sees which token corresponds to which user session. The verifier
        sees only a valid signature — it cannot link the token back to the issuance event or to any other
        token spend. Tokens are <strong>single-use</strong> and domain-salted to prevent replay across sites.
      </p>

      <CodeBlock
        code={`// Simplified token spend (Service Worker)
async function spendToken(domain: string): Promise<string> {
  const token = vault.getUnspentToken(domain);
  if (!token) throw new Error('No tokens — visit portal to mint more');
  vault.markSpent(token.id);
  return token.signature; // 33-byte compressed secp256k1 point
}`}
      />

      <h2>Shield 2 — Private Proxy (dVPN)</h2>
      <p>
        <strong>Goal:</strong> Hide the user&apos;s IP address and prevent ISP-level traffic logging.
      </p>

      <h3>How it works</h3>
      <ol>
        <li>
          The user generates a zkVerify subscription receipt proving they hold a valid Zauth pass
          (or completed a humanity check).
        </li>
        <li>
          The extension fetches an available SOCKS5 proxy node from the <strong>Proxy Registry</strong>,
          presenting the receipt for access control.
        </li>
        <li>
          The service worker applies proxy settings via Chrome&apos;s <code>chrome.proxy</code> API. All
          browser traffic is routed through the proxy node for the duration of the session.
        </li>
        <li>
          The proxy node verifies the zkVerify receipt on each connection but keeps <strong>zero logs</strong>{' '}
          of user IP or browsing activity.
        </li>
      </ol>

      <CodeBlock
        code={`// Proxy activation (Service Worker)
chrome.proxy.settings.set({
  value: {
    mode: 'fixed_servers',
    rules: { singleProxy: { scheme: 'socks5', host: node.host, port: node.port } },
  },
  scope: 'regular',
});`}
      />

      <h2>Shield 3 — Credential Shield (Form Interception)</h2>
      <p>
        <strong>Goal:</strong> Prevent websites from capturing raw sensitive data submitted via HTML forms.
      </p>

      <h3>How it works</h3>
      <ol>
        <li>
          The content script scans the DOM for forms with sensitive fields (email, date of birth, wallet
          address, phone number) using configurable field-type heuristics.
        </li>
        <li>
          On form submit, the content script intercepts the event (<code>preventDefault</code>) and
          sends the field values to the service worker via IPC.
        </li>
        <li>
          The service worker dispatches a proof request to the Proving Portal (or a TEE-based prover
          for heavier circuits), generating a ZK proof of the attribute claim (e.g.{' '}
          <em>&quot;email domain = verified&quot;</em>, <em>&quot;age &gt; 18&quot;</em>).
        </li>
        <li>
          The proof is submitted to zkVerify. The resulting attestation receipt is injected back into the
          form as a hidden field and the form is re-submitted — raw data replaced with the ZK receipt.
        </li>
      </ol>

      <h3>User experience</h3>
      <p>
        A confirmation overlay appears before any field is intercepted, showing exactly which fields will
        be shielded and what claim will be proved. The user can approve or dismiss per-form. After
        approval, subsequent submits on the same site are automatic.
      </p>

      <CodeBlock
        code={`// Content script — form interception
document.addEventListener('submit', async (e) => {
  const form = e.target as HTMLFormElement;
  if (!shieldConfig.shouldIntercept(form)) return;
  e.preventDefault();
  const receipt = await chrome.runtime.sendMessage({ type: 'SHIELD_FORM', fields: extractFields(form) });
  injectReceipt(form, receipt);
  form.submit();
}, { capture: true });`}
      />
    </Prose>
  );
}
