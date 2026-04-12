import type { ReactNode } from 'react';

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        'prose prose-zinc max-w-none dark:prose-invert ' +
        'prose-headings:scroll-mt-24 prose-headings:font-semibold ' +
        'prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-emerald-400 ' +
        'prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] ' +
        'dark:prose-code:bg-zinc-800 prose-pre:bg-zinc-950 prose-pre:text-zinc-100'
      }
    >
      {children}
    </div>
  );
}
