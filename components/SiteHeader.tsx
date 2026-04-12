import Link from 'next/link';
import { CAPTCHA_SDK_NPM, ZAUTH_WEBSITE } from '@/lib/links';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Zauth
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/docs"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Docs
          </Link>
          <a
            href={ZAUTH_WEBSITE}
            className="hidden text-zinc-600 hover:text-emerald-700 sm:inline dark:text-zinc-400 dark:hover:text-emerald-400"
            target="_blank"
            rel="noreferrer"
          >
            Product site
          </a>
          <a
            href={CAPTCHA_SDK_NPM}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-700"
            target="_blank"
            rel="noreferrer"
          >
            SDK on npm
          </a>
        </nav>
      </div>
    </header>
  );
}
