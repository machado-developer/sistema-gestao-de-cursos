"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type InternetStatus = "online" | "offline";
export type ServerStatus = "ok" | "slow" | "down" | "checking";
export type DatabaseStatus = "ok" | "down" | "checking";

interface ConnectivityState {
    internet: InternetStatus;
    server: ServerStatus;
    database: DatabaseStatus;
    latency: number;
    lastChecked: Date | null;
}

interface ConnectivityContextType extends ConnectivityState {
    checkHealth: () => Promise<void>;
}

const ConnectivityContext = createContext<ConnectivityContextType | undefined>(undefined);

export const ConnectivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ConnectivityState>({
        internet: typeof window !== "undefined" ? (window.navigator.onLine ? "online" : "offline") : "online",
        server: "checking",
        database: "checking",
        latency: 0,
        lastChecked: null,
    });

    const checkHealth = useCallback(async () => {
        if (!window.navigator.onLine) {
            setState(prev => ({
                ...prev,
                internet: "offline",
                server: "down",
                database: "down",
                lastChecked: new Date()
            }));
            return;
        }

        try {
            const start = Date.now();
            const response = await fetch("/api/health", {
                cache: "no-store",
                signal: AbortSignal.timeout(5000) // 5s timeout
            });
            const data = await response.json();
            const end = Date.now();

            setState({
                internet: "online",
                server: data.server || "ok",
                database: data.database || "ok",
                latency: end - start,
                lastChecked: new Date(),
            });

            // Log if status changed significantly or failure detected
            if (data.database !== "ok" || data.server === "down") {
                console.warn(`[ConnectivityMonitor] Issue detected: Server: ${data.server}, DB: ${data.database}`);
            }

        } catch (error) {
            console.error("[ConnectivityMonitor] Failed to fetch health status:", error);
            setState(prev => ({
                ...prev,
                internet: window.navigator.onLine ? "online" : "offline",
                server: "down",
                database: "down",
                latency: -1,
                lastChecked: new Date(),
            }));
        }
    }, []);

    useEffect(() => {
        const handleOnline = () => {
            setState(prev => ({ ...prev, internet: "online" }));
            checkHealth();
        };
        const handleOffline = () => {
            setState(prev => ({ ...prev, internet: "offline", server: "down", database: "down" }));
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Initial check
        checkHealth();

        // Periodic polling every 30 seconds
        const interval = setInterval(checkHealth, 30000);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            clearInterval(interval);
        };
    }, [checkHealth]);

    return (
        <ConnectivityContext.Provider value={{ ...state, checkHealth }}>
            {children}
        </ConnectivityContext.Provider>
    );
};

export const useConnectivity = () => {
    const context = useContext(ConnectivityContext);
    if (!context) {
        throw new Error("useConnectivity must be used within a ConnectivityProvider");
    }
    return context;
};
