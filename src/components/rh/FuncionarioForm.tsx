"use client";

import { useForm, SubmitHandler, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { funcionarioSchema, type FuncionarioSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

import { Select } from "@/components/ui/Select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    Loader2,
    ArrowLeft,
    FileCheck,
    Upload,
    X,
    Clock
} from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { DocumentUpload } from "../DocumentUpload";

// Interface baseada no modelo Prisma
interface FuncionarioFormData {
    id?: string;
    nome: string;
    bi_documento: string;
    nif?: string | null;
    email?: string | null;
    telefone?: string | null;
    genero?: string | null;
    data_nascimento?: string | null;
    cargoId?: string | null;
    departamentoId?: string | null;
    data_admissao: string;
    numero_inss?: string | null;
    tipo_contrato: string;
    data_fim?: string | null;
    renovacao_automatica: boolean;
    salario_base: number;
    subsidio_alimentacao: number;
    subsidio_transporte: number;
    subsidio_residencia: number;
    outros_subsidios: number;
    iban?: string | null;
    hora_entrada?: string | null;
    hora_saida?: string | null;
    dias_trabalho?: string | null;
    documentos?: any[];
}

export default function FuncionarioForm({ initialData }: { initialData?: FuncionarioFormData }) {
    const router = useRouter();
    const [departamentos, setDepartamentos] = useState<any[]>([])
    const [cargos, setCargos] = useState<any[]>([])
    const [filteredCargos, setFilteredCargos] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [activeTab, setActiveTab] = useState<"dados" | "vencimento" | "historico" | "pagamentos" | "documentos">("dados")
    const [employeeDocs, setEmployeeDocs] = useState<any[]>(initialData?.documentos || [])
    const [stagedFiles, setStagedFiles] = useState<{ file: File, tipo: string, tempId: string }[]>([])

    // Converter dados do Prisma para o formato do formulário
    const getDefaultValues = (): FuncionarioSchema => {
        if (initialData) {
            return {
                nome: initialData.nome || "",
                bi_documento: initialData.bi_documento || "",
                nif: initialData.nif || "",
                email: initialData.email || "",
                telefone: initialData.telefone || "",
                genero: initialData.genero || "",
                data_nascimento: initialData.data_nascimento ?
                    new Date(initialData.data_nascimento).toISOString().split("T")[0] : "",
                cargoId: initialData.cargoId || undefined,
                departamentoId: initialData.departamentoId || undefined,
                data_admissao: initialData.data_admissao ?
                    new Date(initialData.data_admissao).toISOString().split("T")[0] :
                    new Date().toISOString().split("T")[0],
                numero_inss: initialData.numero_inss || "",
                tipo_contrato: (initialData.tipo_contrato as any) || "INDETERMINADO",
                data_fim: initialData.data_fim ?
                    new Date(initialData.data_fim).toISOString().split("T")[0] : "",
                renovacao_automatica: !!initialData.renovacao_automatica,
                salario_base: Number(initialData.salario_base) || 110000,
                subsidio_alimentacao: Number(initialData.subsidio_alimentacao) || 0,
                subsidio_transporte: Number(initialData.subsidio_transporte) || 0,
                subsidio_residencia: Number(initialData.subsidio_residencia) || 0,
                outros_subsidios: Number(initialData.outros_subsidios) || 0,
                iban: initialData.iban || "",
                hora_entrada: initialData.hora_entrada || "08:00",
                hora_saida: initialData.hora_saida || "17:00",
                dias_trabalho: initialData.dias_trabalho || "Seg,Ter,Qua,Qui,Sex",
            };
        }
        return {
            nome: "",
            bi_documento: "",
            nif: "",
            email: "",
            telefone: "",
            genero: "",
            data_nascimento: "",
            cargoId: undefined,
            departamentoId: undefined,
            data_admissao: new Date().toISOString().split("T")[0],
            numero_inss: "",
            tipo_contrato: "INDETERMINADO",
            data_fim: "",
            renovacao_automatica: false,
            salario_base: 110000,
            subsidio_alimentacao: 0,
            subsidio_transporte: 0,
            subsidio_residencia: 0,
            outros_subsidios: 0,
            iban: "",
            hora_entrada: "08:00",
            hora_saida: "17:00",
            dias_trabalho: "Seg,Ter,Qua,Qui,Sex",
        };
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors, isDirty }
    } = useForm<FuncionarioSchema>({
        resolver: zodResolver(funcionarioSchema) as any,
        defaultValues: getDefaultValues(),
        mode: "onChange"
    });

    const selectedDeptId = useWatch({
        control,
        name: "departamentoId"
    });
    const selectedCargoId = useWatch({
        control,
        name: "cargoId"
    });

    // Automate salary base based on selected Cargo
    useEffect(() => {
        if (selectedCargoId && !initialData?.id) { // Only automate for NEW registrations
            const selectedCargo = cargos.find(c => String(c.id) === String(selectedCargoId));
            if (selectedCargo && selectedCargo.salario_base) {
                setValue("salario_base", Number(selectedCargo.salario_base));
                toast.info("Salário Atualizado", {
                    description: `O salário base foi definido para ${formatCurrency(Number(selectedCargo.salario_base))} Kz conforme o cargo selecionado.`
                });
            }
        }
    }, [selectedCargoId, cargos, setValue, initialData]);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            try {
                const [deptsRes, cargosRes] = await Promise.all([
                    fetch('/api/rh/departamentos'),
                    fetch('/api/rh/cargos')
                ]);
                if (!deptsRes.ok || !cargosRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const deptsData = await deptsRes.json();
                const cargosData = await cargosRes.json();

                setDepartamentos(deptsData);
                setCargos(cargosData);

                // Se houver initialData, filtrar cargos para o departamento selecionado
                if (initialData?.departamentoId) {
                    const filtered = cargosData.filter((c: any) =>
                        String(c.departamentoId) === String(initialData.departamentoId)
                    );
                    setFilteredCargos(filtered);
                }
            } catch (error) {
                console.error("Error loading data:", error);
                toast.error("Erro de Sistema", {
                    description: "Não foi possível carregar os dados auxiliares."
                });
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, [initialData]);



    // Limpar cargo e atualizar lista filtrada se mudar de departamento
    useEffect(() => {
        if (selectedDeptId) {
            const filtered = cargos.filter(c =>
                String(c.departamentoId) === String(selectedDeptId)
            );
            setFilteredCargos(filtered);

            // Only reset if it's a new selection (not initial load)
            if (initialData?.departamentoId !== selectedDeptId) {
                // setValue("cargoId", undefined); 
            }
        } else {
            setFilteredCargos([]);
        }
    }, [selectedDeptId, cargos, initialData]);

    const onSubmit: SubmitHandler<FuncionarioSchema> = async (data) => {
        setIsSubmitting(true);
        try {
            // Preparar payload para API
            const payload: Partial<FuncionarioFormData> = {
                nome: data.nome,
                bi_documento: data.bi_documento,
                nif: data.nif || null,
                email: data.email || null,
                telefone: data.telefone || null,
                genero: data.genero || null,
                data_nascimento: data.data_nascimento ? new Date(data.data_nascimento).toISOString() : null,
                cargoId: data.cargoId || null,
                departamentoId: data.departamentoId || null,
                data_admissao: new Date(data.data_admissao).toISOString(),
                numero_inss: data.numero_inss || null,
                tipo_contrato: data.tipo_contrato,
                data_fim: data.data_fim ? new Date(data.data_fim).toISOString() : null,
                renovacao_automatica: data.renovacao_automatica,
                salario_base: Number(data.salario_base),
                subsidio_alimentacao: Number(data.subsidio_alimentacao),
                subsidio_transporte: Number(data.subsidio_transporte),
                subsidio_residencia: Number(data.subsidio_residencia),
                outros_subsidios: Number(data.outros_subsidios),
                iban: data.iban || null,
                hora_entrada: data.hora_entrada || null,
                hora_saida: data.hora_saida || null,
                dias_trabalho: data.dias_trabalho || null,
            };

            // Adicionar id para atualização se existir
            if (initialData?.id) {
                payload.id = initialData.id;
            }

            console.log("Submitting data:", payload);

            const url = initialData?.id ? `/api/rh/funcionarios/${initialData.id}` : "/api/rh/funcionarios";
            const res = await fetch(url, {
                method: initialData?.id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Erro ao processar a requisição');
            }

            const savedFuncionario = await res.json();
            const funcionarioId = initialData?.id || savedFuncionario.id;

            // Upload de documentos em fila (staged)
            if (stagedFiles.length > 0) {
                for (const staged of stagedFiles) {
                    const formData = new FormData();
                    formData.append('file', staged.file);
                    formData.append('tipo', staged.tipo);
                    formData.append('nome', staged.file.name);

                    await fetch(`/api/rh/funcionarios/${funcionarioId}/documentos`, {
                        method: 'POST',
                        body: formData,
                    });
                }
            }

            toast.success(initialData?.id ? "Ficha Atualizada" : "Colaborador Admitido", {
                description: `O registo de "${data.nome}" foi processado com sucesso.`,
                icon: <Save size={16} className="text-emerald-500" />
            });

            // Redirecionar após 1.5 segundos para mostrar o toast
            setTimeout(() => {
                router.push("/rh/funcionarios");
                router.refresh();
            }, 1000);

        } catch (error: any) {
            console.error("Submission error:", error);
            toast.error("Erro no Processamento", {
                description: error.message || "Não foi possível gravar os dados. Verifique a ligação."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (isDirty) {
            setShowCancelModal(true);
        } else {
            router.back();
        }
    };

    // Função para formatar valor monetário
    const formatCurrency = (value: number | undefined) => {
        if (value === undefined || isNaN(value)) return "0,00";
        return new Intl.NumberFormat('pt-AO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    // Obter valores atuais dos campos monetários
    const currentSalarioBase = watch("salario_base") || 0;
    const currentSubAlimentacao = watch("subsidio_alimentacao") || 0;
    const currentSubTransporte = watch("subsidio_transporte") || 0;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Form Header Action Bar */}
            <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        disabled={isSubmitting}
                    >
                        <ArrowLeft size={20} className="text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                            {initialData?.id ? 'Editar Ficha Cadastral' : 'Registo de Novo Colaborador'}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium">Formulário de Recrutamento e Admissão</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="h-11 px-6 text-sm font-medium border-[var(--border-color)] dark:border-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:text-rose-600 transition-all"
                    >
                        Descartar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="h-11 px-8 bg-[var(--accent-primary)] text-sm font-medium text-white gap-2 shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isSubmitting ? 'Guardando...' : (initialData?.id ? 'Atualizar Dados' : 'Efectuar Registo')}
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 size={32} className="animate-spin text-[var(--accent-primary)]" />
                        <p className="text-sm font-medium text-slate-500">A carregar dados do sistema...</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Tabs Navigation */}
                    <div className="flex gap-2 border-b border-slate-100 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={() => setActiveTab("dados")}
                            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'dados' ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            1. Dados Pessoais
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("vencimento")}
                            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'vencimento' ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            2. Vínculo e Salário
                        </button>
                        {initialData?.id && (
                            <button
                                type="button"
                                onClick={() => setActiveTab("historico")}
                                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'historico' ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                3. Histórico Contratual
                            </button>
                        )}
                        {initialData?.id && (
                            <button
                                type="button"
                                onClick={() => setActiveTab("pagamentos")}
                                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'pagamentos' ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                4. Histórico de Pagamentos
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setActiveTab("documentos")}
                            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'documentos' ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            {initialData?.id ? '5. Documentação' : '3. Documentação'}
                        </button>
                    </div>

                    {activeTab === "dados" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
                            {/* Dados Pessoais */}
                            <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6 relative">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <User size={120} />
                                </div>

                                <div className="flex items-center gap-2 border-b border-[var(--border-color)] dark:border-zinc-800 pb-2">
                                    <Fingerprint size={16} className="text-[var(--accent-primary)]" />
                                    <h2 className="text-sm font-semibold text-slate-500">Identificação e Biometria</h2>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                        Nome Completo do Candidato *
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors pointer-events-none" size={16} />
                                        <Input
                                            {...register("nome")}
                                            placeholder="Insira o nome conforme documento..."
                                            className={`pl-10 h-12 font-medium bg-slate-50 dark:bg-zinc-800/30 border ${errors.nome ? 'border-red-500 ring-red-500' : 'border-[var(--border-color)] dark:border-zinc-800 group-hover:border-[var(--accent-primary)]'}`}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    {errors.nome && (
                                        <p className="text-xs font-medium text-red-500">{errors.nome.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                            BI / Passaporte *
                                        </label>
                                        <Input
                                            {...register("bi_documento")}
                                            placeholder="Nº de Identificação"
                                            className={`h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border ${errors.bi_documento ? 'border-red-500' : 'border-[var(--border-color)] dark:border-zinc-800'}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.bi_documento && (
                                            <p className="text-xs font-medium text-red-500 mt-1">{errors.bi_documento.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                            NIF (Opcional)
                                        </label>
                                        <Input
                                            {...register("nif")}
                                            placeholder="Nº Fiscal"
                                            className={`h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border ${errors.nif ? 'border-red-500' : 'border-[var(--border-color)] dark:border-zinc-800'}`}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                            Email Profissional
                                        </label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors pointer-events-none" size={14} />
                                            <Input
                                                {...register("email")}
                                                type="email"
                                                placeholder="exemplo@empresa.com"
                                                className={`pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border ${errors.email ? 'border-red-500' : 'border-[var(--border-color)] dark:border-zinc-800'}`}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                            Telemóvel
                                        </label>
                                        <div className="relative group">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors pointer-events-none" size={14} />
                                            <Input
                                                {...register("telefone")}
                                                placeholder="+244 9..."
                                                className={`pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border ${errors.telefone ? 'border-red-500' : 'border-[var(--border-color)] dark:border-zinc-800'}`}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 border-b border-[var(--border-color)] dark:border-zinc-800 pb-2 pt-4">
                                    <Clock size={16} className="text-[var(--accent-primary)]" />
                                    <h2 className="text-sm font-semibold text-slate-500">Horário e Dias de Trabalho</h2>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                            Hora de Entrada *
                                        </label>
                                        <div className="relative group">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                            <Input
                                                {...register("hora_entrada")}
                                                type="time"
                                                className="pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border border-[var(--border-color)] dark:border-zinc-800"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                            Hora de Saída *
                                        </label>
                                        <div className="relative group">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                            <Input
                                                {...register("hora_saida")}
                                                type="time"
                                                className="pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border border-[var(--border-color)] dark:border-zinc-800"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                        Dias de Trabalho Previsíveis
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((dia) => (
                                            <label key={dia} className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-zinc-800/30 border border-slate-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    value={dia}
                                                    checked={watch("dias_trabalho")?.split(",").includes(dia)}
                                                    onChange={(e) => {
                                                        const current = watch("dias_trabalho") ? watch("dias_trabalho")!.split(",") : [];
                                                        let next;
                                                        if (e.target.checked) {
                                                            next = [...current, dia];
                                                        } else {
                                                            next = current.filter(d => d !== dia);
                                                        }
                                                        setValue("dias_trabalho", next.join(","), { shouldDirty: true });
                                                    }}
                                                    className="w-4 h-4 rounded border-slate-300 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                                                />
                                                <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase">{dia}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium italic">Selecione os dias em que o colaborador deve apresentar-se ao trabalho.</p>
                                </div>
                            </Card>
                        </div>
                    )
                    }

                    {
                        activeTab === "vencimento" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Dados Profissionais */}
                                    <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6 relative">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 font-black text-6xl">RH</div>

                                        <div className="flex items-center gap-2 border-b border-[var(--border-color)] dark:border-zinc-800 pb-2">
                                            <Briefcase size={16} className="text-[var(--accent-primary)]" />
                                            <h2 className="text-sm font-semibold text-slate-500">Vínculo e Enquadramento</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Controller
                                                    name="departamentoId"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            value={field.value || ""}
                                                            onChange={field.onChange}
                                                            options={departamentos.map(d => ({
                                                                value: d.id,
                                                                label: d.nome
                                                            }))}
                                                            label="Departamento"
                                                            placeholder="Selecione o departamento..."
                                                            error={errors.departamentoId?.message}
                                                            disabled={isSubmitting || isLoading}
                                                            loading={isLoading}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Controller
                                                    name="cargoId"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            value={field.value || ""}
                                                            onChange={field.onChange}
                                                            options={(filteredCargos || []).map((c: any) => ({
                                                                value: c.id,
                                                                label: c.nome
                                                            }))}
                                                            label="Cargo e Especialidade"
                                                            placeholder={!selectedDeptId ? "Escolha o depto. acima" : (filteredCargos.length === 0 ? "Nenhum cargo disponível" : "Escolha o cargo...")}
                                                            error={errors.cargoId?.message}
                                                            disabled={isSubmitting || isLoading || !selectedDeptId}
                                                            loading={isLoading}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                    Data Efetiva de Admissão *
                                                </label>
                                                <div className="relative group">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                                    <Input
                                                        {...register("data_admissao")}
                                                        type="date"
                                                        className={`pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border ${errors.data_admissao ? 'border-red-500' : 'border-[var(--border-color)] dark:border-zinc-800'}`}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                {errors.data_admissao && (
                                                    <p className="text-xs font-medium text-red-500 mt-1">{errors.data_admissao.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                    Vínculo Contratual *
                                                </label>
                                                <Controller
                                                    name="tipo_contrato"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            value={field.value || ""}
                                                            onChange={field.onChange}
                                                            options={[
                                                                { value: "DETERMINADO", label: "Determinado" },
                                                                { value: "INDETERMINADO", label: "Indeterminado" },
                                                                { value: "ESTAGIO", label: "Estágio" }
                                                            ]}
                                                            placeholder="Tipo de contrato..."
                                                            error={errors.tipo_contrato?.message}
                                                            disabled={isSubmitting}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            {watch("tipo_contrato") !== "INDETERMINADO" && (
                                                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                        Data de Término do Contrato
                                                    </label>
                                                    <div className="relative group">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                                        <Input
                                                            {...register("data_fim")}
                                                            type="date"
                                                            className={`pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border ${errors.data_fim ? 'border-red-500' : 'border-[var(--border-color)] dark:border-zinc-800'}`}
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 font-medium">Obrigatório para contratos com prazo definido.</p>
                                                </div>
                                            )}

                                            {watch("tipo_contrato") !== "INDETERMINADO" && (
                                                <div className="md:col-span-2 p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-lg flex items-center justify-between animate-in fade-in zoom-in-95 duration-500">
                                                    <div className="space-y-0.5">
                                                        <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Renovação Automática</p>
                                                        <p className="text-xs text-blue-600/70 dark:text-blue-400/60">O contrato será renovado por igual período no fim do prazo.</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            {...register("renovacao_automatica")}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                    Número de IBAN (Angola)
                                                </label>
                                                <div className="relative group">
                                                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors pointer-events-none" size={14} />
                                                    <Input
                                                        {...register("iban")}
                                                        placeholder="AO06.0000.0000.0000.0000.0"
                                                        className="pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border border-[var(--border-color)] dark:border-zinc-800"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                    Segurança Social (INSS)
                                                </label>
                                                <div className="relative group">
                                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                                    <Input
                                                        {...register("numero_inss")}
                                                        placeholder="Nº de Beneficiário"
                                                        className="pl-9 h-11 font-medium bg-slate-50 dark:bg-zinc-800/30 border border-[var(--border-color)] dark:border-zinc-800"
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Dados Salariais */}
                                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900/50 dark:to-zinc-800/10 shadow-sm space-y-6 relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <Wallet size={120} />
                                    </div>

                                    <div className="flex items-center gap-2 border-b border-[var(--border-color)] dark:border-zinc-800 pb-2">
                                        <Wallet size={16} className="text-[var(--success)]" />
                                        <h2 className="text-sm font-semibold text-slate-500">Grelha Salarial e Compensatória</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                        <div className="space-y-2 lg:col-span-1">
                                            <div className="flex justify-between items-end">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                    Salário Base *
                                                </label>
                                            </div>
                                            <div className="relative group">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600">Kz</span>
                                                <Input
                                                    {...register("salario_base", {
                                                        valueAsNumber: true,
                                                        setValueAs: (value) => Number(value)
                                                    })}
                                                    type="number"
                                                    step="0.01"
                                                    min="32120"
                                                    className={`pl-10 h-11 font-semibold bg-white dark:bg-zinc-900/50 border ${errors.salario_base ? 'border-red-500' : 'border-[var(--border-color)] dark:border-zinc-800'}`}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                Subs. Alimentação
                                            </label>
                                            <div className="relative group">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">Kz</span>
                                                <Input
                                                    {...register("subsidio_alimentacao", {
                                                        valueAsNumber: true,
                                                        setValueAs: (value) => Number(value)
                                                    })}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    className="pl-10 h-11 font-medium bg-white dark:bg-zinc-900/50 border border-[var(--border-color)] dark:border-zinc-800"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                Subs. Transporte
                                            </label>
                                            <div className="relative group">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">Kz</span>
                                                <Input
                                                    {...register("subsidio_transporte", {
                                                        valueAsNumber: true,
                                                        setValueAs: (value) => Number(value)
                                                    })}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    className="pl-10 h-11 font-medium bg-white dark:bg-zinc-900/50 border border-[var(--border-color)] dark:border-zinc-800"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                Subs. Residência
                                            </label>
                                            <div className="relative group">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">Kz</span>
                                                <Input
                                                    {...register("subsidio_residencia", {
                                                        valueAsNumber: true,
                                                        setValueAs: (value) => Number(value)
                                                    })}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    className="pl-10 h-11 font-medium bg-white dark:bg-zinc-900/50 border border-[var(--border-color)] dark:border-zinc-800"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                                Outros Subsídios
                                            </label>
                                            <div className="relative group">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">Kz</span>
                                                <Input
                                                    {...register("outros_subsidios", {
                                                        valueAsNumber: true,
                                                        setValueAs: (value) => Number(value)
                                                    })}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    className="pl-10 h-11 font-medium bg-white dark:bg-zinc-900/50 border border-[var(--border-color)] dark:border-zinc-800"
                                                    disabled={isSubmitting}
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
                                                <p className="text-xs font-semibold text-blue-600">Nota Fiscal</p>
                                                <p className="text-xs font-medium text-blue-500/80 leading-tight">
                                                    Os descontos de IRT (Grupo A) e INSS (3%) são calculados automaticamente no processamento mensal.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    }

                    {
                        activeTab === "historico" && initialData?.id && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6">
                                    <div className="flex items-center gap-2 border-b border-[var(--border-color)] dark:border-zinc-800 pb-2">
                                        <FileText size={16} className="text-[var(--accent-primary)]" />
                                        <h2 className="text-sm font-semibold text-slate-500">Histórico de Vínculos Contratuais</h2>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-100 dark:border-zinc-800">
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Tipo</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Início</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Término</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Salário Base</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(initialData as any).historico_contratos?.map((c: any) => (
                                                    <tr key={c.id} className="border-b border-slate-50 dark:border-zinc-800/50 group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                                        <td className="py-4 px-2">
                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${c.tipo === 'INDETERMINADO' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                                                                c.tipo === 'DETERMINADO' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                                                                    'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                                                                }`}>
                                                                {c.tipo}
                                                            </span>
                                                            {c.renovacao_automatica && (
                                                                <span className="ml-2 text-[10px] text-emerald-600" title="Renovação Automática">↻</span>
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-medium text-slate-600 dark:text-zinc-400">
                                                            {new Date(c.data_inicio).toLocaleDateString()}
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-medium text-slate-500 dark:text-zinc-500">
                                                            {c.data_fim ? new Date(c.data_fim).toLocaleDateString() : "---"}
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-bold text-[var(--success)]">
                                                            {formatCurrency(Number(c.salario_base))} Kz
                                                        </td>
                                                        <td className="py-4 px-2 text-center">
                                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${c.status === 'VIGENTE' ? 'bg-emerald-500 text-white shadow-sm' :
                                                                c.status === 'CADUCADO' ? 'bg-rose-100 text-rose-600' :
                                                                    c.status === 'RENOVADO' ? 'bg-blue-100 text-blue-600' :
                                                                        'bg-slate-100 text-slate-500'
                                                                }`}>
                                                                {c.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {(!(initialData as any).historico_contratos || (initialData as any).historico_contratos.length === 0) && (
                                                    <tr>
                                                        <td colSpan={5} className="py-12 text-center text-xs text-slate-400 italic font-medium">
                                                            Nenhum registo histórico encontrado.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </div>
                        )
                    }

                    {
                        activeTab === "pagamentos" && initialData?.id && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-6">
                                    <div className="flex items-center gap-2 border-b border-[var(--border-color)] dark:border-zinc-800 pb-2">
                                        <Wallet size={16} className="text-[var(--success)]" />
                                        <h2 className="text-sm font-semibold text-slate-500">Histórico de Processamentos Salariais</h2>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-100 dark:border-zinc-800">
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Mês/Ano</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Salário Base</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Imp. (IRT)</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">SS (INSS)</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Líquido</th>
                                                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(initialData as any).historico_pagamentos?.map((p: any) => (
                                                    <tr key={p.id} className="border-b border-slate-50 dark:border-zinc-800/50 group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                                                        <td className="py-4 px-2 font-bold text-xs text-slate-700 dark:text-zinc-300">
                                                            {String(p.mes).padStart(2, '0')}/{p.ano}
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-medium text-slate-500">
                                                            {formatCurrency(Number(p.salario_base))} Kz
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-semibold text-rose-500">
                                                            -{formatCurrency(Number(p.irt_devido))}
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-semibold text-amber-600">
                                                            -{formatCurrency(Number(p.inss_trabalhador))}
                                                        </td>
                                                        <td className="py-4 px-2 text-xs font-black text-emerald-600 dark:text-emerald-500">
                                                            {formatCurrency(Number(p.liquido_receber))} Kz
                                                        </td>
                                                        <td className="py-4 px-2 text-center">
                                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${p.status === 'PAGO' ? 'bg-emerald-500 text-white shadow-sm' :
                                                                p.status === 'PROCESSADO' ? 'bg-blue-500 text-white' :
                                                                    'bg-slate-100 text-slate-500'
                                                                }`}>
                                                                {p.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {(!(initialData as any).historico_pagamentos || (initialData as any).historico_pagamentos.length === 0) && (
                                                    <tr>
                                                        <td colSpan={6} className="py-12 text-center text-xs text-slate-400 italic font-medium">
                                                            Nenhum registo de pagamento processado.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </div>
                        )
                    }
                    {
                        activeTab === "documentos" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                {/* Seção de Upload Centralizada */}
                                <Card className="p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] -rotate-12">
                                        <Upload size={180} />
                                    </div>

                                    <div className="max-w-xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                                                <Upload size={20} />
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Anexar Documentação</h2>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selecione o tipo e carregue os ficheiros</p>
                                            </div>
                                        </div>

                                        <DocumentUpload
                                            entityId={initialData?.id}
                                            entityType="rh/funcionarios"
                                            onFileSelect={(file, tipo) => {
                                                setStagedFiles(prev => [...prev, { file, tipo, tempId: Math.random().toString(36).substring(7) }])
                                            }}
                                        />
                                    </div>
                                </Card>

                                {/* Listagem Consolidada */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-3">
                                            <FileCheck size={18} className="text-emerald-500" />
                                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.15em]">Arquivos Vinculados à Ficha</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] bg-emerald-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm">{employeeDocs.length} Salvos</span>
                                            {stagedFiles.length > 0 && (
                                                <span className="text-[10px] bg-amber-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm animate-pulse">{stagedFiles.length} Pendentes</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Arquivos Pendentes (Staged) */}
                                        {stagedFiles.map((staged) => (
                                            <div key={staged.tempId} className="p-5 border-2 border-dashed border-amber-200 dark:border-amber-900/30 rounded-3xl flex items-center gap-4 bg-amber-50/30 dark:bg-amber-900/10 group animate-in zoom-in-95 duration-300">
                                                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 shadow-inner">
                                                    <Upload size={28} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-black text-amber-700 dark:text-amber-400 truncate uppercase tracking-tighter">{staged.file.name}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] font-black bg-amber-600 text-white px-1.5 py-0.5 rounded uppercase">{staged.tipo}</span>
                                                        <span className="text-[8px] font-bold text-amber-500 uppercase tracking-tighter">Pendente</span>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setStagedFiles(prev => prev.filter(f => f.tempId !== staged.tempId))}
                                                    className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Arquivos Salvos */}
                                        {employeeDocs.map((doc) => (
                                            <div key={doc.id} className="p-5 border border-slate-200 dark:border-zinc-800 rounded-3xl flex items-center gap-4 bg-white dark:bg-zinc-900/40 hover:border-blue-500/30 transition-all shadow-sm group">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-blue-500 border border-slate-100 dark:border-zinc-700 shadow-sm">
                                                    <FileCheck size={28} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-black text-slate-800 dark:text-zinc-200 truncate uppercase tracking-tighter">{doc.nome}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] font-black bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded border border-blue-500/20 uppercase">{doc.tipo}</span>
                                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(doc.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <a
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                                                >
                                                    <Upload size={18} className="rotate-180" />
                                                </a>
                                            </div>
                                        ))}

                                        {employeeDocs.length === 0 && stagedFiles.length === 0 && (
                                            <div className="col-span-full py-20 text-center border-3 border-dashed border-slate-100 dark:border-zinc-800 rounded-[40px] bg-slate-50/30 dark:bg-zinc-900/20">
                                                <div className="mb-4 text-slate-300 dark:text-zinc-700 flex justify-center">
                                                    <FileCheck size={64} strokeWidth={1} />
                                                </div>
                                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Nenhum documento arquivado</h3>
                                                <p className="text-[10px] font-bold text-slate-400/60 uppercase mt-2 italic">A ficha digital está vazia no momento</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div >
            )}

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
        </form >
    );
}