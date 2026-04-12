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
      <span className="w-28 shrink-0 text-xs font-medium text-[hsl(215_15%_45%)]">{title}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <code
          className={
            'block min-w-0 flex-1 break-all rounded-md border border-[hsl(213_27%_90%)] bg-[hsl(210_20%_98%)] px-3 py-2 text-[13px] leading-snug text-[hsl(214_40%_14%)] ' +
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
