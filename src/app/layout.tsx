import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from '@/utils/provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sendbird Chat App',
  description: 'A chat app built with Sendbird and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="flex flex-col h-screen text-base">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
