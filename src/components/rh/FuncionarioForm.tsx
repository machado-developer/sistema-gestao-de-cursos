"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FuncionarioForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [departamentos, setDepartamentos] = useState<any[]>([])
    const [cargos, setCargos] = useState<any[]>([])

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            nome: "",
            bi_documento: "",
            nif: "",
            email: "",
            telefone: "",
            cargoId: "",
            departamentoId: "",
            data_admissao: new Date().toISOString().split("T")[0],
            salario_base: 70000,
            subsidio_alimentacao: 0,
            subsidio_transporte: 0,
        }
    });

    useEffect(() => {
        fetch('/api/rh/departamentos').then(res => res.json()).then(setDepartamentos)
        fetch('/api/rh/cargos').then(res => res.json()).then(setCargos)
    }, [])

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch("/api/rh/funcionarios", {
                method: initialData ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Erro ao salvar");

            toast.success("Funcionário salvo com sucesso!");
            router.push("/rh/funcionarios");
        } catch (error) {
            toast.error("Ocorreu um erro ao salvar os dados.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dados Pessoais */}
                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6">
                    <div className="border-b-2 border-slate-100 dark:border-zinc-800 pb-2">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identificação Pessoal</h2>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Nome Completo</label>
                        <Input {...register("nome", { required: true })} placeholder="Nome Completo" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">BI / Passaporte</label>
                            <Input {...register("bi_documento", { required: true })} placeholder="Nº Documento" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">NIF</label>
                            <Input {...register("nif")} placeholder="NIF" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Email Profissional</label>
                            <Input {...register("email")} type="email" placeholder="email@exemplo.com" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Contacto Telefónico</label>
                            <Input {...register("telefone")} placeholder="+244 ..." className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                    </div>
                </Card>

                {/* Dados Profissionais */}
                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6">
                    <div className="border-b-2 border-slate-100 dark:border-zinc-800 pb-2">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enquadramento Profissional</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Departamento</label>
                            <select
                                {...register("departamentoId", { required: true })}
                                className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Seleccione...</option>
                                {departamentos.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Cargo / Função</label>
                            <select
                                {...register("cargoId", { required: true })}
                                className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Seleccione...</option>
                                {cargos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Data de Admissão</label>
                            <Input {...register("data_admissao")} type="date" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Nº de Segurança Social</label>
                            <Input {...register("numero_inss")} placeholder="INSS" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                    </div>
                </Card>

                {/* Dados Salariais */}
                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6 lg:col-span-2">
                    <div className="border-b-2 border-slate-100 dark:border-zinc-800 pb-2">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compensações e Benefícios</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Salário Base Mensal (Kz)</label>
                            <Input {...register("salario_base")} type="number" step="0.01" className="font-bold bg-slate-50 dark:bg-zinc-800/50 text-blue-600" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Sub. Alimentação</label>
                            <Input {...register("subsidio_alimentacao")} type="number" step="0.01" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Sub. Transporte</label>
                            <Input {...register("subsidio_transporte")} type="number" step="0.01" className="font-bold bg-slate-50 dark:bg-zinc-800/50" />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit">
                    Salvar Funcionário
                </Button>
            </div>
        </form>
    );
}
