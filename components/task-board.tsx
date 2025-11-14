'use client';

import { useTransition } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { z } from 'zod';
import { useSupabase } from '@/components/providers';
import type { Database } from '@/types/database';
import type { Playbook } from '@/lib/sanity';
import { Button } from './ui/button';

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(['pending', 'in_progress', 'done']),
  due_date: z.string().nullable(),
  created_at: z.string()
});

const statusLabels: Record<'pending' | 'in_progress' | 'done', string> = {
  pending: 'Por iniciar',
  in_progress: 'Em progresso',
  done: 'Concluída'
};

type Task = z.infer<typeof taskSchema>;

type Props = {
  tasks: Database['public']['Tables']['tasks']['Row'][];
  playbooks: Playbook[];
};

export const TaskBoard: React.FC<Props> = ({ tasks, playbooks }) => {
  const { supabase, session } = useSupabase();
  const [isPending, startTransition] = useTransition();

  const handleCreateTask = () => {
    const title = prompt('Título da tarefa');
    if (!title || !session?.user) return;

    startTransition(async () => {
      await supabase.from('tasks').insert({
        title,
        owner_id: session.user.id,
        status: 'pending'
      });
      window.location.reload();
    });
  };

  const parsedTasks = z.array(taskSchema).safeParse(tasks);
  const safeTasks: Task[] = parsedTasks.success ? parsedTasks.data : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-brand">Dashboard</h1>
          <p className="text-sm text-slate-600">
            Gere tarefas alinhadas com os playbooks estratégicos.
          </p>
        </div>
        <Button onClick={handleCreateTask} disabled={isPending}>
          {isPending ? 'A criar...' : 'Nova tarefa'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {safeTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Nenhuma tarefa ainda. Cria a primeira para começar a sprint.
            </div>
          ) : (
            <ul className="space-y-3">
              {safeTasks.map((task) => (
                <li key={task.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-brand">{task.title}</h3>
                      {task.description && (
                        <p className="mt-1 text-sm text-slate-600">{task.description}</p>
                      )}
                      <p className="mt-2 text-xs uppercase text-slate-400">
                        {statusLabels[task.status]} · Criada em{' '}
                        {format(new Date(task.created_at), 'dd MMM yyyy', { locale: pt })}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-brand">Playbooks</h2>
            <p className="mt-1 text-sm text-slate-500">
              Conteúdo curado a partir do Sanity para orientar execuções.
            </p>
            <ul className="mt-4 space-y-3">
              {playbooks.length === 0 && (
                <li className="text-sm text-slate-500">
                  Configura o Sanity e adiciona documentos do tipo <code>playbook</code>.
                </li>
              )}
              {playbooks.map((playbook) => (
                <li key={playbook._id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="text-sm font-medium text-brand">{playbook.title}</p>
                  {playbook.summary && (
                    <p className="text-xs text-slate-500">{playbook.summary}</p>
                  )}
                  {playbook.category && (
                    <span className="mt-2 inline-block rounded-full bg-brand-subtle px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand">
                      {playbook.category}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
