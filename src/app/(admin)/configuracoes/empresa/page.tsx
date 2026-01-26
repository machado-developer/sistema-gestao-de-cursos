'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Building2, Upload, Save, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { toast } from 'sonner'

export default function EmpresaPage() {
    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        endereco: '',
        cidade: '',
        pais: '',
        telefone: '',
        email: '',
        website: '',
        nif: ''
    })

    const fetchEmpresa = async () => {
        try {
            const res = await fetch('/api/configuracoes/empresa')
            if (res.ok) {
                const data = await res.json()
                setFormData({
                    id: data.id || '',
                    nome: data.nome || '',
                    endereco: data.endereco || '',
                    cidade: data.cidade || 'Luanda',
                    pais: data.pais || 'Angola',
                    telefone: data.telefone || '',
                    email: data.email || '',
                    website: data.website || '',
                    nif: data.nif || ''
                })
            }
        } catch (error) {
            toast.error("Erro ao carregar dados da empresa")
        } finally {
            setInitialLoading(false)
        }
    }

    useEffect(() => {
        fetchEmpresa()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/configuracoes/empresa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!res.ok) throw new Error()

            toast.success("Definições da empresa guardadas com sucesso")
        } catch (error) {
            toast.error("Erro ao guardar definições")
        } finally {
            setLoading(false)
        }
    }

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-app-text">{t('settings.company.title') || "Configurações da Empresa"}</h1>
                <p className="text-app-muted">{t('settings.company.subtitle') || "Gerencie as informações da sua organização que aparecerão nos documentos."}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Logo Upload */}
                <div className="glass-card p-6 space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Building2 size={20} className="text-blue-400" />
                        {t('settings.company.logo') || "Logotipo"}
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-blue-600 flex items-center justify-center text-white font-black text-3xl border border-white/20">
                            {formData.nome?.substring(0, 2).toUpperCase() || 'GP'}
                        </div>
                        <div className="flex-1">
                            <Button type="button" variant="secondary" className="gap-2">
                                <Upload size={16} />
                                {t('settings.company.upload_logo') || "Substituir Logo"}
                            </Button>
                            <p className="text-xs text-zinc-500 mt-2">
                                {t('settings.company.logo_hint') || "Usar ficheiro PNG ou JPG de alta resolução."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Company Information */}
                <div className="glass-card p-6 space-y-6">
                    <h2 className="text-lg font-semibold">{t('settings.company.information') || "Informações Gerais"}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label={t('settings.company.name') || "Nome da Empresa"}
                                value={formData.nome || ""}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label={t('settings.company.address') || "Endereço Fiscal"}
                                value={formData.endereco || ""}
                                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                            />
                        </div>

                        <Input
                            label={t('settings.company.city') || "Cidade"}
                            value={formData.cidade || ""}
                            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                        />

                        <Input
                            label={t('settings.company.country') || "País"}
                            value={formData.pais || ""}
                            onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                        />

                        <Input
                            label={t('common.phone') || "Telefone de Contacto"}
                            type="tel"
                            value={formData.telefone || ""}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        />

                        <Input
                            label={t('common.email') || "E-mail Geral"}
                            type="email"
                            value={formData.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <Input
                            label={t('settings.company.website') || "Website"}
                            type="url"
                            value={formData.website || ""}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />

                        <Input
                            label={t('settings.company.tax_id') || "NIF / Identificação Fiscal"}
                            value={formData.nif || ""}
                            onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pb-8">
                    <Button type="button" variant="ghost" onClick={() => fetchEmpresa()}>
                        {t('common.cancel') || "Descartar"}
                    </Button>
                    <Button type="submit" disabled={loading} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Save size={16} />
                        {loading ? (t('common.loading') || "A guardar...") : (t('common.save') || "Guardar Alterações")}
                    </Button>
                </div>
            </form>
        </div>
    )
}
