"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { toast } from "sonner";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";

interface VacationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    funcionarios: any[];
}

export function VacationModal({ isOpen, onClose, onSuccess, funcionarios }: VacationModalProps) {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        funcionarioId: "",
        data_inicio: "",
        data_fim: "",
        tipo: "GOZO_FERIAS",
        observacao: ""
    });

    const leaveTypes = [
        { value: "GOZO_FERIAS", label: "Férias (Gozo Anual)" },
        { value: "LICENCA_M", label: "Licença de Maternidade" },
        { value: "LICENCA_P", label: "Licença de Paternidade" },
        { value: "DOENCA", label: "Baixa Médica (Doença)" },
        { value: "OUTRO", label: "Outras Ausências Justificadas" }
    ];

    const filteredFuncionarios = funcionarios.filter(f =>
        f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.bi_documento?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.funcionarioId || !formData.data_inicio || !formData.data_fim) {
            return toast.error("Por favor, preencha todos os campos obrigatórios");
        }

        // Calcular dias úteis (aproximação simples para agora)
        const start = new Date(formData.data_inicio);
        const end = new Date(formData.data_fim);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        setLoading(true);
        try {
            const res = await fetch("/api/rh/ferias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    dias_uteis: diffDays // No backend real idealmente calcularíamos feriados/fds
                })
            });

            if (!res.ok) throw new Error("Erro ao criar solicitação");

            toast.success("Solicitação enviada com sucesso");
            onSuccess();
            onClose();
            setFormData({
                funcionarioId: "",
                data_inicio: "",
                data_fim: "",
                tipo: "GOZO_FERIAS",
                observacao: ""
            });
        } catch (error) {
            toast.error("Erro ao processar pedido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Nova Solicitação de Ausência">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Pesquisar Colaborador (Nome ou BI)</label>
                    <Input
                        placeholder="Digite para filtrar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-blue-50/50 border-blue-100 focus:border-blue-500"
                    />
                </div>

                <Select
                    label="Colaborador"
                    value={formData.funcionarioId}
                    onChange={(val) => setFormData({ ...formData, funcionarioId: val })}
                    options={filteredFuncionarios.map(f => ({ value: f.id, label: `${f.nome} (${f.bi_documento})` }))}
                    placeholder={searchTerm ? `Encontrados: ${filteredFuncionarios.length}` : "Selecione o colaborador..."}
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Data de Início</label>
                        <Input
                            type="date"
                            value={formData.data_inicio}
                            onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Data de Fim</label>
                        <Input
                            type="date"
                            value={formData.data_fim}
                            onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <Select
                    label="Tipo de Licença"
                    value={formData.tipo}
                    onChange={(val) => setFormData({ ...formData, tipo: val })}
                    options={leaveTypes}
                />

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Observações / Justificativo</label>
                    <textarea
                        className="w-full min-h-[100px] p-3 text-sm rounded-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.observacao}
                        onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                        placeholder="Detalhes adicionais..."
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-blue-600 text-white">
                        {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <CalendarIcon className="mr-2" size={16} />}
                        Confirmar Pedido
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
