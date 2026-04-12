import type { ReactNode } from 'react';

/**
 * Article typography. Pre blocks: light gray surface in light mode, dark in dark mode.
 * Nested `code` inside `pre` must not use inline-code styles (avoids “stripes” / unreadable contrast).
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        'prose prose-zinc max-w-none dark:prose-invert ' +
        'prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight ' +
        'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 ' +
        /* Inline code (not inside pre) */
        'prose-code:rounded prose-code:border prose-code:border-zinc-200 prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-[0.9em] prose-code:text-zinc-900 ' +
        'dark:prose-code:border-zinc-700 dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-100 ' +
        /* Code fences: readable in both themes */
        'prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-100 prose-pre:p-4 prose-pre:text-sm prose-pre:text-zinc-900 prose-pre:shadow-sm ' +
        'dark:prose-pre:border-zinc-700 dark:prose-pre:bg-zinc-950 dark:prose-pre:text-zinc-100 ' +
        /* Reset prose-code when nested in pre — fixes light-mode stripes / black boxes */
        'prose-pre:[&_code]:rounded-none prose-pre:[&_code]:border-0 prose-pre:[&_code]:bg-transparent prose-pre:[&_code]:p-0 prose-pre:[&_code]:text-inherit prose-pre:[&_code]:shadow-none'
      }
    >
      {children}
    </div>
  );
}
