import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLinks } from '@/components/ExternalLinks';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'ZK CAPTCHA',
};

export default function ZkCaptchaOverviewPage() {
  return (
    <Prose>
      <h1>ZK CAPTCHA overview</h1>
      <p>
        ZK CAPTCHA is a <strong>privacy-preserving</strong> alternative to visual CAPTCHAs. Users complete a
        cryptographic flow that shows they performed real work tied to a server-issued challenge, without
        fingerprinting or third-party tracking. Proofs are verified through{' '}
        <strong>zkVerify</strong> (UltraHonk on Volta testnet in current integrations).
      </p>
      <ExternalLinks />
      <h2>Monorepo layout (<code>zauth-captcha</code>)</h2>
      <pre>
        <code>{`zauth-captcha/
├── backend/     # Express API — challenges, verify, zkVerify, JWT, Redis
├── circuits/    # Noir circuit + Barretenberg UltraHonk artifacts
├── sdk/         # @zauth/captcha-sdk (core + React)
└── docs/        # Deep-dive markdown (source for these pages)`}</code>
      </pre>
      <h2>End-to-end flow</h2>
      <ol>
        <li>Client requests a <strong>challenge</strong> (<code>POST /api/challenge</code>).</li>
        <li>Backend stores a nonce in <strong>Redis</strong> and returns challenge metadata.</li>
        <li>
          Browser runs the <strong>SDK</strong>: loads circuit artifacts / WASM, builds a witness, produces an
          UltraHonk proof locally.
        </li>
        <li>
          Client calls <strong>verify</strong> (<code>POST /api/verify</code>); backend checks the challenge,
          normalizes proof/VK, and submits to <strong>zkVerify</strong>.
        </li>
        <li>On success, backend issues a short-lived <strong>JWT</strong> (or session) for your app.</li>
      </ol>
      <h2>Where to read next</h2>
      <ul>
        <li>
          <Link href="/docs/zk-captcha/architecture">Architecture</Link> — diagram and component roles.
        </li>
        <li>
          <Link href="/docs/zk-captcha/circuits">Circuits &amp; proving</Link> — Noir, bb flags, zkVerify
          constraints.
        </li>
        <li>
          <Link href="/docs/zk-captcha/backend">Backend &amp; zkVerify</Link> — services, env vars, UltraHonk
          API.
        </li>
        <li>
          <Link href="/docs/zk-captcha/sdk">Captcha SDK</Link> — npm install, <code>ZkCaptcha</code>,{' '}
          <code>useZkCaptcha</code>.
        </li>
        <li>
          <Link href="/docs/zk-captcha/api">REST API</Link> — challenge, verify, health.
        </li>
      </ul>
    </Prose>
  );
}
