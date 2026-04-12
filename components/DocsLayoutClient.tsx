'use client';

import { useState, type ReactNode } from 'react';
import { DocsHeader } from '@/components/DocsHeader';
import { Sidebar } from '@/components/Sidebar';

export function DocsLayoutClient({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader onMenuClick={() => setSidebarOpen((o) => !o)} menuOpen={sidebarOpen} />
      <div className="flex min-h-0 flex-1">
        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-[3.75rem] z-40 bg-black/50 max-lg:block lg:hidden"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}
        <aside
          className={[
            'w-[min(280px,85vw)] shrink-0 border-r border-zinc-200 bg-zinc-50/95 dark:border-zinc-800 dark:bg-zinc-900/95',
            'max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:top-[3.75rem] max-lg:z-50 max-lg:-translate-x-full max-lg:overflow-y-auto max-lg:transition-transform',
            sidebarOpen ? 'max-lg:translate-x-0' : '',
            'lg:sticky lg:top-[3.75rem] lg:max-h-[calc(100vh-3.75rem)] lg:translate-x-0 lg:overflow-y-auto',
          ].join(' ')}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>
        <main className="min-w-0 flex-1 bg-white dark:bg-zinc-950">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:max-w-[46rem] lg:pl-10 lg:pr-12 xl:max-w-[52rem]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
