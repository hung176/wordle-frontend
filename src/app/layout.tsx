import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import SWRConfigProvider from '@/app/context/swr-provider';
import ToastProvider from './context/toast-provider';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wordle Game',
  description: 'Wordle Game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <ToastProvider>
          <SWRConfigProvider>{children}</SWRConfigProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
