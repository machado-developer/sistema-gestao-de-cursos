'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Palette, Save, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface ColorScheme {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
}

export default function AparenciaPage() {
    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)

    const [darkColors, setDarkColors] = useState<ColorScheme>({
        primary: '#3B82F6',
        secondary: '#2563EB',
        accent: '#60A5FA',
        background: '#09090B',
        surface: '#18181B'
    })

    const [lightColors, setLightColors] = useState<ColorScheme>({
        primary: '#2563EB',
        secondary: '#1D4ED8',
        accent: '#3B82F6',
        background: '#FFFFFF',
        surface: '#F9FAFB'
    })

    const handleSave = async () => {
        setLoading(true)
        // TODO: Implement save to localStorage or backend
        setTimeout(() => {
            setLoading(false)
            alert(t('settings.appearance.saved'))
        }, 1000)
    }

    const handleReset = () => {
        setDarkColors({
            primary: '#3B82F6',
            secondary: '#2563EB',
            accent: '#60A5FA',
            background: '#09090B',
            surface: '#18181B'
        })
        setLightColors({
            primary: '#2563EB',
            secondary: '#1D4ED8',
            accent: '#3B82F6',
            background: '#FFFFFF',
            surface: '#F9FAFB'
        })
    }

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t('settings.appearance.title')}</h1>
                <p className="text-zinc-400">{t('settings.appearance.subtitle')}</p>
            </div>

            <div className="space-y-8">
                {/* Dark Mode Colors */}
                <div className="glass-card p-6 space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Palette size={20} className="text-blue-400" />
                        {t('settings.appearance.dark_mode')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.primary_color')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={darkColors.primary}
                                    onChange={(e) => setDarkColors({ ...darkColors, primary: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={darkColors.primary}
                                        onChange={(e) => setDarkColors({ ...darkColors, primary: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.secondary_color')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={darkColors.secondary}
                                    onChange={(e) => setDarkColors({ ...darkColors, secondary: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={darkColors.secondary}
                                        onChange={(e) => setDarkColors({ ...darkColors, secondary: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.accent_color')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={darkColors.accent}
                                    onChange={(e) => setDarkColors({ ...darkColors, accent: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={darkColors.accent}
                                        onChange={(e) => setDarkColors({ ...darkColors, accent: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.background')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={darkColors.background}
                                    onChange={(e) => setDarkColors({ ...darkColors, background: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={darkColors.background}
                                        onChange={(e) => setDarkColors({ ...darkColors, background: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.surface')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={darkColors.surface}
                                    onChange={(e) => setDarkColors({ ...darkColors, surface: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={darkColors.surface}
                                        onChange={(e) => setDarkColors({ ...darkColors, surface: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dark Mode Preview */}
                    <div className="pt-4 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-zinc-400 mb-3">{t('settings.appearance.preview')}</h3>
                        <div
                            className="p-6 border border-white/20"
                            style={{ backgroundColor: darkColors.background }}
                        >
                            <div
                                className="p-4 mb-4"
                                style={{ backgroundColor: darkColors.surface }}
                            >
                                <h4 className="text-lg font-bold text-white mb-2">Preview Card</h4>
                                <p className="text-zinc-400 text-sm">This is how your dark mode will look</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 text-white font-semibold"
                                    style={{ backgroundColor: darkColors.primary }}
                                >
                                    Primary Button
                                </button>
                                <button
                                    className="px-4 py-2 text-white font-semibold"
                                    style={{ backgroundColor: darkColors.secondary }}
                                >
                                    Secondary Button
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Light Mode Colors */}
                <div className="glass-card p-6 space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Palette size={20} className="text-blue-400" />
                        {t('settings.appearance.light_mode')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.primary_color')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={lightColors.primary}
                                    onChange={(e) => setLightColors({ ...lightColors, primary: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={lightColors.primary}
                                        onChange={(e) => setLightColors({ ...lightColors, primary: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.secondary_color')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={lightColors.secondary}
                                    onChange={(e) => setLightColors({ ...lightColors, secondary: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={lightColors.secondary}
                                        onChange={(e) => setLightColors({ ...lightColors, secondary: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.accent_color')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={lightColors.accent}
                                    onChange={(e) => setLightColors({ ...lightColors, accent: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={lightColors.accent}
                                        onChange={(e) => setLightColors({ ...lightColors, accent: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.background')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={lightColors.background}
                                    onChange={(e) => setLightColors({ ...lightColors, background: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={lightColors.background}
                                        onChange={(e) => setLightColors({ ...lightColors, background: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                {t('settings.appearance.surface')}
                            </label>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="color"
                                    value={lightColors.surface}
                                    onChange={(e) => setLightColors({ ...lightColors, surface: e.target.value })}
                                    className="w-16 h-16 border-2 border-white/20 cursor-pointer"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={lightColors.surface}
                                        onChange={(e) => setLightColors({ ...lightColors, surface: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 px-3 py-2 text-white text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Light Mode Preview */}
                    <div className="pt-4 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-zinc-400 mb-3">{t('settings.appearance.preview')}</h3>
                        <div
                            className="p-6 border border-zinc-300"
                            style={{ backgroundColor: lightColors.background }}
                        >
                            <div
                                className="p-4 mb-4 border border-zinc-200"
                                style={{ backgroundColor: lightColors.surface }}
                            >
                                <h4 className="text-lg font-bold text-zinc-900 mb-2">Preview Card</h4>
                                <p className="text-zinc-600 text-sm">This is how your light mode will look</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 text-white font-semibold"
                                    style={{ backgroundColor: lightColors.primary }}
                                >
                                    Primary Button
                                </button>
                                <button
                                    className="px-4 py-2 text-white font-semibold"
                                    style={{ backgroundColor: lightColors.secondary }}
                                >
                                    Secondary Button
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                    <Button type="button" variant="ghost" onClick={handleReset} className="gap-2">
                        <RotateCcw size={16} />
                        {t('settings.appearance.reset')}
                    </Button>
                    <div className="flex gap-3">
                        <Button type="button" variant="ghost">
                            {t('common.cancel')}
                        </Button>
                        <Button onClick={handleSave} disabled={loading} className="gap-2">
                            <Save size={16} />
                            {loading ? t('common.loading') : t('common.save')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
