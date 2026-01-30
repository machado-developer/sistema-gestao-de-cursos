"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Building2, Plus, Mail, Phone, Users as UsersIcon, Wallet, ArrowRight, Eye } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";

export default function EmpresasClientesPage() {
    const { t } = useLanguage();
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        nif: "",
        email: "",
        telefone: "",
        endereco: "",
        responsavel: ""
    });

    const fetchEmpresas = async () => {
        try {
            const res = await fetch("/api/empresas-clientes");
            const data = await res.json();
            if (res.ok) setEmpresas(data);
        } catch (error) {
            toast.error("Erro ao carregar empresas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/empresas-clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success("Empresa registada com sucesso");
                setShowForm(false);
                setFormData({ nome: "", nif: "", email: "", telefone: "", endereco: "", responsavel: "" });
                fetchEmpresas();
            } else {
                const error = await res.json();
                toast.error(error.error || "Erro ao registar empresa");
            }
        } catch (error) {
            toast.error("Erro ao processar pedido");
        }
    };

    const columns: Column<any>[] = [
        {
            key: "nome",
            header: t('corporate.table.company'),
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-zinc-900 dark:text-white">{item.nome}</div>
                        <div className="text-xs text-zinc-500 uppercase font-black tracking-widest">{item.nif || 'NIF não definido'}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "contato",
            header: "Contacto",
            render: (item) => (
                <div className="space-y-1">
                    <div className="text-xs flex items-center gap-2 text-zinc-500 font-bold"><Mail size={12} className="text-blue-500" /> {item.email || '---'}</div>
                    <div className="text-xs flex items-center gap-2 text-zinc-500 font-bold"><Phone size={12} className="text-blue-500" /> {item.telefone || '---'}</div>
                </div>
            ),
        },
        {
            key: "stats",
            header: t('corporate.table.employees'),
            render: (item) => (
                <div className="flex items-center gap-2">
                    <div className="h-8 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center gap-2">
                        <UsersIcon size={14} className="text-zinc-500" />
                        <span className="text-xs font-black">{item._count?.alunos || 0}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "finance",
            header: "Situação Financeira",
            render: (item) => (
                <div className="space-y-1">
                    <div className="flex justify-between w-32">
                        <span className="text-[10px] font-black uppercase text-zinc-400">Total:</span>
                        <span className="text-xs font-bold">{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.totalToPay)}</span>
                    </div>
                    <div className="flex justify-between w-32 border-t border-zinc-100 dark:border-zinc-800 pt-1">
                        <span className="text-[10px] font-black uppercase text-zinc-400">Saldo:</span>
                        <span className={`text-xs font-bold ${item.balance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.balance)}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: "actions",
            header: t('common.actions'),
            render: (item) => (
                <div className="flex gap-2">
                    <Link href={`/empresas-clientes/${item.id}`}>
                        <Button variant="outline" size="sm" className="h-9 px-4 gap-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                            <Eye size={14} /> {t('common.view')}
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
                        <span className="text-blue-600">Empresas</span> Clientes
                    </h1>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">
                        Gestão de convénios e funcionários externos
                    </p>
                </div>
                <Button onClick={() => setShowForm(!showForm)} className="h-12 px-6 gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl shadow-xl shadow-blue-900/20 font-black uppercase text-[10px] tracking-widest transition-all active:scale-95">
                    <Plus size={18} /> {t('corporate.new')}
                </Button>
            </div>

            {showForm && (
                <Card className="p-8 border-blue-100 dark:border-blue-900/30 bg-blue-50/10 dark:bg-blue-900/5 animate-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Nome da Empresa"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                placeholder="Ex: Unitel, Sonangol..."
                                required
                            />
                        </div>
                        <Input
                            label="NIF"
                            value={formData.nif}
                            onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                            placeholder="Nº de Identificação Fiscal"
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="financeiro@empresa.ao"
                        />
                        <Input
                            label="Telefone"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                            placeholder="+244 9..."
                        />
                        <Input
                            label="Ponto de Contacto / Responsável"
                            value={formData.responsavel}
                            onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                            placeholder="Nome do Gestor de RH/Formação"
                        />
                        <div className="md:col-span-3">
                            <Input
                                label="Endereço"
                                value={formData.endereco}
                                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                                placeholder="Morada completa da sede"
                            />
                        </div>
                        <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="h-12 px-6 font-black uppercase text-[10px] tracking-widest">
                                Cancelar
                            </Button>
                            <Button type="submit" className="h-12 px-10 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest">
                                Registar Empresa
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card className="overflow-hidden border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none">
                <DataTable
                    columns={columns}
                    data={empresas}
                    loading={loading}
                    keyExtractor={(item) => item.id}
                    className="border-none"
                />
            </Card>
        </div>
    );
}
