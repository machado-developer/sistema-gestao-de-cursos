"use client";

import { useEffect, useState } from "react";
import { Paystub } from "@/components/rh/Paystub";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ReciboDetallePage({ params }: { params: { id: string } }) {
    const [folha, setFolha] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFolha = async () => {
            try {
                const res = await fetch(`/api/rh/processamento/${params.id}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setFolha(data);

                // Trigger print if requested
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('print') === 'true') {
                    setTimeout(() => window.print(), 1000);
                }
            } catch (error) {
                toast.error("Erro ao carregar recibo");
            } finally {
                setLoading(false);
            }
        };
        fetchFolha();
    }, [params.id]);

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preparando Recibo...</p>
            </div>
        );
    }

    if (!folha) return null;

    return (
        <div className="p-1 space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center gap-4 print:hidden">
                <Link href="/rh/processamento">
                    <Button variant="ghost" size="sm" className="gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <ChevronLeft size={16} /> Voltar ao Processamento
                    </Button>
                </Link>
            </div>

            <Paystub data={folha} />
        </div>
    );
}
