'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '@/lib/nav';
import { CAPTCHA_SDK_NPM, ZAUTH_WEBSITE } from '@/lib/links';

function isActive(pathname: string, href: string) {
  if (href === '/docs') return pathname === '/docs';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col gap-8 border-r border-zinc-200 bg-zinc-50/50 px-4 py-8 dark:border-zinc-800 dark:bg-zinc-950/50 lg:px-6">
      <div>
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Zauth docs
        </Link>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Confidential browsing &amp; ZK CAPTCHA
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 text-sm" aria-label="Documentation">
        {mainNav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                'rounded-lg px-3 py-2 transition ' +
                (active
                  ? 'bg-emerald-600/15 font-medium text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-100'
                  : 'text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100')
              }
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs dark:border-zinc-800">
        <a
          href={ZAUTH_WEBSITE}
          className="text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
          target="_blank"
          rel="noreferrer"
        >
          Website ↗
        </a>
        <a
          href={CAPTCHA_SDK_NPM}
          className="text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
          target="_blank"
          rel="noreferrer"
        >
          npm: @zauth/captcha-sdk ↗
        </a>
      </div>
    </aside>
  );
}
