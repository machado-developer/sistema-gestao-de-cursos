'use client'

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Column, DataTable } from "@/components/ui/DataTable";
import { Shield, ShieldPlus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ModuleItemPermissionSelector } from "@/components/admin/ModuleItemPermissionSelector";

interface PerfisClientProps {
    initialProfiles: any[];
    modules: any[];
}

export default function PerfisClient({ initialProfiles, modules }: PerfisClientProps) {
    const [profiles, setProfiles] = useState<any[]>(initialProfiles);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        permissions: [] as any[],
        itemPermissions: [] as any[]
    });

    const [expandedModules, setExpandedModules] = useState<string[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/perfis");
            if (res.ok) setProfiles(await res.json());
        } catch (error) {
            toast.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            permissions: modules.map((m: any) => ({
                moduleId: m.id,
                moduleName: m.name,
                canRead: false,
                canWrite: false
            })),
            itemPermissions: modules.flatMap((m: any) =>
                m.items.map((i: any) => ({
                    moduleItemId: i.id,
                    moduleItemName: i.name,
                    moduleId: m.id,
                    canRead: false,
                    canWrite: false
                }))
            )
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (profile: any) => {
        setEditingId(profile.id);
        setFormData({
            name: profile.name,
            description: profile.description || "",
            permissions: modules.map(m => {
                const p = profile.permissions.find((pp: any) => pp.moduleId === m.id);
                return {
                    moduleId: m.id,
                    moduleName: m.name,
                    canRead: p ? p.canRead : false,
                    canWrite: p ? p.canWrite : false
                };
            }),
            itemPermissions: modules.flatMap(m => m.items.map((i: any) => {
                const ip = profile.itemPermissions.find((pip: any) => pip.moduleItemId === i.id);
                return {
                    moduleItemId: i.id,
                    moduleItemName: i.name,
                    moduleId: m.id,
                    canRead: ip ? ip.canRead : false,
                    canWrite: ip ? ip.canWrite : false
                };
            }))
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem a certeza que deseja eliminar este perfil?")) return;
        try {
            const res = await fetch(`/api/perfis/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Perfil eliminado");
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Erro ao eliminar");
            }
        } catch (error) {
            toast.error("Erro no servidor");
        }
    };

    const togglePermission = (moduleId: string, field: 'canRead' | 'canWrite') => {
        const updatedPermissions = [...formData.permissions];
        const index = updatedPermissions.findIndex(p => p.moduleId === moduleId);
        if (index > -1) {
            updatedPermissions[index][field] = !updatedPermissions[index][field];
            if (field === 'canRead' && !updatedPermissions[index].canRead) updatedPermissions[index].canWrite = false;
            if (field === 'canWrite' && updatedPermissions[index].canWrite) updatedPermissions[index].canRead = true;

            if (field === 'canRead' && !updatedPermissions[index].canRead) {
                const updatedItemPermissions = formData.itemPermissions.map(ip =>
                    ip.moduleId === moduleId ? { ...ip, canRead: false, canWrite: false } : ip
                );
                setFormData({ ...formData, permissions: updatedPermissions, itemPermissions: updatedItemPermissions });
            } else {
                setFormData({ ...formData, permissions: updatedPermissions });
            }
        }
    };

    const toggleItemPermission = (moduleItemId: string, field: 'canRead' | 'canWrite') => {
        const updatedItemPermissions = [...formData.itemPermissions];
        const index = updatedItemPermissions.findIndex(p => p.moduleItemId === moduleItemId);
        if (index > -1) {
            updatedItemPermissions[index][field] = !updatedItemPermissions[index][field];
            if (field === 'canRead' && !updatedItemPermissions[index].canRead) updatedItemPermissions[index].canWrite = false;
            if (field === 'canWrite' && updatedItemPermissions[index].canWrite) updatedItemPermissions[index].canRead = true;

            const updatedFormData = { ...formData, itemPermissions: updatedItemPermissions };

            if (updatedItemPermissions[index].canRead) {
                const moduleId = updatedItemPermissions[index].moduleId;
                const updatedPermissions = [...formData.permissions];
                const modIndex = updatedPermissions.findIndex(p => p.moduleId === moduleId);
                if (modIndex > -1 && !updatedPermissions[modIndex].canRead) {
                    updatedPermissions[modIndex].canRead = true;
                    updatedFormData.permissions = updatedPermissions;
                }
            }
            setFormData(updatedFormData);
        }
    };

    const toggleModuleExpansion = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/perfis/${editingId}` : "/api/perfis";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success(editingId ? "Perfil atualizado" : "Perfil criado");
                resetForm();
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Erro ao guardar");
            }
        } catch (error) {
            toast.error("Erro ao processar pedido");
        }
    };

    const columns: Column<any>[] = [
        {
            key: "name",
            header: "Perfil",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 flex items-center justify-center font-bold text-xs border border-slate-200 dark:border-zinc-700">
                        <Shield size={16} />
                    </div>
                    <div>
                        <div className="font-semibold text-slate-900 dark:text-white capitalize leading-tight mb-0.5">{item.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none">{item.description}</div>
                    </div>
                </div>
            )
        },
        {
            key: "permissions",
            header: "Permissões",
            render: (item) => (
                <div className="flex flex-wrap gap-1">
                    {item.permissions.filter((p: any) => p.canRead).map((p: any) => (
                        <span key={p.id} className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 text-[9px] font-bold uppercase tracking-wider border border-slate-200 dark:border-zinc-700">
                            {p.module.name} {p.canWrite ? '(WD)' : '(RD)'}
                        </span>
                    ))}
                    {item.permissions.filter((p: any) => p.canRead).length === 0 && <span className="text-slate-400 text-[10px] italic">Sem acessos configurados</span>}
                </div>
            )
        },
        {
            key: "actions",
            header: "Ações",
            className: "text-right px-6",
            render: (item) => (
                <div className="flex gap-2 justify-end">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all duration-200"
                        disabled={item.name === 'Administrador'}
                        onClick={() => handleEdit(item)}
                    >
                        <Edit size={14} className="text-slate-500 dark:text-zinc-400" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-slate-200 dark:border-zinc-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 transition-all duration-200"
                        disabled={item.name === 'Administrador'}
                        onClick={() => handleDelete(item.id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white dark:bg-zinc-900/50 p-1 rounded-2xl border border-slate-200 dark:border-zinc-800">
                <div className="px-4">
                    <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-0.5">Perfis de Acesso</h1>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Níveis de Segurança e Permissão</p>
                    </div>
                </div>
                <Button
                    onClick={() => { if (showForm) resetForm(); else { resetForm(); setShowForm(true); } }}
                    className={`gap-2 ${showForm ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'} text-[10px] font-black uppercase tracking-widest h-10 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-95`}
                >
                    <ShieldPlus size={16} /> {showForm ? 'Cancelar' : 'Novo Perfil'}
                </Button>
            </div>

            {showForm && (
                <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 rounded-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Perfil</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: Gestor Financeiro"
                                    className="h-11 bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl font-medium"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição Curta</label>
                                <Input
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Acesso total a módulos financeiros..."
                                    className="h-11 bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
                                <Shield className="text-blue-600" size={16} />
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                    Controlo de Acesso por Módulo
                                </h3>
                            </div>
                            <div className="bg-slate-50 dark:bg-zinc-950/50 rounded-2xl p-4 border border-slate-200 dark:border-zinc-800">
                                <ModuleItemPermissionSelector
                                    modules={modules}
                                    permissions={formData.permissions}
                                    itemPermissions={formData.itemPermissions}
                                    togglePermission={togglePermission}
                                    toggleItemPermission={toggleItemPermission}
                                    expandedModules={expandedModules}
                                    toggleModuleExpansion={toggleModuleExpansion}
                                    isDark={true}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-zinc-800">
                            <Button type="button" variant="outline" onClick={resetForm} className="h-11 px-6 rounded-xl border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all font-bold text-xs">
                                Descartar Alterações
                            </Button>
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20">
                                {editingId ? 'Confirmar Atualização' : 'Finalizar Cadastro'}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 overflow-hidden shadow-sm backdrop-blur-sm">
                <DataTable
                    columns={columns}
                    data={profiles}
                    keyExtractor={(item) => item.id}
                    loading={loading}
                />
            </div>
        </div>
    );
}
