'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Building2, Upload, Save } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function EmpresaPage() {
    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        nome: 'Gestão PRO',
        endereco: '',
        cidade: '',
        pais: '',
        telefone: '',
        email: '',
        website: '',
        nif: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // TODO: Implement save logic
        setTimeout(() => {
            setLoading(false)
            alert(t('settings.company.saved'))
        }, 1000)
    }

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-app-text">{t('settings.company.title')}</h1>
                <p className="text-app-muted">{t('settings.company.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Logo Upload */}
                <div className="glass-card p-6 space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Building2 size={20} className="text-blue-400" />
                        {t('settings.company.logo')}
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-blue-600 flex items-center justify-center text-white font-black text-3xl border border-white/20">
                            GP
                        </div>
                        <div className="flex-1">
                            <Button type="button" variant="secondary" className="gap-2">
                                <Upload size={16} />
                                {t('settings.company.upload_logo')}
                            </Button>
                            <p className="text-xs text-zinc-500 mt-2">
                                {t('settings.company.logo_hint')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Company Information */}
                <div className="glass-card p-6 space-y-6">
                    <h2 className="text-lg font-semibold">{t('settings.company.information')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label={t('settings.company.name')}
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label={t('settings.company.address')}
                                value={formData.endereco}
                                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                            />
                        </div>

                        <Input
                            label={t('settings.company.city')}
                            value={formData.cidade}
                            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                        />

                        <Input
                            label={t('settings.company.country')}
                            value={formData.pais}
                            onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                        />

                        <Input
                            label={t('common.phone')}
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        />

                        <Input
                            label={t('common.email')}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <Input
                            label={t('settings.company.website')}
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />

                        <Input
                            label={t('settings.company.tax_id')}
                            value={formData.nif}
                            onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="ghost">
                        {t('common.cancel')}
                    </Button>
                    <Button type="submit" disabled={loading} className="gap-2">
                        <Save size={16} />
                        {loading ? t('common.loading') : t('common.save')}
                    </Button>
                </div>
            </form>
        </div>
    )
}
