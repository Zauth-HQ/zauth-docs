'use client';

import { useCallback, useState } from 'react';

type CodeBlockProps = {
  code: string;
  /** Optional class on inner `code` (e.g. `ts`, `json`). */
  language?: string;
};

const shell =
  'not-prose relative my-6 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-950';
const pre =
  'm-0 overflow-x-auto p-4 pr-14 pt-4 text-left text-sm leading-relaxed text-zinc-900 dark:text-zinc-100';
const codeInner = 'block w-fit min-w-full whitespace-pre font-mono text-[13px] text-inherit';

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div className={shell}>
      <button
        type="button"
        onClick={() => void onCopy()}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200/80 bg-white/90 text-zinc-600 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
        aria-label={copied ? 'Copied' : 'Copy code'}
        title={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre className={pre}>
        <code className={codeInner + (language ? ` language-${language}` : '')}>{code}</code>
      </pre>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.586-1.414l-2.828-2.828A2 2 0 0015.172 2H10a2 2 0 00-2 2v0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
