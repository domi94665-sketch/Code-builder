import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/cn';
import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Codex Architect Workspace',
  description: 'Productivity workspace with Supabase auth and data.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen bg-slate-50 antialiased')}>
        <Providers>
          <Navbar />
          <main className="container py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
