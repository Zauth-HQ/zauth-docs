import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Browser Extension — Overview',
};

export default function BrowserExtensionOverviewPage() {
  return (
    <Prose>
      <h1>Browser Extension</h1>
      <p>
        The <strong>Zauth Browser Extension</strong> is a Chrome (Manifest V3) extension that acts as a
        zero-knowledge sidecar for everyday browsing. It runs silently in the background, generating and
        spending ZK proofs on behalf of the user — no manual steps, no visual puzzles, no raw data ever
        sent to third parties.
      </p>
      <p>
        Privacy is delivered through three independent shields that users can toggle from the popup:
      </p>

      <h2>The three privacy shields</h2>

      <h3>1. ZK-Pass — Anonymous Token Wallet</h3>
      <p>
        Replaces CAPTCHA challenges and anti-bot checks with cryptographically unlinkable tokens. The user
        generates a ZK proof <em>once</em> in a standard browser tab (the Proving Portal), receives a batch
        of <strong>VOPRF-blinded tokens</strong>, and the extension spends them silently whenever a partner
        site requests verification. The host site verifies a token signature in under 1 ms; the blinding
        protocol ensures the attester and the verifier can never correlate which user spent which token.
      </p>

      <h3>2. Private Proxy (dVPN)</h3>
      <p>
        A single toggle routes all browser traffic through a privacy-preserving SOCKS5 proxy node. Proxy
        access is gated by a zkVerify on-chain receipt — preventing botnet abuse while keeping zero logs of
        user identities. The extension uses Chrome&apos;s <code>proxy</code> API to apply routing without
        leaving the MV3 sandbox.
      </p>

      <h3>3. Credential Shield</h3>
      <p>
        Content scripts intercept HTML form submissions. Instead of sending a raw email, age, or wallet
        address, the extension substitutes a ZK proof of the attribute claim (e.g.{' '}
        <em>&quot;age &gt; 18&quot;</em>, <em>&quot;verified account&quot;</em>). The website receives
        a zkVerify attestation receipt; the underlying data never leaves the device.
      </p>

      <h2>Key design decisions</h2>
      <ul>
        <li>
          <strong>No heavy WASM in the service worker.</strong> MV3 service workers are ephemeral and can be
          killed mid-computation. All multi-threaded proving runs in a dedicated Proving Portal tab with full
          COOP/COEP isolation headers.
        </li>
        <li>
          <strong>Offscreen document for long-running crypto.</strong> PBKDF2 key derivation and AES-GCM
          vault operations are delegated to a hidden offscreen document that survives popup close and service
          worker termination.
        </li>
        <li>
          <strong>VOPRF over RSA blind signatures.</strong> secp256k1 scalar multiplication via{' '}
          <code>@noble/curves</code> is constant-time, produces 33-byte signatures (vs 256–512 bytes for
          RSA), and includes a DLEQ proof so the client can verify the attester used a consistent key.
        </li>
        <li>
          <strong>zkVerify for verification.</strong> Proofs settle on zkVerify&apos;s Substrate chain in
          under one second at a fraction of the gas cost of on-EVM verification.
        </li>
      </ul>

      <h2>Where to read next</h2>
      <ul>
        <li>
          <Link href="/docs/browser-extension/architecture">Architecture</Link> — MV3 component diagram,
          IPC protocol, and component responsibilities.
        </li>
        <li>
          <Link href="/docs/browser-extension/shields">Privacy Shields</Link> — Deep dive into ZK-Pass,
          dVPN proxy, and Credential Shield flows.
        </li>
        <li>
          <Link href="/docs/browser-extension/cryptography">Cryptography</Link> — VOPRF (RFC 9530), DLEQ
          proofs, vault encryption, and Noir domain nullifiers.
        </li>
        <li>
          <Link href="/docs/browser-extension/zkverify">zkVerify Integration</Link> — How proofs are
          submitted, aggregated, and attested on-chain.
        </li>
      </ul>
    </Prose>
  );
}
