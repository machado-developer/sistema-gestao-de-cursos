"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FuncionarioForm from "@/components/rh/FuncionarioForm";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EditFuncionarioPage() {
    const params = useParams();
    const router = useRouter();
    const [funcionario, setFuncionario] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                const res = await fetch(`/api/rh/funcionarios/${params.id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Colaborador não encontrado");
                }

                setFuncionario(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchFuncionario();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-[var(--accent-primary)]" />
                <p className="text-sm font-medium text-slate-500">A carregar ficha do colaborador...</p>
            </div>
        );
    }

    if (error || !funcionario) {
        return (
            <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Erro Crítico</h2>
                    <p className="text-slate-500">{error || "Não foi possível carregar os dados."}</p>
                </div>
                <Button onClick={() => router.back()} variant="outline" className="gap-2">
                    <ArrowLeft size={16} /> Voltar para a lista
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <FuncionarioForm initialData={funcionario} />
        </div>
    );
}
