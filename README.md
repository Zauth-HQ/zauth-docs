# Zauth documentation (Next.js)

Developer documentation for Zauth: product introduction, ZK CAPTCHA architecture, Noir / UltraHonk circuits, the Node backend and zkVerify integration, and the [`@zauth/captcha-sdk`](https://www.npmjs.com/package/@zauth/captcha-sdk) npm package.

- **Product site:** [zauth-alpha.vercel.app](https://zauth-alpha.vercel.app/)
- **Stack:** Next.js App Router, TypeScript, Tailwind CSS v4

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) (port 3001 avoids clashes with other local apps).

## Production build

```bash
pnpm build
pnpm start
```

Deploy on Vercel, Netlify, or any Node host by setting the project root to this directory.

## Content

Pages live under `app/` as React/TSX (no MDX). Shared navigation is in `lib/nav.ts`; external links are centralized in `lib/links.ts`.
