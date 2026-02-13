"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { UserPlus, Shield, Mail, Calendar, Trash2, Edit, Eye, EyeOff, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ModuleItemPermissionSelector } from "@/components/admin/ModuleItemPermissionSelector";

export default function UtilizadoresPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [modules, setModules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
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
        try {
            const [usersRes, profilesRes, modulesRes] = await Promise.all([
                fetch("/api/utilizadores"),
                fetch("/api/perfis"),
                fetch("/api/modulos")
            ]);

            if (usersRes.ok) setUsers(await usersRes.json());
            if (profilesRes.ok) setProfiles(await profilesRes.json());
            if (modulesRes.ok) setModules(await modulesRes.json());
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
        setFormData({
            name: user.name,
            email: user.email,
            password: "", // Não preencher password em edição
            role: user.role,
            profileId: user.profileId || "",
            permissions: modules.map(m => {
                const p = user.permissions.find((up: any) => up.moduleId === m.id);
                return {
                    moduleId: m.id,
                    moduleName: m.name,
                    canRead: p ? p.canRead : false,
                    canWrite: p ? p.canWrite : false
                };
            }),
            itemPermissions: modules.flatMap(m => m.items.map((i: any) => {
                const ip = user.itemPermissions.find((uip: any) => uip.moduleItemId === i.id);
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

    const handleProfileChange = (profileId: string) => {
        const selectedProfile = profiles.find(p => p.id === profileId);
        if (selectedProfile) {
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
        } else {
            setFormData({ ...formData, profileId: "", permissions: [], itemPermissions: [] });
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
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                        {item.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-[10px] text-gray-400">{item.profile?.name || 'Sem perfil'}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "email",
            header: "Email",
            render: (item) => <div className="flex items-center gap-2 text-gray-500"><Mail size={14} /> {item.email}</div>,
        },
        {
            key: "role",
            header: "Nível",
            render: (item) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                    item.role === 'RH' ? 'bg-blue-100 text-blue-700' :
                        item.role === 'FINANCEIRO' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                    }`}>
                    {item.role}
                </span>
            ),
        },
        {
            key: "createdAt",
            header: "Criado em",
            render: (item) => <div className="text-gray-500 text-sm">{new Date(item.createdAt).toLocaleDateString()}</div>,
        },
        {
            key: "actions",
            header: "Ações",
            render: (item) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline" size="icon" className="h-8 w-8"
                        disabled={item.role === 'ADMIN' && item.email === 'admin@admin.com'}
                        onClick={() => handleEdit(item)}
                    >
                        <Edit size={14} />
                    </Button>
                    <Button
                        variant="outline" size="icon" className="h-8 w-8 text-red-500"
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
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Gestão de Utilizadores</h1>
                    <p className="text-sm text-gray-500">Administração de contas e níveis de acesso</p>
                </div>
                <Button onClick={() => { if (showForm) resetForm(); else { resetForm(); setShowForm(true); } }} className="gap-2">
                    <UserPlus size={18} /> {showForm ? 'Cancelar' : 'Novo Utilizador'}
                </Button>
            </div>

            {showForm && (
                <Card className="p-6 border-blue-100 bg-blue-50/30">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Nome</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Nome completo"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@exemplo.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password {editingId && '(deixe em branco para não alterar)'}</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="******"
                                        className="pr-10"
                                        required={!editingId}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Perfil Base</label>
                                <Select
                                    value={formData.profileId}
                                    onChange={handleProfileChange}
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
                                <h3 className="text-sm font-bold flex items-center gap-2 border-b pb-2">
                                    <Shield size={16} className="text-blue-600" /> Personalizar Permissões (Overrides)
                                </h3>
                                <ModuleItemPermissionSelector
                                    modules={modules}
                                    permissions={formData.permissions}
                                    itemPermissions={formData.itemPermissions}
                                    togglePermission={togglePermission}
                                    toggleItemPermission={toggleItemPermission}
                                    expandedModules={expandedModules}
                                    toggleModuleExpansion={toggleModuleExpansion}
                                    isDark={false}
                                />
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
                            <Button type="submit">{editingId ? 'Atualizar Utilizador' : 'Guardar Utilizador'}</Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card className="p-4">
                <DataTable
                    columns={columns}
                    data={users}
                    keyExtractor={(item) => item.id}
                    className="border-none shadow-none"
                />
            </Card>
        </div>
    );
}

