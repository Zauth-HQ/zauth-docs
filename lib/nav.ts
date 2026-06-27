export type NavItem = { href: string; title: string };

export type NavGroup = { label: string; items: NavItem[] };

/** Grouped sidebar navigation (typical SaaS / developer-docs layout). */
export const docNavGroups: NavGroup[] = [
  {
    label: 'Getting started',
    items: [{ href: '/docs', title: 'Introduction' }],
  },
  {
    label: 'ZK CAPTCHA',
    items: [
      { href: '/docs/zk-captcha', title: 'Overview' },
      { href: '/docs/zk-captcha/architecture', title: 'Architecture' },
      { href: '/docs/zk-captcha/circuits', title: 'Circuits & proving' },
      { href: '/docs/zk-captcha/backend', title: 'Backend & zkVerify' },
      { href: '/docs/zk-captcha/sdk', title: 'Captcha SDK' },
      { href: '/docs/zk-captcha/api', title: 'REST API' },
    ],
  },
  {
    label: 'Browser Extension',
    items: [
      { href: '/docs/browser-extension', title: 'Overview' },
      { href: '/docs/browser-extension/architecture', title: 'Architecture' },
      { href: '/docs/browser-extension/shields', title: 'Privacy Shields' },
      { href: '/docs/browser-extension/cryptography', title: 'Cryptography' },
      { href: '/docs/browser-extension/zkverify', title: 'zkVerify Integration' },
    ],
  },
];

export const mainNav: NavItem[] = docNavGroups.flatMap((g) => g.items);
