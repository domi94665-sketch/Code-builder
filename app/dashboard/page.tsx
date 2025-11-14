import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { TaskBoard } from '@/components/task-board';
import { getPlaybooks } from '@/lib/sanity';

export default async function DashboardPage() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session?.user) {
    notFound();
  }

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('owner_id', session.user.id)
    .order('created_at', { ascending: false });

  const playbooks = await getPlaybooks();

  return <TaskBoard tasks={tasks ?? []} playbooks={playbooks} />;
}
