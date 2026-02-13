'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Column, DataTable } from "@/components/ui/DataTable";
import { Shield, ShieldPlus, Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ModuleItemPermissionSelector } from "@/components/admin/ModuleItemPermissionSelector";

export default function PerfisPage() {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [modules, setModules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
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
        try {
            const [profilesRes, modulesRes] = await Promise.all([
                fetch("/api/perfis"),
                fetch("/api/modulos")
            ]);
            if (profilesRes.ok) setProfiles(await profilesRes.json());
            if (modulesRes.ok) {
                const mods = await modulesRes.json();
                setModules(mods);
            }
        } catch (error) {
            toast.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                    <div className="h-8 w-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xs border border-zinc-700">
                        <Shield size={16} />
                    </div>
                    <div>
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-zinc-500">{item.description}</div>
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
                        <span key={p.id} className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] border border-zinc-700">
                            {p.module.name} {p.canWrite ? '(W)' : '(R)'}
                        </span>
                    ))}
                    {item.permissions.filter((p: any) => p.canRead).length === 0 && <span className="text-zinc-600 text-[10px]">Sem acessos</span>}
                </div>
            )
        },
        {
            key: "actions",
            header: "Ações",
            render: (item) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline" size="icon" className="h-8 w-8 border-zinc-700 hover:bg-zinc-800"
                        disabled={item.name === 'Administrador'}
                        onClick={() => handleEdit(item)}
                    >
                        <Edit size={14} className="text-zinc-400" />
                    </Button>
                    <Button
                        variant="outline" size="icon" className="h-8 w-8 border-zinc-700 hover:bg-zinc-800 text-red-500"
                        disabled={item.name === 'Administrador'}
                        onClick={() => handleDelete(item.id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    if (loading) return <div className="p-8 text-center text-zinc-500">A carregar perfis...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Perfis de Acesso</h1>
                    <p className="text-sm text-zinc-400">Defina os níveis de permissão padrão para o sistema</p>
                </div>
                <Button
                    onClick={() => { if (showForm) resetForm(); else { resetForm(); setShowForm(true); } }}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                >
                    <ShieldPlus size={18} /> {showForm ? 'Cancelar' : 'Novo Perfil'}
                </Button>
            </div>

            {showForm && (
                <Card className="p-6 border-zinc-800 bg-zinc-900/50 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Nome do Perfil</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: Gestor Académico"
                                    className="bg-zinc-950 border-zinc-800 text-white focus:border-blue-500/50 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Descrição</label>
                                <Input
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Breve descrição do acesso"
                                    className="bg-zinc-950 border-zinc-800 text-white focus:border-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-zinc-500 flex items-center gap-2 border-b border-zinc-800 pb-2 uppercase tracking-[0.2em]">
                                Permissões por Módulo
                            </h3>
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

                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                            <Button type="button" variant="outline" onClick={resetForm} className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800">
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                                {editingId ? 'Atualizar Perfil' : 'Guardar Perfil'}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <DataTable columns={columns} data={profiles} keyExtractor={(item) => item.id} />
            </div>
        </div>
    );
}

