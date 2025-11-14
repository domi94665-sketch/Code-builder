import type { Metadata } from 'next';
import { getPlaybooks } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Playbooks | Codex Architect'
};

export default async function PlaybooksPage() {
  const playbooks = await getPlaybooks();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-brand">Playbooks Estratégicos</h1>
        <p className="text-sm text-slate-600">
          Conteúdo gerido pelo Sanity para orientar squads multidisciplinares.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {playbooks.length === 0 ? (
          <p className="text-sm text-slate-500">
            Ainda não existem playbooks. Configura o Sanity e adiciona documentos do tipo
            <code className="mx-1 rounded bg-slate-200 px-1">playbook</code>.
          </p>
        ) : (
          playbooks.map((playbook) => (
            <article key={playbook._id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-brand">{playbook.title}</h2>
              {playbook.summary && <p className="mt-2 text-sm text-slate-600">{playbook.summary}</p>}
              {playbook.category && (
                <span className="mt-4 inline-flex w-fit rounded-full bg-brand-subtle px-3 py-1 text-xs font-semibold text-brand">
                  {playbook.category}
                </span>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
