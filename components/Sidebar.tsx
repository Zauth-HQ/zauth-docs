'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docNavGroups } from '@/lib/nav';
import { CAPTCHA_SDK_NPM, ZAUTH_GITHUB, ZAUTH_WEBSITE } from '@/lib/links';

function isActive(pathname: string, href: string) {
  if (href === '/docs') return pathname === '/docs';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkInactive =
  'text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 hover:translate-x-0.5 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white';

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 px-4 py-6 lg:py-8">
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
                        'block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                        active
                          ? 'bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-black'
                          : linkInactive,
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
                href={ZAUTH_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${linkInactive}`}
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={ZAUTH_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${linkInactive}`}
              >
                Website ↗
              </a>
            </li>
            <li>
              <a
                href={CAPTCHA_SDK_NPM}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${linkInactive}`}
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
