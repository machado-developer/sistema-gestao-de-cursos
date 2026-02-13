'use client'

import { ChevronDown, ChevronRight } from "lucide-react";

interface ModulePermission {
    moduleId: string;
    moduleName: string;
    canRead: boolean;
    canWrite: boolean;
}

interface ItemPermission {
    moduleItemId: string;
    moduleItemName: string;
    moduleId: string;
    canRead: boolean;
    canWrite: boolean;
}

interface Module {
    id: string;
    name: string;
    items: { id: string; name: string }[];
}

interface ModuleItemPermissionSelectorProps {
    modules: Module[];
    permissions: ModulePermission[];
    itemPermissions: ItemPermission[];
    togglePermission: (moduleId: string, field: 'canRead' | 'canWrite') => void;
    toggleItemPermission: (moduleItemId: string, field: 'canRead' | 'canWrite') => void;
    expandedModules: string[];
    toggleModuleExpansion: (moduleId: string) => void;
    isDark?: boolean;
}

export function ModuleItemPermissionSelector({
    modules,
    permissions,
    itemPermissions,
    togglePermission,
    toggleItemPermission,
    expandedModules,
    toggleModuleExpansion,
    isDark = true
}: ModuleItemPermissionSelectorProps) {
    const cardBgClass = isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-200';
    const cardActiveBgClass = isDark ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50/50 border-blue-200';
    const textColorClass = isDark ? 'text-zinc-300 hover:text-white' : 'text-gray-700 hover:text-blue-600';
    const subTextColorClass = isDark ? 'text-zinc-400' : 'text-gray-500';
    const checkboxClass = isDark ? 'border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-offset-zinc-900' : 'border-gray-300 text-blue-600';
    const dividerClass = isDark ? 'border-zinc-800' : 'border-gray-100';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {modules.map(mod => {
                const perm = permissions.find(p => p.moduleId === mod.id);
                const isExpanded = expandedModules.includes(mod.id);
                const modItems = itemPermissions.filter(ip => ip.moduleId === mod.id);

                return (
                    <div key={mod.id} className="flex flex-col gap-2">
                        <div className={`p-4 rounded-xl border transition-all duration-300 ${perm?.canRead ? cardActiveBgClass : cardBgClass}`}>
                            <div className="flex justify-between items-center mb-3">
                                <div
                                    className={`text-[10px] font-black truncate px-1 uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors ${textColorClass}`}
                                    onClick={() => toggleModuleExpansion(mod.id)}
                                >
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    {mod.name}
                                </div>
                                <div className="flex gap-4">
                                    <label className={`flex items-center gap-2.5 text-[10px] cursor-pointer group transition-colors ${subTextColorClass} hover:text-blue-500`}>
                                        <input
                                            type="checkbox"
                                            checked={perm?.canRead || false}
                                            onChange={() => togglePermission(mod.id, 'canRead')}
                                            className={`h-3.5 w-3.5 rounded focus:ring-blue-500 ${checkboxClass}`}
                                        />
                                        Módulo
                                    </label>
                                </div>
                            </div>

                            {isExpanded && modItems.length > 0 && (
                                <div className={`mt-4 pt-4 border-t ${dividerClass} space-y-3 animate-in fade-in slide-in-from-top-2 duration-300`}>
                                    {modItems.map(item => (
                                        <div key={item.moduleItemId} className="flex justify-between items-center pl-2">
                                            <span className={`text-[10px] font-medium ${subTextColorClass}`}>{item.moduleItemName}</span>
                                            <div className="flex gap-4">
                                                <label className={`flex items-center gap-2.5 text-[9px] cursor-pointer group transition-colors ${subTextColorClass} hover:text-blue-500`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.canRead}
                                                        onChange={() => toggleItemPermission(item.moduleItemId, 'canRead')}
                                                        className={`h-3 w-3 rounded ${checkboxClass}`}
                                                    />
                                                    Ler
                                                </label>
                                                <label className={`flex items-center gap-2.5 text-[9px] cursor-pointer group transition-colors ${subTextColorClass} hover:text-blue-500`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.canWrite}
                                                        onChange={() => toggleItemPermission(item.moduleItemId, 'canWrite')}
                                                        className={`h-3 w-3 rounded ${checkboxClass}`}
                                                    />
                                                    Escrita
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
