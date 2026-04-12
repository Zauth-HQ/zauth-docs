import { CAPTCHA_SDK_NPM, ZAUTH_WEBSITE } from '@/lib/links';
import { CopyRow } from './CopyRow';

export function ExternalLinks() {
  return (
    <div className="not-prose space-y-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_3px_6px_rgba(23,23,23,0.06)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Quick links
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={ZAUTH_WEBSITE}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            Zauth website
            <span aria-hidden>↗</span>
          </a>
          <a
            href={CAPTCHA_SDK_NPM}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800"
            target="_blank"
            rel="noreferrer"
          >
            @zauth/captcha-sdk on npm
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Copy link
        </p>
        <div className="space-y-3">
          <CopyRow url={ZAUTH_WEBSITE} title="Product site" />
          <CopyRow url={CAPTCHA_SDK_NPM} title="npm package" />
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Logo
        </p>
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          Use the official mark at <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">/logo.png</code> on your
          deployment (same file as in this docs site header and sidebar).
        </p>
        <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Zauth logo" className="h-10 w-auto max-w-[220px] object-contain object-left" />
        </div>
      </div>
    </div>
  );
}
