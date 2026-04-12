import type { ReactNode } from 'react';

/** Mintlify / IncoPay-style article typography */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        'prose prose-zinc max-w-none dark:prose-invert ' +
        'prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight ' +
        'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 ' +
        'prose-code:rounded prose-code:border prose-code:border-zinc-200 prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] ' +
        'dark:prose-code:border-zinc-700 dark:prose-code:bg-zinc-900 ' +
        'prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-950 prose-pre:text-zinc-100 dark:prose-pre:border-zinc-800'
      }
    >
      {children}
    </div>
  );
}
