export type Role = 'ADMIN' | 'GESTOR_ACADEMICO' | 'FINANCEIRO' | 'RH' | 'USER';

export interface Permission {
    module: string;
    action: 'view' | 'create' | 'edit' | 'delete' | 'all';
}

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
    ADMIN: ['*'], // Acesso total
    GESTOR_ACADEMICO: [
        'dashboard.view',
        'academic.view', 'academic.create', 'academic.edit',
        'enrollment.view', 'enrollment.create',
        'certificates.view', 'certificates.create'
    ],
    FINANCEIRO: [
        'dashboard.view',
        'finance.view', 'finance.create', 'finance.edit',
        'payments.view'
    ],
    RH: [
        'dashboard.view',
        'rh.view', 'rh.create', 'rh.edit', 'rh.process',
        'rh.reports', 'rh.vacation'
    ],
    USER: [
        'dashboard.view',
        'profile.self'
    ]
};

/**
 * Verifica se um papel (role) tem permissão para um determinado recurso/ação.
 * Exemplo: hasPermission('RH', 'rh.process') -> true
 */
export function hasPermission(role: Role | string, permission: string): boolean {
    const permissions = ROLE_PERMISSIONS[role as Role] || [];

    if (permissions.includes('*')) return true;
    if (permissions.includes(permission)) return true;

    // Suporte para wildcards básicos por módulo (ex: 'rh.*')
    const module = permission.split('.')[0];
    if (permissions.includes(`${module}.*`)) return true;

    return false;
}

/**
 * Mapeamento de IDs de módulos do Sidebar para permissões
 */
export const MODULE_PERMISSION_MAP: Record<string, string> = {
    'gestao_cursos': 'academic.view',
    'financeiro_mod': 'finance.view',
    'rh_mod': 'rh.view',
    'sistema': 'admin.view', // Apenas admin deve ver configs do sistema normalmente
};
