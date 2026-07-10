import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Footer } from '../components/Footer';
import { TheaterNavbar } from '../components/TheaterNavbar';
import { siteData } from '../config/siteData';

export const metadata: Metadata = {
  title: '朱幕座｜伝統芸能案内',
  description: siteData.description,
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070504',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="flex flex-col min-h-screen">
          <TheaterNavbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
