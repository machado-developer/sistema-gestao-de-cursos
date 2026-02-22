"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, Send, Loader2, AlertCircle } from "lucide-react";

interface Recipient {
    folhaId: string;
    nome: string;
    email: string;
}

interface EmailRecipientsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (recipients: { folhaId: string, email: string }[]) => Promise<void>;
    initialRecipients: Recipient[];
}

export function EmailRecipientsModal({ isOpen, onClose, onConfirm, initialRecipients }: EmailRecipientsModalProps) {
    const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients);
    const [submitting, setSubmitting] = useState(false);

    const handleEmailChange = (id: string, newEmail: string) => {
        setRecipients(prev => prev.map(r => r.folhaId === id ? { ...r, email: newEmail } : r));
    };

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            await onConfirm(recipients.map(r => ({ folhaId: r.folhaId, email: r.email })));
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirmar Envio de Comprovativos"
            className="sm:max-w-2xl"
        >
            <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1 py-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-md mb-4">
                    <div className="flex gap-2 items-start">
                        <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0" size={16} />
                        <p className="text-[10px] text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                            Verifique e edite os endereços de e-mail abaixo se necessário. Apenas funcionários com e-mail preenchido receberão o comprovativo.
                        </p>
                    </div>
                </div>

                {recipients.map((recipient) => (
                    <div key={recipient.folhaId} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-md bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-2 min-w-[200px]">
                            <div className="w-8 h-8 rounded bg-white dark:bg-zinc-700 flex items-center justify-center border">
                                <User size={14} className="text-slate-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-300 truncate">
                                {recipient.nome}
                            </span>
                        </div>

                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                            <input
                                type="email"
                                value={recipient.email}
                                onChange={(e) => handleEmailChange(recipient.folhaId, e.target.value)}
                                placeholder="E-mail do colaborador..."
                                className="w-full pl-8 pr-3 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}

                {recipients.length === 0 && (
                    <div className="py-12 text-center text-slate-400">
                        <p className="text-[10px] font-black uppercase tracking-widest">Nenhum funcionário selecionado</p>
                    </div>
                )}
            </div>

            <div className="pt-6 flex justify-end gap-2 border-t mt-4">
                <Button variant="ghost" className="text-[10px] uppercase font-black" onClick={onClose} disabled={submitting}>
                    Cancelar
                </Button>
                <Button
                    className="bg-blue-600 text-white gap-2 text-[10px] uppercase font-black"
                    onClick={handleConfirm}
                    disabled={submitting || recipients.length === 0}
                >
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    {submitting ? "AGENDANDO..." : "CONFIRMAR E ENVIAR"}
                </Button>
            </div>
        </Modal>
    );
}
