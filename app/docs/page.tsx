import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Introduction',
};

export default function IntroductionPage() {
  return (
    <Prose>
      <h1>Introduction</h1>
      <p>
        Zauth is building a <strong>full-stack privacy layer</strong> for the web, powered by{' '}
        <a href="https://zkverify.io" target="_blank" rel="noreferrer">
          zkVerify
        </a>
        . Users prove attributes, bypass friction, and browse privately — without exposing emails, IPs, raw
        credentials, or behavioral data. ZK proofs are generated locally; verification settles through
        zkVerify in under one second at near-zero cost.
      </p>

      <h2>What we have built</h2>

      <h3>
        <Link href="/docs/browser-extension">Browser Extension</Link>
      </h3>
      <p>
        A Chrome (MV3) extension that acts as a ZK sidecar for everyday browsing. Three privacy shields run
        silently in the background:
      </p>
      <ul>
        <li>
          <strong>ZK-Pass</strong> — Unlinkable VOPRF tokens that bypass CAPTCHAs and anti-bot checks
          automatically. Users prove humanity once; the extension spends tokens silently on every partner
          site thereafter.
        </li>
        <li>
          <strong>Private Proxy (dVPN)</strong> — One toggle routes all traffic through a SOCKS5 privacy
          node. Access is gated by a zkVerify receipt so the proxy network cannot be abused, and no
          browsing logs are kept.
        </li>
        <li>
          <strong>Credential Shield</strong> — Form submissions are intercepted and raw field values are
          replaced with ZK proofs of the attribute claim. The site gets a zkVerify attestation; the
          underlying data never leaves the device.
        </li>
      </ul>
      <p>
        See the <Link href="/docs/browser-extension">Browser Extension docs</Link> for architecture,
        cryptography, and zkVerify integration details.
      </p>

      <h3>
        <Link href="/docs/zk-captcha">ZK CAPTCHA</Link>
      </h3>
      <p>
        A privacy-preserving drop-in replacement for reCAPTCHA / hCaptcha. Noir UltraHonk circuits prove
        human interaction on-chain via zkVerify. Ships with a TypeScript SDK and React component —
        integrate in minutes with any Node, Python, or Go backend.
      </p>

      <h3>Identity & Proof Engine (<code>zauth-identity</code>)</h3>
      <p>
        Generates ZK proofs of real-world claims — verified account, age, domain ownership, unique person —
        using zkTLS (Reclaim-style) to bind proofs to authentic Web2 data. Nullifiers prevent Sybil
        attacks: one identity can act once per context, no matter how many sessions it opens.
      </p>

      <h3>Verification & Attestation Layer (<code>zauth-verify</code>)</h3>
      <p>
        The shared backend all Zauth products plug into. Relays proofs to zkVerify, handles proof
        aggregation to reduce per-proof cost, anchors attestations on-chain, and exposes a two-call
        developer SDK: <code>requestProof(claim)</code> on the client and{' '}
        <code>verifyAttestation(token)</code> on the server.
      </p>

      <h2>How the pieces connect</h2>
      <ol>
        <li>
          A user interacts with a Zauth-enabled surface (extension popup, CAPTCHA widget, identity gate).
        </li>
        <li>
          A ZK proof is generated locally — in the browser via <code>bb.js</code> WASM, or delegated to
          a TEE prover for heavier circuits.
        </li>
        <li>
          The proof is submitted to <strong>zkVerify</strong> (Volta testnet / mainnet). Verification
          completes in &lt; 1 second; an on-chain attestation receipt is returned.
        </li>
        <li>
          The receipt is consumed by the relevant product layer — attester node issues tokens, proxy
          node grants access, partner backend verifies the claim — with zero knowledge of the underlying
          user data.
        </li>
      </ol>

      <h2>Repositories</h2>
      <ul>
        <li>
          <code>zauth-browser</code> — Chrome MV3 extension + Proving Portal (Next.js) + Attester
          Node (Express + zkVerify).
        </li>
        <li>
          <code>zauth-captcha</code> — Noir circuits, Node API, Redis, JWT issuance, and the published{' '}
          <a href="https://www.npmjs.com/package/@zauth/captcha-sdk" target="_blank" rel="noreferrer">
            <code>@zauth/captcha-sdk</code>
          </a>{' '}
          npm package.
        </li>
        <li>
          <code>zauth-identity</code> — Noir attribute circuits, zkTLS adapters, WASM prover.
        </li>
        <li>
          <code>zauth-verify</code> — zkVerify relayer, attestation registry, cross-app developer SDK.
        </li>
        <li>
          <code>zauth-docs</code> — This documentation site (Next.js App Router).
        </li>
      </ul>
    </Prose>
  );
}
