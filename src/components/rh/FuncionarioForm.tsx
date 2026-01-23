"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { funcionarioSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
    User,
    FileText,
    Briefcase,
    Wallet,
    Building2,
    Phone,
    Mail,
    Calendar,
    Fingerprint,
    CreditCard,
    Save,
    X,
    Loader2,
    ArrowLeft
} from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

type FuncionarioFormData = z.infer<typeof funcionarioSchema>;

export default function FuncionarioForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [departamentos, setDepartamentos] = useState<any[]>([])
    const [cargos, setCargos] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isDirty }
    } = useForm<FuncionarioFormData>({
        resolver: zodResolver(funcionarioSchema),
        defaultValues: initialData || {
            nome: "",
            bi_documento: "",
            nif: "",
            email: "",
            telefone: "",
            cargoId: "",
            departamentoId: "",
            data_admissao: new Date().toISOString().split("T")[0],
            salario_base: 100000, // Defeito 100k Kz
            subsidio_alimentacao: 0,
            subsidio_transporte: 0,
        }
    });

    const selectedDeptId = watch("departamentoId");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [deptsRes, cargosRes] = await Promise.all([
                    fetch('/api/rh/departamentos'),
                    fetch('/api/rh/cargos')
                ]);
                setDepartamentos(await deptsRes.json());
                setCargos(await cargosRes.json());
            } catch (error) {
                toast.error("Erro de Sistema", {
                    description: "Não foi possível carregar os dados auxiliares."
                });
            }
        };
        loadInitialData();
    }, []);

    // Limpar cargo se mudar de departamento
    useEffect(() => {
        if (!initialData) {
            setValue("cargoId", "");
        }
    }, [selectedDeptId, setValue, initialData]);

    const filteredCargos = cargos.filter(c => !selectedDeptId || c.departamentoId === selectedDeptId);

    const onSubmit = async (data: FuncionarioFormData) => {
        try {
            const res = await fetch("/api/rh/funcionarios", {
                method: initialData ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error();

            toast.success(initialData ? "Ficha Atualizada" : "Colaborador Admitido", {
                description: `O registo de "${data.nome}" foi processado com sucesso.`,
                icon: <Save size={16} className="text-emerald-500" />
            });
            router.push("/rh/funcionarios");
        } catch (error) {
            toast.error("Erro no Processamento", {
                description: "Não foi possível gravar os dados. Verifique a ligação."
            });
        }
    };

    const handleCancel = () => {
        if (isDirty) {
            setShowCancelModal(true);
        } else {
            router.back();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Form Header Action Bar */}
            <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tighter uppercase">
                            {initialData ? 'Editar Ficha Cadastral' : 'Registo de Novo Colaborador'}
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Formulário de Recrutamento e Admissão</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleCancel}
                        className="h-11 px-6 text-[10px] font-black uppercase tracking-widest border-slate-200 dark:border-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:text-rose-600 transition-all"
                    >
                        Descartar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-11 px-8 bg-blue-600 text-[10px] font-black uppercase tracking-widest border-b-4 border-blue-800 text-white gap-2"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isSubmitting ? 'GUARDANDO...' : (initialData ? 'ACTUALIZAR DADOS' : 'EFECTUAR REGISTO')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dados Pessoais */}
                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <User size={120} />
                    </div>

                    <div className="flex items-center gap-2 border-b-2 border-slate-100 dark:border-zinc-800 pb-2">
                        <Fingerprint size={16} className="text-blue-500" />
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identificação e Biometria</h2>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome Completo do Candidato</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <Input
                                {...register("nome")}
                                placeholder="Insira o nome conforme documento..."
                                className={`pl-10 h-12 font-bold bg-slate-50 dark:bg-zinc-800/30 border-2 ${errors.nome ? 'border-red-500 ring-red-500' : 'border-slate-100 dark:border-zinc-800 group-hover:border-blue-500'}`}
                            />
                        </div>
                        {errors.nome && <p className="text-[9px] font-black text-red-500 uppercase">{errors.nome.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">BI / Passaporte</label>
                            <Input
                                {...register("bi_documento")}
                                placeholder="Nº de Identificação"
                                className={`h-11 font-bold bg-slate-50 dark:bg-zinc-800/30 border-2 ${errors.bi_documento ? 'border-red-500' : 'border-slate-100 dark:border-zinc-800'}`}
                            />
                            {errors.bi_documento && <p className="text-[9px] font-black text-red-500 uppercase leading-none mt-1">{errors.bi_documento.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">NIF (Opcional)</label>
                            <Input
                                {...register("nif")}
                                placeholder="Nº Fiscal"
                                className={`h-11 font-bold bg-slate-50 dark:bg-zinc-800/30 border-2 ${errors.nif ? 'border-red-500' : 'border-slate-100 dark:border-zinc-800'}`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Profissional</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                                <Input
                                    {...register("email")}
                                    type="email"
                                    placeholder="exemplo@empresa.com"
                                    className={`pl-9 h-11 font-bold bg-slate-50 dark:bg-zinc-800/30 border-2 ${errors.email ? 'border-red-500' : 'border-slate-100 dark:border-zinc-800'}`}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Telemóvel</label>
                            <div className="relative group">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                                <Input
                                    {...register("telefone")}
                                    placeholder="+244 9..."
                                    className={`pl-9 h-11 font-bold bg-slate-50 dark:bg-zinc-800/30 border-2 ${errors.telefone ? 'border-red-500' : 'border-slate-100 dark:border-zinc-800'}`}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Dados Profissionais */}
                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Building2 size={120} />
                    </div>

                    <div className="flex items-center gap-2 border-b-2 border-slate-100 dark:border-zinc-800 pb-2">
                        <Briefcase size={16} className="text-blue-500" />
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vínculo e Enquadramento</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Unidade / Departamento</label>
                            <div className="relative group">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <select
                                    {...register("departamentoId")}
                                    className={`w-full h-11 pl-9 pr-3 rounded-md border-2 bg-slate-50 dark:bg-zinc-800/30 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${errors.departamentoId ? 'border-red-500 ring-red-500' : 'border-slate-100 dark:border-zinc-800'}`}
                                >
                                    <option value="">FILTRAR POR UNIDADE...</option>
                                    {departamentos.map(d => <option key={d.id} value={d.id}>{d.nome.toUpperCase()}</option>)}
                                </select>
                            </div>
                            {errors.departamentoId && <p className="text-[9px] font-black text-red-500 uppercase">{errors.departamentoId.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cargo e Especialidade</label>
                            <div className="relative group">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <select
                                    {...register("cargoId")}
                                    className={`w-full h-11 pl-9 pr-3 rounded-md border-2 bg-slate-50 dark:bg-zinc-800/30 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${errors.cargoId ? 'border-red-500 ring-red-500' : 'border-slate-100 dark:border-zinc-800'}`}
                                >
                                    <option value="">SELECCIONE A FUNÇÃO...</option>
                                    {filteredCargos.map(c => <option key={c.id} value={c.id}>{c.nome.toUpperCase()}</option>)}
                                </select>
                            </div>
                            {errors.cargoId && <p className="text-[9px] font-black text-red-500 uppercase">{errors.cargoId.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data Efetiva de Admissão</label>
                            <div className="relative group">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <Input
                                    {...register("data_admissao")}
                                    type="date"
                                    className={`pl-9 h-11 font-bold bg-slate-50 dark:bg-zinc-800/30 border-2 ${errors.data_admissao ? 'border-red-500' : 'border-slate-100 dark:border-zinc-800'}`}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Segurança Social (INSS)</label>
                            <div className="relative group">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <Input
                                    {...register("numero_inss")}
                                    placeholder="Nº de Beneficiário"
                                    className="pl-9 h-11 font-bold bg-slate-50 dark:bg-zinc-800/30 border-2 border-slate-100 dark:border-zinc-800"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Dados Salariais */}
                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900/50 dark:to-zinc-800/10 shadow-sm space-y-6 lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Wallet size={120} />
                    </div>

                    <div className="flex items-center gap-2 border-b-2 border-slate-100 dark:border-zinc-800 pb-2">
                        <Wallet size={16} className="text-emerald-500" />
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grelha Salarial e Compensatória</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Salário Base (Bruto)</label>
                                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 rounded">MENSAL</span>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-600 uppercase">Kz</span>
                                <Input
                                    {...register("salario_base")}
                                    type="number"
                                    step="0.01"
                                    className={`pl-10 h-12 font-black text-lg bg-white dark:bg-zinc-900/50 border-2 ${errors.salario_base ? 'border-red-500' : 'border-slate-100 dark:border-zinc-800 focus:border-emerald-500'}`}
                                />
                            </div>
                            {errors.salario_base && <p className="text-[9px] font-black text-red-500 uppercase">{errors.salario_base.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subsídio de Alimentação</label>
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">Kz</span>
                                <Input
                                    {...register("subsidio_alimentacao")}
                                    type="number"
                                    step="0.01"
                                    className="pl-10 h-12 font-bold bg-white dark:bg-zinc-900/50 border-2 border-slate-100 dark:border-zinc-800 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subsídio de Transporte</label>
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">Kz</span>
                                <Input
                                    {...register("subsidio_transporte")}
                                    type="number"
                                    step="0.01"
                                    className="pl-10 h-12 font-bold bg-white dark:bg-zinc-900/50 border-2 border-slate-100 dark:border-zinc-800 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/20">
                        <div className="flex gap-4 items-center">
                            <div className="p-2 bg-blue-500 text-white rounded-md">
                                <FileText size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Nota Fiscal</p>
                                <p className="text-[9px] font-medium text-blue-400 uppercase leading-tight">Os descontos de IRT (Grupo A) e INSS (3%) são calculados automaticamente no processamento mensal.</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Custom Confirmation Modal for Cancel action */}
            <ConfirmModal
                isOpen={showCancelModal}
                title="Descartar Alterações?"
                message="Existem dados não salvos neste formulário. Se sair agora, todas as informações inseridas serão perdidas permanentemente."
                type="warning"
                confirmText="Sair sem Gravar"
                cancelText="Continuar Editando"
                onConfirm={() => router.back()}
                onCancel={() => setShowCancelModal(false)}
            />
        </form>
    );
}
