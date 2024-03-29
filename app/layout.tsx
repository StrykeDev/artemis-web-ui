import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artemis Web UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between align-middle panel-border border-b-4">
          <h1 className="font-light text-xl">
            Artemis Web UI <sup className="text-xs">ALPHA 0.1</sup>
          </h1>
        </header>
        {children}
        <footer className="flex justify-center panel-border border-t-4 text-xs">
          <span>
            Developed by <a href="https://github.com/StrykeDev">StrykeDev</a>{' '}
            for <a href="https://artemis-rgb.com/">Artemis RGB</a>.
          </span>
        </footer>
      </body>
    </html>
  );
}
