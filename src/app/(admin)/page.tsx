import { DashboardService } from '@/services/dashboardService'
import { DashboardClient } from './DashboardClient'
import { serializePrisma } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { hasPermission } from '@/lib/rbac'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const role = (session.user as any).role;
  const permissions = (session.user as any).permissions as any[];

  // 1. Redirecionamento por Role (Legado/Preferencial)
  if (role === 'RH' && hasPermission(permissions, 'rh_mod', 'read')) {
    redirect('/rh');
  }

  if (role === 'FINANCEIRO' && hasPermission(permissions, 'financeiro_mod', 'read')) {
    redirect('/financeiro');
  }

  if ((role === 'GESTOR_ACADEMICO' || role === 'USER') && hasPermission(permissions, 'gestao_cursos', 'read')) {
    redirect('/academico');
  }

  // 2. Redirecionamento de Emergência (Se a role não bateu, mas tem alguma permissão)
  if (role !== 'ADMIN') {
    if (hasPermission(permissions, 'gestao_cursos', 'read')) redirect('/academico');
    if (hasPermission(permissions, 'rh_mod', 'read')) redirect('/rh');
    if (hasPermission(permissions, 'financeiro_mod', 'read')) redirect('/financeiro');
    if (hasPermission(permissions, 'sistema', 'read')) redirect('/configuracoes');
  }

  // 3. Se for ADMIN ou SUPER_ADMIN_ROOT, acede ao dashboard global
  if (role === 'ADMIN' || role === 'SUPER_ADMIN_ROOT') {
    const data = await DashboardService.getGlobalStats();
    return <DashboardClient data={serializePrisma(data)} />
  }

  // Se não tem permissões nenhumas...
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4 border border-red-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
      </div>
      <h2 className="text-2xl font-bold text-app-text mb-2">Acesso Restrito</h2>
      <p className="text-app-muted max-w-sm mb-6">
        A sua conta ({session.user.email}) está autenticada, mas não tem permissões atribuídas para aceder aos módulos do sistema.
      </p>
      <div className="flex gap-4">
        <a href="/login" className="text-sm font-bold text-blue-500 hover:underline">Tentar com outra conta</a>
      </div>
    </div>
  )
}
