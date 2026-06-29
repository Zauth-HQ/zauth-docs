import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Browser Extension — Cryptography',
};

export default function BrowserExtensionCryptographyPage() {
  return (
    <Prose>
      <h1>Cryptography</h1>
      <p>
        The extension relies on four cryptographic primitives: VOPRF blind token issuance, DLEQ proofs for
        attester accountability, AES-GCM vault encryption, and Noir ZK circuits for domain nullifiers and
        attribute proofs.
      </p>

      <h2>VOPRF — RFC 9530 (secp256k1)</h2>
      <p>
        Zauth implements <strong>Verifiable Oblivious Pseudo-Random Functions</strong> as specified in RFC
        9530 using the <strong>secp256k1</strong> elliptic curve (via <code>@noble/curves</code>).
      </p>

      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>RSA Blind Sig (RFC 9474)</th>
            <th>VOPRF secp256k1 (RFC 9530)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Key size</td><td>2048–4096 bits</td><td>32 bytes</td></tr>
          <tr><td>Signature size</td><td>256–512 bytes</td><td>33 bytes (compressed point)</td></tr>
          <tr><td>Constant-time</td><td>No (BigInt timing leaks)</td><td>Yes (@noble/curves)</td></tr>
          <tr><td>Attester accountability</td><td>None</td><td>DLEQ proof</td></tr>
          <tr><td>JS performance</td><td>Slow (modular exponentiation)</td><td>Fast (EC scalar mul)</td></tr>
        </tbody>
      </table>

      <h3>Protocol steps</h3>
      <CodeBlock
        code={`Client (Extension / Portal)                    Attester Node
──────────────────────────────                 ──────────────────────────────
token t  = random 32 bytes
T        = hashToCurve(t)          // RFC 9380
r        = random scalar
T_blind  = T * r       ──── T_blind ────>     Verify zkVerify receipt
                                               Z = T_blind * k
                                               DLEQ proof (c, s):
                                                 A = G*t,  B = T_blind*t
                                                 c = H(G, PK, T_blind, Z, A, B)
                                                 s = t - c*k mod n
                       <──── Z, (c,s) ────
Verify DLEQ:
  A' = G*s + PK*c
  B' = T_blind*s + Z*c
  assert H(G, PK, T_blind, Z, A', B') == c
N = Z * r⁻¹            // unblind
store (t, N)            // unblinded token-signature pair`}
      />

      <h2>DLEQ Proof — Attester Accountability</h2>
      <p>
        The DLEQ (Discrete Logarithm Equality) proof lets the client verify that the attester used the
        same private key <em>k</em> to compute both <code>PK = G·k</code> (the public key) and{' '}
        <code>Z = T_blind·k</code> (the evaluated token). Without this, a malicious attester could issue
        tokens using a different key per user, enabling deanonymization.
      </p>

      <h2>Vault Encryption</h2>
      <p>
        The token store, proxy preferences, and shielded credentials are stored encrypted in{' '}
        <code>chrome.storage.local</code>.
      </p>
      <CodeBlock
        code={`// Key derivation (Offscreen Document — avoids SW termination mid-operation)
const keyMaterial = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveKey']);
const vaultKey = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
  keyMaterial,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt', 'decrypt'],
);

// Encryption
const iv = crypto.getRandomValues(new Uint8Array(12));
const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, vaultKey, plaintext);`}
      />
      <p>
        PBKDF2 runs 100,000 iterations in the <strong>Offscreen Document</strong> — not the service worker
        — because MV3 service workers can be terminated mid-computation, which would corrupt a partial
        key derivation.
      </p>

      <h2>Noir Circuits — Domain Nullifiers</h2>
      <p>
        To prevent a single token from being spent across multiple domains, each spend generates a
        domain-scoped nullifier using a Noir circuit:
      </p>
      <CodeBlock
        code={`// Noir circuit (simplified)
fn main(
    token_secret: Field,     // private: raw token t
    domain_salt: pub Field,  // public: Poseidon(domain)
) -> pub Field {             // returns: nullifier
    let nullifier = poseidon2([token_secret, domain_salt]);
    nullifier
}`}
      />
      <p>
        The nullifier is stored on-chain via zkVerify attestation. A second spend attempt on the same
        domain produces the same nullifier, which the verifier rejects. Across different domains, the
        nullifier is unlinkable.
      </p>

      <h2>Anti-Fingerprinting Shields</h2>
      <p>
        The content script applies additional browser fingerprinting mitigations at the page level:
      </p>
      <ul>
        <li>
          <strong>WebRTC leak prevention</strong> — overrides <code>RTCPeerConnection</code> to block
          local IP exposure via ICE candidates.
        </li>
        <li>
          <strong>Canvas noise</strong> — injects deterministic noise into <code>canvas.toDataURL()</code>{' '}
          and <code>getImageData()</code> to break canvas fingerprinting without breaking rendering.
        </li>
        <li>
          <strong>Navigator spoofing</strong> — normalizes <code>navigator.userAgent</code>,{' '}
          <code>navigator.platform</code>, and <code>navigator.hardwareConcurrency</code> to common baseline
          values.
        </li>
      </ul>
    </Prose>
  );
}
