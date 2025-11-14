'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useSupabase } from '@/components/providers';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Verifica o teu e-mail para continuar.');
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-brand">Entrar</h1>
      <p className="mt-2 text-sm text-slate-600">
        Receberás um link mágico para aceder ao dashboard.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-slate-200 px-4 py-2 focus:border-brand-accent focus:outline-none"
          placeholder="nome@empresa.com"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'A enviar...' : 'Enviar link' }
        </Button>
      </form>
      {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
      <p className="mt-6 text-sm text-slate-500">
        <Link href="/">Voltar à página inicial</Link>
      </p>
    </div>
  );
}
