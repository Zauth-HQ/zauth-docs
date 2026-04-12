import { CAPTCHA_SDK_NPM, ZAUTH_WEBSITE } from '@/lib/links';
import { ZAUTH_LOGO_SVG } from '@/lib/zauthLogoSvg';
import { CopyRow } from './CopyRow';

export function ExternalLinks() {
  return (
    <div className="not-prose space-y-6 rounded-xl border border-[hsl(213_27%_85%)] bg-white p-5 shadow-[0_3px_6px_rgba(23,23,23,0.06)]">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[hsl(215_15%_45%)]">
          Quick links
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={ZAUTH_WEBSITE}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(259_80%_55%)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[hsl(259_80%_48%)]"
            target="_blank"
            rel="noreferrer"
          >
            Zauth website
            <span aria-hidden>↗</span>
          </a>
          <a
            href={CAPTCHA_SDK_NPM}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[hsl(213_27%_85%)] bg-white px-4 py-2.5 text-sm font-medium text-[hsl(214_40%_14%)] transition hover:bg-[hsl(210_20%_98%)]"
            target="_blank"
            rel="noreferrer"
          >
            @zauth/captcha-sdk on npm
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div className="border-t border-[hsl(213_27%_90%)] pt-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[hsl(215_15%_45%)]">
          Copy link
        </p>
        <div className="space-y-3">
          <CopyRow url={ZAUTH_WEBSITE} title="Product site" />
          <CopyRow url={CAPTCHA_SDK_NPM} title="npm package" />
        </div>
      </div>

      <div className="border-t border-[hsl(213_27%_90%)] pt-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[hsl(215_15%_45%)]">
          Brand mark (SVG)
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-[hsl(213_27%_85%)] bg-[hsl(210_20%_98%)] p-2"
            dangerouslySetInnerHTML={{ __html: ZAUTH_LOGO_SVG }}
          />
          <CopyRow
            url={ZAUTH_LOGO_SVG}
            title="Copy logo SVG"
            copyLabel="Copy SVG"
            monospace={false}
            multiline
          />
        </div>
        <p className="mt-2 text-xs text-[hsl(215_15%_45%)]">
          Paste into HTML or a <code className="rounded bg-[hsl(210_10%_92%)] px-1 py-0.5">.svg</code> file.
          If you embed multiple marks on one page, change <code className="rounded bg-[hsl(210_10%_92%)] px-1 py-0.5">id</code>{' '}
          attributes in <code className="rounded bg-[hsl(210_10%_92%)] px-1 py-0.5">&lt;defs&gt;</code> to avoid clashes.
        </p>
      </div>
    </div>
  );
}
