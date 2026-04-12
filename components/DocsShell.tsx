import type { ReactNode } from 'react';
import { DocsSidebar } from './DocsSidebar';

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl">
      <div className="hidden w-64 shrink-0 lg:block xl:w-72">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <DocsSidebar />
        </div>
      </div>
      <main className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:py-12">{children}</main>
    </div>
  );
}
