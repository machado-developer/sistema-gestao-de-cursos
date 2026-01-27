import { DashboardService } from '@/services/dashboardService'
import { DashboardClient } from './DashboardClient'
import { serializePrisma } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Redireciona usuários não-admin para seus dashboards específicos
  if ((session.user as any).role === 'RH') {
    redirect('/rh');
  }

  if ((session.user as any).role === 'GESTOR_ACADEMICO') {
    redirect('/academico');
  }

  // Se não for ADMIN e não caiu em nenhum redirecionamento acima, vai para a página padrão
  // (Ou se quiser ser estrito: if (session.user.role !== 'ADMIN') redirect('/algum-lugar') )
  if ((session.user as any).role !== 'ADMIN') {
    // Por excesso de zelo, se for um USER comum, redireciona para acadêmico ou exibe erro
    redirect('/academico');
  }

  const data = await DashboardService.getGlobalStats();
  return <DashboardClient data={serializePrisma(data)} />
}
