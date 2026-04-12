import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Zauth Documentation',
    template: '%s · Zauth Docs',
  },
  description:
    'Documentation for Zauth: confidential browsing, ZK CAPTCHA, @zauth/captcha-sdk, and zkVerify integration.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
