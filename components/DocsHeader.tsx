'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { CAPTCHA_SDK_NPM, ZAUTH_WEBSITE } from '@/lib/links';

type Props = {
  onMenuClick: () => void;
  menuOpen: boolean;
};

export function DocsHeader({ onMenuClick, menuOpen }: Props) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 h-[3.75rem] shrink-0 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md dark:border-zinc-800/90 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
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
            className="flex min-w-0 items-center gap-3 rounded-lg py-1 pr-2 transition hover:opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- public PNG logo */}
            <img
              src="/logo.png"
              alt="Zauth"
              className="h-8 w-auto max-h-8 max-w-[min(160px,42vw)] shrink-0 object-contain object-left sm:max-w-[180px]"
            />
            <span className="hidden text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:inline">
              Documentation
            </span>
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <a
            href={ZAUTH_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 md:inline"
          >
            Website
          </a>
          <a
            href={CAPTCHA_SDK_NPM}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 sm:px-3"
          >
            npm
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
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
