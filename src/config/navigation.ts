import {
    LayoutDashboard,
    Users,
    BookOpen,
    School,
    ClipboardList,
    Wallet,
    Award,
    User as UserIcon,
    Settings,
    History,
    FileSignature,
    Calculator,
    BarChart3,
    Umbrella,
    Network,
    Building2,
    Briefcase,
    UserCog
} from 'lucide-react'

export interface NavigationItem {
    name: string;
    href: string;
    icon: any;
}

export interface NavigationSubModule {
    id: string;
    name: string;
    items: NavigationItem[];
}

export interface NavigationModule {
    id: string;
    name: string;
    icon: any;
    submodules: NavigationSubModule[];
}

export const getNavigation = (t: (key: string) => string): NavigationModule[] => [
    {
        id: 'dashboard',
        name: 'Página Inicial',
        icon: LayoutDashboard,
        submodules: [
            {
                id: 'geral',
                name: 'Geral',
                items: [
                    { name: t('sidebar.dashboard'), href: '/', icon: LayoutDashboard },
                ]
            }
        ]
    },
    {
        id: 'gestao_cursos',
        name: 'Gestão de Cursos',
        icon: BookOpen,
        submodules: [
            {
                id: 'academico_resumo',
                name: 'Gestão',
                items: [
                    { name: 'Dashboard Académico', href: '/academico', icon: LayoutDashboard },
                    { name: 'Relatórios Académicos', href: '/academico/relatorios', icon: BarChart3 },
                ]
            },
            {
                id: 'academico',
                name: 'Académico',
                items: [
                    { name: t('sidebar.students'), href: '/alunos', icon: Users },
                    { name: t('sidebar.courses'), href: '/cursos', icon: BookOpen },
                    { name: t('sidebar.classes'), href: '/turmas', icon: School },
                    { name: t('sidebar.instructors'), href: '/instrutores', icon: UserIcon },
                ]
            },
            {
                id: 'administrativo',
                name: 'Administrativo',
                items: [
                    { name: t('sidebar.enrollments'), href: '/matriculas', icon: ClipboardList },
                    { name: t('sidebar.corporate_clients'), href: '/empresas-clientes', icon: Building2 },
                    { name: t('sidebar.certificates'), href: '/certificados', icon: Award },
                ]
            }
        ]
    },
    {
        id: 'financeiro_mod',
        name: 'Financeiro',
        icon: Wallet,
        submodules: [
            {
                id: 'financeiro_sub',
                name: 'Controlo Financeiro',
                items: [
                    { name: t('sidebar.finance'), href: '/financeiro', icon: Wallet },
                ]
            }
        ]
    },
    {
        id: 'rh_mod',
        name: 'Capital Humano',
        icon: UserCog,
        submodules: [
            {
                id: 'rh_gestao',
                name: 'Gestão de Pessoal',
                items: [
                    { name: 'Dashboard RH', href: '/rh', icon: LayoutDashboard },
                    { name: 'Funcionários', href: '/rh/funcionarios', icon: Users },
                    { name: 'Gestão de Contratos', href: '/rh/contratos', icon: FileSignature },
                    { name: 'Presenças', href: '/rh/presencas', icon: ClipboardList },
                    { name: 'Processamento', href: '/rh/processamento', icon: Calculator },
                    { name: 'Relatórios Legais', href: '/rh/relatorios', icon: BarChart3 },
                    { name: 'Férias e Licenças', href: '/rh/ferias', icon: Umbrella },
                ]
            },
            {
                id: 'rh_config',
                name: 'Estrutura Orgânica',
                items: [
                    { name: 'Organograma', href: '/rh/organograma', icon: Network },
                    { name: 'Departamentos', href: '/rh/departamentos', icon: Building2 },
                    { name: 'Cargos e Funções', href: '/rh/cargos', icon: Briefcase },
                ]
            }
        ]
    },
    {
        id: 'sistema',
        name: 'Sistema',
        icon: Settings,
        submodules: [
            {
                id: 'config_sub',
                name: 'Configurações',
                items: [
                    { name: 'Utilizadores', href: '/configuracoes/utilizadores', icon: UserCog },
                    { name: t('sidebar.settings'), href: '/configuracoes', icon: Settings },
                ]
            },
            {
                id: 'auditoria',
                name: 'Segurança',
                items: [
                    { name: t('sidebar.audit'), href: '/audit', icon: History },
                ]
            }
        ]
    }
]
