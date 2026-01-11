import { AlunoForm } from '@/components/forms/AlunoForm'
import { Suspense } from 'react'

export default function NovoAlunoPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-app-muted">Carregando formulário...</div>}>
            <AlunoForm />
        </Suspense>
    )
}
