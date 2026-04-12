'use client';

import { usePathname } from 'next/navigation';
import { mainNav } from '@/lib/nav';

export function MobileDocNav() {
  const pathname = usePathname();

  return (
    <div className="mb-8 border-b border-zinc-200 pb-6 lg:hidden dark:border-zinc-800">
      <label htmlFor="doc-nav" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">
        On this site
      </label>
      <select
        id="doc-nav"
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        value={pathname}
        onChange={(e) => {
          window.location.href = e.target.value;
        }}
      >
        <option value="/">Home</option>
        {mainNav.map((item) => (
          <option key={item.href} value={item.href}>
            {item.title}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-zinc-500">
        Or use the sidebar on larger screens.
      </p>
    </div>
  );
}
