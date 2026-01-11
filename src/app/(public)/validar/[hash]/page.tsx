import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CheckCircle2, XCircle, Award, Calendar, User, BookOpen } from 'lucide-react'

export default async function ValidaPagina({ params }: { params: Promise<{ hash: string }> }) {
    const { hash } = await params

    const certificate = await prisma.certificate.findUnique({
        where: { hash_validacao: hash },
        include: {
            matricula: {
                include: {
                    aluno: true,
                    turma: {
                        include: {
                            curso: true
                        }
                    }
                }
            }
        }
    })

    if (!certificate) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
                <div className="max-w-md w-full glass p-8 text-center space-y-6">
                    <div className="flex justify-center">
                        <XCircle size={64} className="text-red-500" />
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                        Certificado Inválido
                    </h1>
                    <p className="text-zinc-400">
                        O código de validação fornecido não corresponde a nenhum certificado emitido pelo nosso sistema.
                    </p>
                    <div className="pt-4">
                        <a href="/" className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10">
                            Voltar ao Início
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const { matricula } = certificate

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 py-20">
            <div className="max-w-2xl w-full glass p-10 space-y-8 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Award size={120} />
                </div>

                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 size={64} className="text-green-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Certificado Autêntico
                    </h1>
                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">
                        Código de Verificação: {certificate.codigo_unico}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-lg">
                            <User className="text-blue-500 mt-1" size={20} />
                            <div>
                                <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Aluno</p>
                                <p className="text-white font-bold">{matricula.aluno.nome_completo}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-lg">
                            <Award className="text-blue-500 mt-1" size={20} />
                            <div>
                                <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Curso</p>
                                <p className="text-white font-bold">{matricula.turma.curso.nome}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-lg">
                            <Calendar className="text-blue-500 mt-1" size={20} />
                            <div>
                                <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Data de Emissão</p>
                                <p className="text-white font-bold">
                                    {new Date(certificate.data_emissao).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-lg">
                            <BookOpen className="text-blue-500 mt-1" size={20} />
                            <div>
                                <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Carga Horária</p>
                                <p className="text-white font-bold">{matricula.turma.curso.carga_horaria} Horas</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 text-center border-t border-white/10">
                    <p className="text-sm text-zinc-500 italic">
                        Este documento foi validado digitalmente pela plataforma de gestão da NewTech.
                    </p>
                </div>
            </div>
        </div>
    )
}
