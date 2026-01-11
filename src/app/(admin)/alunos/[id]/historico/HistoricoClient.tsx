'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, GraduationCap, Calendar, CheckCircle2, XCircle, Award, FileText, Download } from 'lucide-react'
import Link from 'next/link'

interface HistoricoClientProps {
    aluno: any
}

export function HistoricoClient({ aluno }: HistoricoClientProps) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link href={`/alunos`}>
                        <Button variant="ghost" className="mb-2 text-zinc-500 hover:text-white">
                            <ArrowLeft size={16} /> Voltar para Alunos
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        Histórico Académico
                    </h1>
                    <p className="text-zinc-500 font-bold mt-1">
                        {aluno.nome_completo}
                    </p>
                </div>
            </div>

            {/* Student Info Card */}
            <Card className="p-6 bg-card-bg border-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">BI/Documento</p>
                        <p className="text-white font-bold">{aluno.bi_documento}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Email</p>
                        <p className="text-white font-bold">{aluno.email || '-'}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Telefone</p>
                        <p className="text-white font-bold">{aluno.telefone || '-'}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                        {aluno.matriculas.some((m: any) => m.status_academico === 'Cursando') ? (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                                <CheckCircle2 size={12} strokeWidth={3} /> Ativo
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-zinc-500 bg-zinc-500/10 border border-zinc-500/20 px-2.5 py-1 rounded-full">
                                Inativo
                            </span>
                        )}
                    </div>
                </div>
            </Card>

            {/* Academic History Timeline/Cards */}
            <div className="space-y-6">
                <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <GraduationCap className="text-blue-500" /> Cursos Realizados
                </h2>

                {aluno.matriculas.length === 0 ? (
                    <Card className="p-12 text-center bg-card-bg border-border">
                        <p className="text-zinc-500 font-bold">Nenhum histórico académico encontrado.</p>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {aluno.matriculas.map((matricula: any) => (
                            <Card key={matricula.id} className="overflow-hidden border-border bg-card-bg group hover:border-blue-500/30 transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">

                                        {/* Course Info */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 border border-blue-500/20 rounded">
                                                        {matricula.turma.codigo_turma}
                                                    </span>
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${matricula.status_academico === 'Aprovado' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                                                            matricula.status_academico === 'Reprovado' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
                                                                'text-blue-500 bg-blue-500/10 border-blue-500/20'
                                                        }`}>
                                                        {matricula.status_academico}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-black text-white">{matricula.turma.curso.nome}</h3>
                                                <p className="text-sm text-zinc-400 mt-1">{matricula.turma.curso.descricao}</p>
                                            </div>

                                            <div className="flex items-center gap-6 text-sm text-zinc-500">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {new Date(matricula.turma.data_inicio).toLocaleDateString('pt-PT')}
                                                    {' - '}
                                                    {new Date(matricula.turma.data_fim).toLocaleDateString('pt-PT')}
                                                </div>
                                                {matricula.turma.instrutor && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold">Instrutor:</span> {matricula.turma.instrutor.nome}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Grade & Attendance Stats */}
                                        <div className="flex flex-col sm:flex-row gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 min-w-[300px]">
                                            <div className="flex-1 space-y-1 text-center p-4 rounded-lg bg-zinc-950/30">
                                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Média Final</span>
                                                <div className={`text-3xl font-black ${(matricula.media_final || 0) >= matricula.turma.curso.media_minima_aprovacao
                                                        ? 'text-green-500'
                                                        : 'text-zinc-500'
                                                    }`}>
                                                    {matricula.media_final?.toFixed(1) || '-'}
                                                </div>
                                                <p className="text-[10px] text-zinc-600">
                                                    Min: {matricula.turma.curso.media_minima_aprovacao}
                                                </p>
                                            </div>

                                            <div className="flex-1 space-y-1 text-center p-4 rounded-lg bg-zinc-950/30">
                                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Frequência</span>
                                                <div className={`text-3xl font-black ${(matricula.percentual_frequencia || 0) >= matricula.turma.curso.frequencia_minima
                                                        ? 'text-green-500'
                                                        : 'text-zinc-500'
                                                    }`}>
                                                    {matricula.percentual_frequencia?.toFixed(0) || '0'}%
                                                </div>
                                                <p className="text-[10px] text-zinc-600">
                                                    Min: {matricula.turma.curso.frequencia_minima}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions / Certificate */}
                                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="text-xs text-zinc-500">
                                                <span className="font-bold text-zinc-400">{matricula.avaliacoes.length}</span> avaliações realizadas
                                            </div>
                                        </div>

                                        {matricula.status_academico === 'Aprovado' && matricula.certificate ? (
                                            <Link href={`/validar/${matricula.certificate.hash_validacao}`} target="_blank">
                                                <Button size="sm" className="gap-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
                                                    <Award size={16} /> Ver Certificado
                                                </Button>
                                            </Link>
                                        ) : matricula.status_academico === 'Aprovado' ? (
                                            <span className="text-xs font-bold text-yellow-500/50 flex items-center gap-1">
                                                <Award size={14} /> Certificado Disponível
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
