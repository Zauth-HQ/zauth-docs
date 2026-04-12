'use client';

import { useCallback, useState } from 'react';

type CopyButtonProps = {
  text: string;
  label: string;
  copiedLabel?: string;
  className?: string;
};

export function CopyButton({
  text,
  label,
  copiedLabel = 'Copied',
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={() => void onCopy()}
      className={
        'inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[hsl(213_27%_85%)] bg-white px-2.5 py-1 text-xs font-medium text-[hsl(214_40%_14%)] shadow-sm transition hover:bg-[hsl(210_20%_96%)] ' +
        className
      }
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {copied ? (
          <path d="M20 6L9 17l-5-5" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </>
        )}
      </svg>
      {copied ? copiedLabel : label}
    </button>
  );
}
