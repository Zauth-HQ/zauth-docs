import { CAPTCHA_SDK_NPM, ZAUTH_WEBSITE } from '@/lib/links';

export function ExternalLinks() {
  return (
    <div className="not-prose flex flex-wrap gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
      <a
        href={ZAUTH_WEBSITE}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        target="_blank"
        rel="noreferrer"
      >
        Zauth website
        <span aria-hidden>↗</span>
      </a>
      <a
        href={CAPTCHA_SDK_NPM}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
        target="_blank"
        rel="noreferrer"
      >
        @zauth/captcha-sdk on npm
        <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
