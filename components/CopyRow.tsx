'use client';

import { CopyButton } from './CopyButton';

type CopyRowProps = {
  url: string;
  title: string;
  copyLabel?: string;
  monospace?: boolean;
  /** Long text (e.g. SVG): show truncated preview */
  multiline?: boolean;
};

export function CopyRow({
  url,
  title,
  copyLabel = 'Copy link',
  monospace = true,
  multiline = false,
}: CopyRowProps) {
  const preview =
    multiline && url.length > 120 ? `${url.slice(0, 118).trim()}…` : url;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-28 shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400">{title}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <code
          className={
            'block min-w-0 flex-1 break-all rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-[13px] leading-snug text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 ' +
            (monospace ? 'font-mono' : '')
          }
        >
          {preview}
        </code>
        <CopyButton text={url} label={copyLabel} copiedLabel="Copied" />
      </div>
    </div>
  );
}
