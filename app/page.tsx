import Link from 'next/link';
import { ExternalLinks } from '@/components/ExternalLinks';
import { Prose } from '@/components/Prose';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Prose>
        <h1>Zauth documentation</h1>
        <p className="lead text-lg text-zinc-600 dark:text-zinc-400">
          Guides for confidential browsing, the ZK CAPTCHA stack (Noir circuits, Node backend, zkVerify
          UltraHonk), and the{' '}
          <code>@zauth/captcha-sdk</code> client library.
        </p>
        <ExternalLinks />
        <h2>Start here</h2>
        <ul>
          <li>
            <Link href="/docs">Introduction</Link> — product vision and roadmap themes (ZK CAPTCHA, Zauth
            identity, SDK, browser layer).
          </li>
          <li>
            <Link href="/docs/zk-captcha">ZK CAPTCHA overview</Link> — what ships today in the{' '}
            <code>zauth-captcha</code> monorepo.
          </li>
          <li>
            <Link href="/docs/zk-captcha/sdk">Captcha SDK</Link> — install from npm and integrate in React or
            vanilla TypeScript.
          </li>
        </ul>
      </Prose>
    </div>
  );
}
