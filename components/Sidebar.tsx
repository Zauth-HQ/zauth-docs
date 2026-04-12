'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docNavGroups } from '@/lib/nav';
import { CAPTCHA_SDK_NPM, ZAUTH_WEBSITE } from '@/lib/links';

function isActive(pathname: string, href: string) {
  if (href === '/docs') return pathname === '/docs';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 px-4 py-5 lg:px-5 lg:py-7">
      <Link
        href="/docs"
        className="mb-5 flex items-center gap-2 px-2 hover:opacity-90 lg:hidden"
        onClick={onNavigate}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- public asset; drawer only (header has logo on lg) */}
        <img src="/logo.png" alt="Zauth" className="h-8 w-auto max-w-[200px] object-contain object-left" />
      </Link>
      <nav className="flex flex-col gap-6" aria-label="Documentation">
        {docNavGroups.map((section) => (
          <div key={section.label}>
            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              {section.label}
            </h2>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onNavigate}
                      className={[
                        'block rounded-lg px-2 py-1.5 text-sm font-medium transition-colors',
                        active
                          ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400'
                          : 'text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100',
                      ].join(' ')}
                    >
                      {l.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
            Links
          </h2>
          <ul className="flex flex-col gap-0.5">
            <li>
              <a
                href={ZAUTH_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
              >
                Website ↗
              </a>
            </li>
            <li>
              <a
                href={CAPTCHA_SDK_NPM}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
              >
                @zauth/captcha-sdk ↗
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
