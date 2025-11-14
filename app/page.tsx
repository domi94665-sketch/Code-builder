import Link from 'next/link';
import { ArrowRight, Shield, Workflow, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    name: 'Fluxos automatizados',
    description: 'Orquestre tarefas com automações seguras integradas ao Supabase e Sanity.',
    icon: Workflow
  },
  {
    name: 'Segurança corporativa',
    description: 'Autenticação e políticas row-level prontas para ambientes críticos.',
    icon: Shield
  },
  {
    name: 'Entrega acelerada',
    description: 'UI moderna com Tailwind e arquitetura escalável com Next 14.',
    icon: Zap
  }
];

export default function HomePage() {
  return (
    <section className="space-y-12">
      <div className="rounded-3xl bg-gradient-to-r from-brand via-brand-accent to-indigo-500 px-8 py-16 text-white shadow-xl">
        <div className="max-w-3xl space-y-6">
          <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest">
            Codex Architect v3
          </span>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Constrói plataformas full-stack sem esforço manual.
          </h1>
          <p className="text-lg text-indigo-100">
            Uma stack moderna com Next.js 14, Supabase e Sanity pronta para personalização. Começa
            com autenticação, dashboards e APIs REST bem estruturadas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/dashboard">
                Abrir dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white text-brand">
              <Link href="#stack">Ver stack</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <feature.icon className="h-10 w-10 text-brand-accent" />
            <h3 className="mt-4 text-lg font-semibold text-brand">{feature.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div id="stack" className="rounded-2xl border border-dashed border-brand-accent bg-white p-8">
        <h2 className="text-2xl font-semibold text-brand">Stack de referência</h2>
        <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <li><strong>Frontend:</strong> Next.js 14 App Router + Tailwind CSS</li>
          <li><strong>Autenticação:</strong> Supabase Auth com middlewares protegidos</li>
          <li><strong>Backend:</strong> API Routes tipadas e Server Actions</li>
          <li><strong>CMS:</strong> Sanity.io com schemas modulares</li>
          <li><strong>Design System:</strong> Componentes reutilizáveis com tipagem forte</li>
          <li><strong>DevOps:</strong> Deploy em Vercel com variáveis seguras</li>
        </ul>
      </div>
    </section>
  );
}
