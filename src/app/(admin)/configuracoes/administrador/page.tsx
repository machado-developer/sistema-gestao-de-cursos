'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { User, Upload, Save, Lock } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useSession } from 'next-auth/react'

export default function AdministradorPage() {
    const { t } = useLanguage()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [formData, setFormData] = useState({
        nome: session?.user?.name || '',
        email: session?.user?.email || '',
        telefone: '',
        cargo: 'Administrador'
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // TODO: Implement save logic
        setTimeout(() => {
            setLoading(false)
            alert(t('settings.admin.saved'))
        }, 1000)
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert(t('settings.admin.password_mismatch'))
            return
        }
        setLoading(true)
        // TODO: Implement password change logic
        setTimeout(() => {
            setLoading(false)
            setShowPasswordForm(false)
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            alert(t('settings.admin.password_changed'))
        }, 1000)
    }

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-app-text">{t('settings.admin.title')}</h1>
                <p className="text-app-muted">{t('settings.admin.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Photo */}
                <div className="glass-card p-6 space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <User size={20} className="text-blue-400" />
                        {t('settings.admin.profile_photo')}
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-black text-3xl border border-white/20">
                            {session?.user?.name?.[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <Button type="button" variant="secondary" className="gap-2">
                                <Upload size={16} />
                                {t('settings.admin.upload_photo')}
                            </Button>
                            <p className="text-xs text-zinc-500 mt-2">
                                {t('settings.admin.photo_hint')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="glass-card p-6 space-y-6">
                    <h2 className="text-lg font-semibold">{t('settings.admin.information')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label={t('settings.admin.full_name')}
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                            />
                        </div>

                        <Input
                            label={t('common.email')}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <Input
                            label={t('common.phone')}
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        />

                        <div className="md:col-span-2">
                            <Input
                                label={t('settings.admin.role')}
                                value={formData.cargo}
                                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                            />
                        </div>
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

            {/* Password Change Section */}
            <div className="mt-8 glass-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Lock size={20} className="text-blue-400" />
                            {t('settings.admin.change_password')}
                        </h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            {t('settings.admin.password_hint')}
                        </p>
                    </div>
                    {!showPasswordForm && (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowPasswordForm(true)}
                        >
                            {t('settings.admin.change_password')}
                        </Button>
                    )}
                </div>

                {showPasswordForm && (
                    <form onSubmit={handlePasswordChange} className="space-y-4 pt-4 border-t border-white/10">
                        <Input
                            label={t('settings.admin.current_password')}
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            required
                        />
                        <Input
                            label={t('settings.admin.new_password')}
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            required
                        />
                        <Input
                            label={t('settings.admin.confirm_password')}
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            required
                        />
                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setShowPasswordForm(false)
                                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                                }}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? t('common.loading') : t('settings.admin.update_password')}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
