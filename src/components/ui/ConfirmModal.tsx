"use client";

import { AlertTriangle, Info, CheckCircle2, X } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: "danger" | "warning" | "info" | "success";
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

export function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    type = "warning",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    isLoading = false
}: ConfirmModalProps) {
    if (!isOpen) return null;

    const icons = {
        danger: <X className="text-rose-600" size={24} />,
        warning: <AlertTriangle className="text-amber-500" size={24} />,
        info: <Info className="text-blue-500" size={24} />,
        success: <CheckCircle2 className="text-emerald-500" size={24} />,
    };

    const colors = {
        danger: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800/20",
        warning: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/20",
        info: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/20",
        success: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/20",
    };

    const btnVariants = {
        danger: "bg-rose-600 hover:bg-rose-700 border-rose-800",
        warning: "bg-amber-500 hover:bg-amber-600 border-amber-800",
        info: "bg-blue-600 hover:bg-blue-700 border-blue-800",
        success: "bg-emerald-600 hover:bg-emerald-700 border-emerald-800",
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <Card className="w-full max-w-md p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full border-2 ${colors[type]}`}>
                        {icons[type]}
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{title}</h2>
                        <p className="text-xs font-medium text-slate-400 dark:text-zinc-500 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    <div className="flex gap-3 w-full pt-4">
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 text-[10px] font-black uppercase tracking-widest h-11 border-slate-200 dark:border-zinc-800"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 text-[10px] font-black uppercase tracking-widest h-11 border-b-4 text-white ${btnVariants[type]}`}
                        >
                            {isLoading ? "PROCESSANDO..." : confirmText.toUpperCase()}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
