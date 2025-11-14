'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { useSupabase } from './providers';
import { Button } from '@/components/ui/button';

const links = [
  { href: '/', label: 'Início' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/playbooks', label: 'Playbooks' }
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { supabase, session } = useSupabase();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold text-brand">
          Codex Architect
        </Link>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand-accent',
                pathname === link.href ? 'text-brand-accent' : 'text-slate-600'
              )}
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <Button variant="outline" onClick={handleSignOut}>
              Terminar sessão
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
