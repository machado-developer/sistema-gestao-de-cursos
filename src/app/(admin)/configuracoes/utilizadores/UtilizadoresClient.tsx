'use client'

import { useState } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { UserPlus, Shield, Mail, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { ModuleItemPermissionSelector } from "@/components/admin/ModuleItemPermissionSelector";

interface UtilizadoresClientProps {
    initialUsers: any[];
    profiles: any[];
    modules: any[];
}

export default function UtilizadoresClient({ initialUsers, profiles, modules }: UtilizadoresClientProps) {
    const [users, setUsers] = useState<any[]>(initialUsers);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
        profileId: "",
        permissions: [] as any[],
        itemPermissions: [] as any[]
    });
    const [showPassword, setShowPassword] = useState(false);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/utilizadores");
            if (res.ok) setUsers(await res.json());
        } catch (error) {
            toast.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "USER",
            profileId: "",
            permissions: [],
            itemPermissions: []
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (user: any) => {
        setEditingId(user.id);
        const userPermissions = modules.map(m => {
            const p = user.permissions?.find((up: any) => up.moduleId === m.id);
            return {
                moduleId: m.id,
                moduleName: m.name,
                canRead: p ? p.canRead : false,
                canWrite: p ? p.canWrite : false
            };
        });

        const userItemPermissions = modules.flatMap(m => m.items.map((i: any) => {
            const ip = user.itemPermissions?.find((uip: any) => uip.moduleItemId === i.id);
            return {
                moduleItemId: i.id,
                moduleItemName: i.name,
                moduleId: m.id,
                canRead: ip ? ip.canRead : false,
                canWrite: ip ? ip.canWrite : false
            };
        }));

        setFormData({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
            profileId: user.profileId || "",
            permissions: userPermissions,
            itemPermissions: userItemPermissions
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem a certeza que deseja eliminar este utilizador?")) return;
        try {
            const res = await fetch(`/api/utilizadores/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Utilizador eliminado");
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Erro ao eliminar");
            }
        } catch (error) {
            toast.error("Erro no servidor");
        }
    };

    const handleProfileChange = async (profileId: string) => {
        if (!profileId) {
            setFormData({ ...formData, profileId: "", permissions: [], itemPermissions: [] });
            return;
        }

        try {
            const res = await fetch(`/api/perfis/${profileId}`);
            if (res.ok) {
                const selectedProfile = await res.json();
                const newPermissions = modules.map(m => {
                    const profilePerm = selectedProfile.permissions.find((pp: any) => pp.moduleId === m.id);
                    return {
                        moduleId: m.id,
                        moduleName: m.name,
                        canRead: profilePerm ? profilePerm.canRead : false,
                        canWrite: profilePerm ? profilePerm.canWrite : false
                    };
                });

                const newItemPermissions = modules.flatMap((m: any) =>
                    m.items.map((i: any) => {
                        const profileItemPerm = selectedProfile.itemPermissions?.find((pip: any) => pip.moduleItemId === i.id);
                        return {
                            moduleItemId: i.id,
                            moduleItemName: i.name,
                            moduleId: m.id,
                            canRead: profileItemPerm ? profileItemPerm.canRead : false,
                            canWrite: profileItemPerm ? profileItemPerm.canWrite : false
                        };
                    })
                );

                setFormData({
                    ...formData,
                    profileId,
                    permissions: newPermissions,
                    itemPermissions: newItemPermissions,
                    role: selectedProfile.name === 'Administrador' ? 'ADMIN' : (selectedProfile.name === 'Recursos Humanos' || selectedProfile.name === 'RH' ? 'RH' :
                        selectedProfile.name === 'Financeiro' ? 'FINANCEIRO' : 'USER')
                });
            }
        } catch (error) {
            toast.error("Erro ao carregar perfil");
        }
    };

    const togglePermission = (moduleId: string, field: 'canRead' | 'canWrite') => {
        const updatedPermissions = [...formData.permissions];
        const index = updatedPermissions.findIndex(p => p.moduleId === moduleId);

        if (index > -1) {
            updatedPermissions[index][field] = !updatedPermissions[index][field];
            if (field === 'canRead' && !updatedPermissions[index].canRead) {
                updatedPermissions[index].canWrite = false;
                const updatedItemPermissions = formData.itemPermissions.map(ip =>
                    ip.moduleId === moduleId ? { ...ip, canRead: false, canWrite: false } : ip
                );
                setFormData({ ...formData, permissions: updatedPermissions, itemPermissions: updatedItemPermissions });
                return;
            }
            if (field === 'canWrite' && updatedPermissions[index].canWrite) {
                updatedPermissions[index].canRead = true;
            }
            setFormData({ ...formData, permissions: updatedPermissions });
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
            const url = editingId ? `/api/utilizadores/${editingId}` : "/api/utilizadores";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success(editingId ? "Utilizador atualizado" : "Utilizador criado");
                resetForm();
                fetchData();
            } else {
                const error = await res.json();
                toast.error(error.error || "Erro ao guardar");
            }
        } catch (error) {
            toast.error("Erro ao processar pedido");
        }
    };

    const columns: Column<any>[] = [
        {
            key: "name",
            header: "Nome",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 flex items-center justify-center font-bold text-xs border border-slate-200 dark:border-zinc-700 shadow-sm">
                        {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="font-semibold text-slate-900 dark:text-white capitalize truncate max-w-[150px]">{item.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{item.profile?.name || 'Manual Admin'}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "email",
            header: "Email",
            render: (item) => (
                <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-sm">
                    <Mail size={14} className="text-slate-300 dark:text-zinc-600" />
                    <span className="truncate max-w-[180px]">{item.email}</span>
                </div>
            ),
        },
        {
            key: "role",
            header: "Acesso Regional",
            render: (item) => (
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-[0.15em] border ${item.role === 'ADMIN' ? 'bg-red-50 dark:bg-red-950/30 text-red-600 border-red-100 dark:border-red-900/50' :
                    item.role === 'RH' ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 border-blue-100 dark:border-blue-900/50' :
                        item.role === 'FINANCEIRO' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-100 dark:border-emerald-900/50' :
                            'bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border-slate-100 dark:border-zinc-700'
                    }`}>
                    {item.role === 'ADMIN' ? 'Full Access' : (item.role || 'Restricted')}
                </span>
            ),
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
                        className="h-8 w-8 border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800"
                        disabled={item.role === 'ADMIN' && item.email === 'admin@admin.com'}
                        onClick={() => handleEdit(item)}
                    >
                        <Edit size={14} className="text-slate-500 dark:text-zinc-400" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-slate-200 dark:border-zinc-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500"
                        disabled={item.role === 'ADMIN' && item.email === 'admin@admin.com'}
                        onClick={() => handleDelete(item.id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white dark:bg-zinc-900/50 p-1 rounded-2xl border border-slate-200 dark:border-zinc-800">
                <div className="px-4">
                    <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-0.5">Gestão de Utilizadores</h1>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Controlo de Contas e Segurança</p>
                    </div>
                </div>
                <Button
                    onClick={() => { if (showForm) resetForm(); else { resetForm(); setShowForm(true); } }}
                    className={`gap-2 ${showForm ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'} text-[10px] font-black uppercase tracking-widest h-10 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-95`}
                >
                    <UserPlus size={16} /> {showForm ? 'Cancelar' : 'Novo Utilizador'}
                </Button>
            </div>

            {showForm && (
                <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Nome do utilizador"
                                    className="h-11 bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endereço de Email</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@exemplo.com"
                                    className="h-11 bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Palavra-Passe</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="******"
                                        className="h-11 bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl pr-10"
                                        required={!editingId}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Perfil de Acesso</label>
                                <Select
                                    value={formData.profileId}
                                    onChange={handleProfileChange}
                                    className="h-11 bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl shadow-none"
                                    options={[
                                        { value: "", label: "Selecionar Perfil" },
                                        ...profiles.map(p => ({ value: p.id, label: p.name }))
                                    ]}
                                    required
                                />
                            </div>
                        </div>

                        {formData.profileId && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
                                    <Shield size={16} className="text-blue-600" />
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        Customização de Permissões (Exceções)
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
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-zinc-800">
                            <Button type="button" variant="outline" onClick={resetForm} className="h-11 px-6 rounded-xl font-bold text-xs uppercase tracking-tight">Cancelar</Button>
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20">
                                {editingId ? 'Confirmar Edição' : 'Concluir Cadastro'}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 overflow-hidden shadow-sm backdrop-blur-sm">
                <DataTable
                    columns={columns}
                    data={users}
                    keyExtractor={(item) => item.id}
                    loading={loading}
                />
            </div>
        </div>
    );
}
