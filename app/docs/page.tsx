import type { Metadata } from 'next';
import { ExternalLinks } from '@/components/ExternalLinks';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Introduction',
};

export default function IntroductionPage() {
  return (
    <Prose>
      <h1>Introduction</h1>
      <p>
        Zauth is building <strong>confidential browsing</strong> on top of{' '}
        <a href="https://zkverify.io" target="_blank" rel="noreferrer">
          zkVerify
        </a>
        : users can prove attributes or complete checks without exposing emails, IPs, raw credentials, or
        behavioral tracking. Proofs are generated locally; verification settles through zkVerify for fast,
        scalable attestation.
      </p>
      <ExternalLinks />
      <h2>What we are building (modular roadmap)</h2>
      <p>
        The public site at{' '}
        <a href="https://zauth-alpha.vercel.app/" target="_blank" rel="noreferrer">
          zauth-alpha.vercel.app
        </a>{' '}
        describes the full vision. In the repos, work is staged in focused pieces:
      </p>
      <ol>
        <li>
          <strong>ZK CAPTCHA (MVP)</strong> — Replace traditional CAPTCHA with a zero-knowledge human check:
          repeatable proof flows, privacy-preserving, bot-resistant. Implemented in the{' '}
          <code>zauth-captcha</code> project (circuits, backend, SDK).
        </li>
        <li>
          <strong>Zauth identity</strong> — Proof-based authentication: prove account ownership (e.g. GitHub,
          OAuth providers) without exposing tokens or PII to integrators.
        </li>
        <li>
          <strong>Proof SDK &amp; gateway</strong> — Simple APIs so Web2 teams can request proofs and read
          attestations without operating ZK infrastructure.
        </li>
        <li>
          <strong>Browser layer</strong> — The <code>zauth-browser</code> experience targets seamless,
          often invisible proof generation during normal browsing (extension and web patterns over time).
        </li>
      </ol>
      <h2>Current focus</h2>
      <p>
        Ship a production-quality <strong>ZK CAPTCHA</strong> that generates real proof traffic, then iterate
        toward broader auth and browsing flows. These docs emphasize the captcha stack; the marketing site
        carries the wider product story.
      </p>
      <h2>Repositories</h2>
      <ul>
        <li>
          <code>zauth-captcha</code> — Noir circuits (UltraHonk + Keccak), Node API (challenges, verify,
          zkVerify submission), Redis, JWT issuance, and the published{' '}
          <a href="https://www.npmjs.com/package/@zauth/captcha-sdk" target="_blank" rel="noreferrer">
            <code>@zauth/captcha-sdk</code>
          </a>
          .
        </li>
        <li>
          <code>zauth-browser</code> — Next.js marketing / product surface aligned with the roadmap above.
        </li>
      </ul>
    </Prose>
  );
}
