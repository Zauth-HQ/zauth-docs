'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { CAPTCHA_SDK_NPM, ZAUTH_GITHUB, ZAUTH_WEBSITE } from '@/lib/links';

type Props = {
  onMenuClick: () => void;
  menuOpen: boolean;
};

export function DocsHeader({ onMenuClick, menuOpen }: Props) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 h-[60px] shrink-0 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
      <div className="flex h-full items-center justify-between gap-3 px-4 lg:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:hidden"
            onClick={onMenuClick}
            aria-expanded={menuOpen}
            aria-label="Toggle sidebar"
          >
            <span className="block h-0.5 w-[18px] rounded-full bg-current" />
            <span className="block h-0.5 w-[18px] rounded-full bg-current" />
            <span className="block h-0.5 w-[18px] rounded-full bg-current" />
          </button>
          <Link
            href="/docs"
            className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Zauth"
              className="h-6 w-auto object-contain object-left sm:h-7"
            />
            <span className="hidden text-sm font-semibold tracking-tight text-zinc-900 dark:text-white sm:inline-block">
              Zauth
            </span>
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a
            href={ZAUTH_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white sm:block"
          >
            GitHub
          </a>
          <a
            href={ZAUTH_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white md:block"
          >
            Website
          </a>
          <a
            href={CAPTCHA_SDK_NPM}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            npm
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
