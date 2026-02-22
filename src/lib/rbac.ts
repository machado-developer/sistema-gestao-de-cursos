export type Role = 'ADMIN' | 'GESTOR_ACADEMICO' | 'FINANCEIRO' | 'RH' | 'USER';

export interface ModulePermission {
    key: string;
    canRead: boolean;
    canWrite: boolean;
}

export interface Permission {
    module: string;
    action: 'view' | 'create' | 'edit' | 'delete' | 'all';
}

/**
 * Verifica se um usuário tem permissão para um determinado módulo/ação.
 * Agora suporta permissões dinâmicas (Perfil + Overrides).
 */
export function hasPermission(
    sessionPermissions: ModulePermission[] | undefined,
    moduleKey: string,
    action: 'read' | 'write' = 'read'
): boolean {
    if (!sessionPermissions) return false;

    // Se o usuário tem uma permissão especial '*' (ex: Admin), ele tem acesso total
    const hasAllAccess = sessionPermissions.some(p => p.key === '*' && (action === 'read' ? p.canRead : p.canWrite));
    if (hasAllAccess) return true;

    const perm = sessionPermissions.find(p => p.key === moduleKey);
    if (!perm) return false;

    if (action === 'read') return perm.canRead;
    if (action === 'write') return perm.canWrite;

    return false;
}

/**
 * Verifica se um usuário tem permissão para um item específico de módulo.
 */
export function hasItemPermission(
    sessionItemPermissions: ModulePermission[] | undefined,
    itemKey: string,
    action: 'read' | 'write' = 'read'
): boolean {
    if (!sessionItemPermissions) return false;

    const hasAllAccess = sessionItemPermissions.some(p => p.key === '*' && (action === 'read' ? p.canRead : p.canWrite));
    if (hasAllAccess) return true;

    const perm = sessionItemPermissions.find(p => p.key === itemKey);
    if (!perm) return false;

    return action === 'read' ? perm.canRead : perm.canWrite;
}

/**
 * Mapeamento de IDs de módulos do Sidebar para chaves de permissão (Módulos da DB)
 */
export const MODULE_PERMISSION_MAP: Record<string, string> = {
    'gestao_cursos': 'gestao_cursos',
    'financeiro_mod': 'financeiro_mod',
    'rh_mod': 'rh_mod',
    'sistema': 'sistema',
};

/**
 * Mapeamento de Hrefs de itens para chaves de permissão (Itens da DB)
 */
export const ITEM_PERMISSION_MAP: Record<string, string> = {
    'alunos': 'alunos',
    'cursos': 'cursos',
    'turmas': 'turmas',
    'matriculas': 'matriculas',
    'instrutores': 'cursos', // Agrupado em cursos por enquanto
    'empresas-clientes': 'matriculas',
    'certificados': 'matriculas',
    'financeiro': 'pagamentos',
    'rh': 'funcionarios',
    'rh/funcionarios': 'funcionarios',
    'rh/contratos': 'funcionarios',
    'rh/presencas': 'funcionarios',
    'rh/processamento': 'processamento_salarial',
    'rh/adiantamentos': 'adiantamentos',
    'rh/descontos': 'processamento_salarial',
    'rh/relatorios': 'funcionarios',
    'rh/ferias': 'ferias',
    'rh/organograma': 'funcionarios',
    'rh/departamentos': 'funcionarios',
    'rh/cargos': 'funcionarios',
    'configuracoes/utilizadores': 'utilizadores',
    'configuracoes': 'config_gerais',
    'audit': 'auditoria',
};

// Mantido para compatibilidade temporária se necessário, 
// mas o ideal é migrar tudo para o novo hasPermission que usa sessionPermissions
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
    ADMIN: ['*'],
    GESTOR_ACADEMICO: ['academic.view', 'academic.create', 'academic.edit', 'enrollment.view', 'enrollment.create', 'certificates.view', 'certificates.create'],
    FINANCEIRO: ['finance.view', 'finance.create', 'finance.edit', 'payments.view'],
    RH: ['rh.view', 'rh.create', 'rh.edit', 'rh.process', 'rh.reports', 'rh.vacation'],
    USER: ['profile.self']
};
