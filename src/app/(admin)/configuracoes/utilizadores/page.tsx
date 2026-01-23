"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { UserPlus, Shield, Mail, Calendar, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

export default function UtilizadoresPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "USER" });

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/utilizadores");
            const data = await res.json();
            if (res.ok) setUsers(data);
        } catch (error) {
            toast.error("Erro ao carregar utilizadores");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/utilizadores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success("Utilizador criado com sucesso");
                setShowForm(false);
                setFormData({ name: "", email: "", password: "", role: "USER" });
                fetchUsers();
            } else {
                const error = await res.json();
                toast.error(error.error || "Erro ao criar utilizador");
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
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {item.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{item.name}</span>
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
            header: "Perfil",
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
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled={item.role === 'ADMIN'}>
                        <Edit size={14} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-500" disabled={item.role === 'ADMIN'}>
                        <Trash2 size={14} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Gestão de Utilizadores</h1>
                    <p className="text-sm text-gray-500">Administração de contas e níveis de acesso</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)} className="gap-2">
                    <UserPlus size={18} /> Novo Utilizador
                </Button>
            </div>

            {showForm && (
                <Card className="p-6 border-blue-100 bg-blue-50/30">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="******"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Perfil</label>
                            <Select
                                value={formData.role}
                                onChange={(e: any) => setFormData({ ...formData, role: e.target.value })}
                                options={[
                                    { value: 'USER', label: 'Utilizador Padrão' },
                                    { value: 'RH', label: 'Recursos Humanos' },
                                    { value: 'FINANCEIRO', label: 'Financeiro' },
                                    { value: 'GESTOR_ACADEMICO', label: 'Gestor Académico' },
                                    { value: 'ADMIN', label: 'Administrador' },
                                ]}
                            />
                        </div>
                        <div className="md:col-span-4 flex justify-end gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
                            <Button type="submit">Guardar Utilizador</Button>
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
