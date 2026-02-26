"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useConnectivity } from "@/providers/ConnectivityProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, Server, Database, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

export const SystemStatusBanner: React.FC = () => {
    const { internet, server, database, checkHealth, lastChecked } = useConnectivity();
    const [showResolved, setShowResolved] = useState(false);
    const [prevStatus, setPrevStatus] = useState({ internet, server, database });

    // Track when status is restored
    useEffect(() => {
        const wasDown =
            prevStatus.internet === "offline" ||
            prevStatus.server === "down" ||
            prevStatus.database === "down";

        const isUp =
            internet === "online" &&
            server === "ok" &&
            database === "ok";

        if (wasDown && isUp) {
            setShowResolved(true);
            const timer = setTimeout(() => setShowResolved(false), 5000);
            return () => clearTimeout(timer);
        }

        // Only update if something changed to avoid infinite loop
        if (
            prevStatus.internet !== internet ||
            prevStatus.server !== server ||
            prevStatus.database !== database
        ) {
            setPrevStatus({ internet, server, database });
        }
    }, [internet, server, database, prevStatus]);

    const statusConfig = useMemo(() => {
        if (internet === "offline") {
            return {
                type: "error",
                icon: <WifiOff className="w-4 h-4" />,
                title: "Sem conexão com a internet",
                description: "Verifique o seu cabo ou rede Wi-Fi.",
                color: "bg-rose-600",
            };
        }

        if (server === "down") {
            return {
                type: "error",
                icon: <Server className="w-4 h-4" />,
                title: "Servidor Indisponível",
                description: "Não foi possível contactar o servidor central da NewTech.",
                color: "bg-rose-600",
            };
        }

        if (database === "down") {
            return {
                type: "error",
                icon: <Database className="w-4 h-4" />,
                title: "Falha na Base de Dados",
                description: "O sistema não consegue ler ou gravar dados no momento.",
                color: "bg-rose-600",
            };
        }

        if (server === "slow") {
            return {
                type: "warning",
                icon: <AlertTriangle className="w-4 h-4" />,
                title: "Conexão Lenta",
                description: "O sistema está a demorar mais do que o habitual a responder.",
                color: "bg-amber-500",
            };
        }

        if (showResolved) {
            return {
                type: "success",
                icon: <CheckCircle className="w-4 h-4" />,
                title: "Conexão Restabelecida",
                description: "O sistema já está operacional e sincronizado.",
                color: "bg-emerald-600",
            };
        }

        return null;
    }, [internet, server, database, showResolved]);

    if (!statusConfig) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className={`fixed top-0 left-0 right-0 z-[9999] ${statusConfig.color} text-white shadow-lg overflow-hidden`}
            >
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            {statusConfig.icon}
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest">{statusConfig.title}</p>
                            <p className="text-[10px] font-medium opacity-90 uppercase italic tracking-wider">{statusConfig.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => checkHealth()}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-[10px] font-black uppercase tracking-tighter"
                        >
                            <RefreshCw className="w-3 h-3" />
                            <span>Tentar Novamente</span>
                        </button>

                        {lastChecked && (
                            <span className="hidden sm:block text-[9px] font-bold opacity-70 uppercase tracking-widest">
                                Última verificação: {lastChecked.toLocaleTimeString()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Progress bar for "slow" or "checking" states could go here */}
                {statusConfig.type === "error" && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="h-1 bg-white/30 origin-left"
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
};
