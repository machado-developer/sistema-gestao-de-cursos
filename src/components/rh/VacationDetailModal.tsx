"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import {
    Calendar,
    User,
    Clock,
    FileText,
    ShieldCheck,
    AlertCircle,
    Building2,
    Briefcase,
    Printer
} from "lucide-react";

interface VacationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    vacation: any;
}

export function VacationDetailModal({ isOpen, onClose, vacation }: VacationDetailModalProps) {
    if (!vacation) return null;

    const { funcionario, data_inicio, data_fim, dias_uteis, tipo, status, observacao, createdAt } = vacation;

    const statusColors: any = {
        PENDENTE: "bg-amber-500",
        APROVADO: "bg-emerald-500",
        REPROVADO: "bg-rose-500",
        CONCLUIDO: "bg-blue-500"
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Solicitação">
            <div className="space-y-6">
                {/* Header Info */}
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                        <User size={24} />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-800 dark:text-zinc-200 uppercase tracking-tight text-sm">{funcionario.nome}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BI: {funcionario.bi_documento}</p>
                    </div>
                    <div className="ml-auto text-right">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-tighter ${statusColors[status] || "bg-slate-400"}`}>
                            {status === "PENDENTE" ? <Clock size={10} /> : status === "APROVADO" ? <ShieldCheck size={10} /> : <AlertCircle size={10} />}
                            {status}
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 bg-slate-50/50 dark:bg-zinc-900/30 p-3 rounded-xl border border-slate-100/50 dark:border-zinc-800/50">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Building2 size={8} /> Departamento
                        </p>
                        <p className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 uppercase">{funcionario.departamento?.nome || "GERAL"}</p>
                    </div>
                    <div className="space-y-1 bg-slate-50/50 dark:bg-zinc-900/30 p-3 rounded-xl border border-slate-100/50 dark:border-zinc-800/50">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Briefcase size={8} /> Cargo
                        </p>
                        <p className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 uppercase">{funcionario.cargo?.nome || "OPERACIONAL"}</p>
                    </div>
                </div>

                {/* Period Info */}
                <div className="p-4 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20 space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-blue-500" />
                            <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-tight">Período de Ausência</span>
                        </div>
                        <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                            {dias_uteis} Dias
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-8 relative">
                        <div className="text-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Início</p>
                            <p className="text-sm font-black text-slate-800 dark:text-zinc-200">{new Date(data_inicio).toLocaleDateString()}</p>
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-500">
                            ▸
                        </div>
                        <div className="text-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Término</p>
                            <p className="text-sm font-black text-slate-800 dark:text-zinc-200">{new Date(data_fim).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-blue-100/50 dark:border-blue-900/20 flex justify-between">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase">Tipo: <span className="text-blue-600 dark:text-blue-400">{tipo}</span></span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Solicitado em: {new Date(createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Observations */}
                {observacao && (
                    <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <FileText size={10} /> Observações / Justificativo
                        </p>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 italic text-xs text-slate-600 dark:text-zinc-400">
                            "{observacao}"
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                    <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2 text-[10px] font-black uppercase">
                        <Printer size={14} /> Imprimir Comprovativo
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onClose} className="text-[10px] font-black uppercase">
                        Fechar
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
