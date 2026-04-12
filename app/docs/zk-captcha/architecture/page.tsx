import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Architecture',
};

export default function ArchitecturePage() {
  return (
    <Prose>
      <h1>ZK CAPTCHA architecture</h1>
      <p>
        The system ties together a browser-side prover (<code>@zauth/captcha-sdk</code>), a stateful API, and
        zkVerify for on-chain verification. This page summarizes how those pieces cooperate.
      </p>
      <h2>Request flow</h2>
      <pre>
        <code>{`User Browser          App Backend           zkVerify
    │                      │                      │
    │ 1. Request challenge │                      │
    │─────────────────────>│                      │
    │ 2. Challenge + nonce │                      │
    │<─────────────────────│                      │
    │ 3. Generate ZK proof │                      │
    │    (WASM / Noir)     │                      │
    │ 4. Submit proof      │                      │
    │─────────────────────>│                      │
    │                      │ 5. Verify proof      │
    │                      │─────────────────────>│
    │                      │ 6. Receipt / result  │
    │                      │<─────────────────────│
    │ 7. JWT / session     │                      │
    │<─────────────────────│                      │`}</code>
      </pre>
      <h2>Component roles</h2>
      <h3>Circuits (source of truth)</h3>
      <p>
        Noir describes the relation between a secret, the challenge nonce, difficulty, and public inputs.
        Barretenberg produces UltraHonk proofs and a verification key sized and hashed for zkVerify (ZK
        variant, Keccak oracle — see <Link href="/docs/zk-captcha/circuits">Circuits &amp; proving</Link>).
      </p>
      <h3>SDK (client)</h3>
      <p>
        TypeScript core loads circuit artifacts, drives witness generation and proving in the browser, and
        calls your backend. React apps can use <code>useZkCaptcha</code> from{' '}
        <code>@zauth/captcha-sdk/react</code> (<Link href="/docs/zk-captcha/sdk">SDK docs</Link>).
      </p>
      <h3>Backend (validator / issuer)</h3>
      <p>
        Persists challenges in <strong>Redis</strong>, validates requests, forwards proofs to zkVerify
        (UltraHonk pipeline), and mints <strong>JWTs</strong> after success. See{' '}
        <Link href="/docs/zk-captcha/backend">Backend &amp; zkVerify</Link>.
      </p>
      <h2>Security notes</h2>
      <ul>
        <li>Nonces are cryptographically random and time-limited (TTL in Redis).</li>
        <li>Proof verification is anchored on zkVerify, not only server-side heuristics.</li>
        <li>JWTs should use strong secrets and short expirations in production.</li>
        <li>The design avoids behavioral fingerprinting typical of legacy CAPTCHAs.</li>
      </ul>
    </Prose>
  );
}
