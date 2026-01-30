"use client";

import { useState, useEffect, use } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, Column } from "@/components/ui/DataTable";
import {
    Building2, Mail, Phone, MapPin, User, Users,
    Wallet, ArrowLeft, ArrowUpRight, TrendingUp,
    FileText, CheckCircle2, Clock
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function EmpresaDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { t } = useLanguage();
    const [empresa, setEmpresa] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchEmpresa = async () => {
        try {
            const res = await fetch(`/api/empresas-clientes/${id}`);
            const data = await res.json();
            if (res.ok) setEmpresa(data);
            else toast.error("Erro ao carregar detalhes da empresa");
        } catch (error) {
            toast.error("Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmpresa();
    }, [id]);

    if (loading) return <div className="p-8 text-center uppercase font-black tracking-widest text-zinc-500">A carregar...</div>;
    if (!empresa) return <div className="p-8 text-center uppercase font-black tracking-widest text-red-500">Empresa não encontrada</div>;

    const columns: Column<any>[] = [
        {
            key: "aluno",
            header: "Funcionário / Aluno",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs uppercase">
                        {item.aluno.nome_completo.charAt(0)}
                    </div>
                    <div>
                        <div className="font-bold text-sm">{item.aluno.nome_completo}</div>
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{item.turma.codigo_turma}</div>
                    </div>
                </div>
            )
        },
        {
            key: "curso",
            header: "Curso",
            render: (item) => (
                <div className="font-bold text-xs">{item.turma.curso.nome}</div>
            )
        },
        {
            key: "finance",
            header: "Valor",
            render: (item) => (
                <div className="font-bold text-xs">
                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.valor_total)}
                </div>
            )
        },
        {
            key: "status",
            header: "Estado",
            render: (item) => (
                <Badge variant={item.estado_pagamento === 'Pago' ? 'success' : item.estado_pagamento === 'Pendente' ? 'error' : 'warning'}>
                    {item.estado_pagamento}
                </Badge>
            )
        }
    ];

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <Link href="/empresas-clientes" className="text-zinc-500 hover:text-blue-600 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest transition-colors">
                    <ArrowLeft size={14} /> Voltar à lista
                </Link>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-10 px-6 font-black uppercase text-[10px] tracking-widest">
                        Editar Dados
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Info Card */}
                <Card className="md:col-span-2 p-8 border-none shadow-2xl shadow-zinc-200/50 dark:shadow-none bg-white dark:bg-zinc-900/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 text-zinc-100 dark:text-zinc-800 -mr-8 -mt-8">
                        <Building2 size={160} />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/20">
                                <Building2 size={40} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight uppercase">{empresa.nome}</h1>
                                <div className="text-blue-600 font-black uppercase text-xs tracking-widest mt-1">NIF: {empresa.nif || 'Não definido'}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Email Corporativo</div>
                                        <div className="text-sm font-bold">{empresa.email || '---'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Telefone</div>
                                        <div className="text-sm font-bold">{empresa.telefone || '---'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Responsável / Ponto de Contacto</div>
                                        <div className="text-sm font-bold">{empresa.responsavel || '---'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Endereço</div>
                                        <div className="text-sm font-bold truncate max-w-[200px]">{empresa.endereco || '---'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Financial Summary */}
                <div className="space-y-6">
                    <Card className="p-6 border-none bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Investido</div>
                        <div className="text-3xl font-black mt-1">
                            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(empresa.totalToPay)}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase bg-white/10 w-fit px-3 py-1 rounded-full">
                            <Users size={12} /> {empresa._count?.alunos || empresa.alunos?.length || 0} Funcionários Registados
                        </div>
                    </Card>

                    <Card className="p-6 border-none bg-zinc-900 text-white">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Estado de Pagamentos</div>
                            <Wallet size={16} className="text-blue-500" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div className="text-[10px] font-black uppercase text-zinc-500 leading-none">Total Pago</div>
                                <div className="text-lg font-black text-green-500 leading-none">
                                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(empresa.totalPaid)}
                                </div>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-green-500 h-full transition-all duration-1000"
                                    style={{ width: `${(empresa.totalPaid / (empresa.totalToPay || 1)) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-end pt-2 border-t border-zinc-800">
                                <div className="text-[10px] font-black uppercase text-zinc-500 leading-none tracking-widest">Saldo Devedor</div>
                                <div className="text-lg font-black text-red-500 leading-none">
                                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(empresa.balance)}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card className="overflow-hidden border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                        <div className="font-black uppercase text-xs tracking-widest flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                            <TrendingUp size={16} className="text-blue-500" />
                            Histórico de Matrículas por Empresa
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={empresa.matriculas || []}
                        keyExtractor={(item) => item.id}
                        className="border-none"
                    />
                </Card>
            </div>
        </div>
    );
}
