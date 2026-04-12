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
            className="fixed inset-0 top-[60px] z-40 bg-black/50 max-lg:block lg:hidden"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}
        <aside
          className={[
            'w-[280px] shrink-0 border-r border-zinc-200 bg-white dark:border-white/10 dark:bg-black',
            'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:top-[60px] max-lg:z-50 max-lg:-translate-x-full max-lg:overflow-y-auto max-lg:transition-transform',
            sidebarOpen ? 'max-lg:translate-x-0' : '',
            'lg:sticky lg:top-[60px] lg:max-h-[calc(100vh-60px)] lg:translate-x-0 lg:overflow-y-auto',
          ].join(' ')}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>
        <main className="min-w-0 flex-1 bg-white px-4 py-8 dark:bg-black sm:px-8 lg:pl-10 lg:pr-12">
          <div className="mx-auto w-full max-w-[52rem]">{children}</div>
        </main>
      </div>
    </div>
  );
}
