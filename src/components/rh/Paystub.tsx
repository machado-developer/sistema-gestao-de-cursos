"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { Printer, Download, MapPin, Building2, User, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DocumentService, DocumentType, ExportFormat } from "@/services/DocumentService";

interface PaystubProps {
    data: any;
}

export function Paystub({ data }: PaystubProps) {
    const [empresa, setEmpresa] = useState<any>(null);

    useEffect(() => {
        fetch('/api/configuracoes/empresa')
            .then(res => res.json())
            .then(setEmpresa)
            .catch(() => console.error("Falha ao carregar dados da empresa"));
    }, []);

    if (!data) return null;

    const { funcionario, mes, ano, salario_base, total_subsidios_tributaveis, total_subsidios_isentos, total_horas_extras, total_faltas, inss_trabalhador, irt_devido, liquido_receber } = data;

    const meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const companyName = empresa?.nome || "SGRH ANGOLA - ERP";
    const companyAddress = empresa?.endereco || "Luanda, Angola";
    const companyEmail = empresa?.email || "RH@SGRH.CO.AO";

    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg border shadow-sm max-w-4xl mx-auto print:border-0 print:shadow-none print:p-0">
            {/* Cabecalho */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter">{companyName}</h2>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Gestão Inteligente de Capital Humano</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase"><MapPin size={10} /> {companyAddress}</span>
                            <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase"><User size={10} /> {companyEmail}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="inline-block bg-slate-900 text-white px-4 py-2 rounded-sm mb-2">
                        <h1 className="text-sm font-black uppercase tracking-widest">Recibo de Salário</h1>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Período: {meses[mes]} / {ano}</p>
                </div>
            </div>

            {/* Dados Colaborador */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Colaborador</p>
                    <p className="text-sm font-black uppercase text-blue-600">{funcionario.nome}</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase">BI: {funcionario.bi_documento}</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase">NIF: {funcionario.nif || '---'}</p>
                </div>
                <div className="space-y-1 text-right">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Departamento / Cargo</p>
                    <p className="text-[10px] font-black uppercase">{funcionario.departamento?.nome || 'GERAL'}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{funcionario.cargo?.nome || 'OPERACIONAL'}</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase mt-2">Nº INSS: {funcionario.numero_inss || '---'}</p>
                </div>
            </div>

            {/* Tabela de Vencimentos */}
            <div className="border-2 border-slate-900 overflow-hidden rounded-sm mb-8">
                <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-900 text-white uppercase font-black tracking-widest">
                        <tr>
                            <th className="py-2 px-4">Descrição dos Rendimentos e Descontos</th>
                            <th className="py-2 px-4 text-center">Quant.</th>
                            <th className="py-2 px-4 text-right">Vencimentos</th>
                            <th className="py-2 px-4 text-right">Descontos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        <tr>
                            <td className="py-3 px-4 font-bold uppercase">Salário Base Mensal</td>
                            <td className="py-3 px-4 text-center">30 D</td>
                            <td className="py-3 px-4 text-right font-bold">{formatCurrency(Number(salario_base))}</td>
                            <td className="py-3 px-4 text-right text-slate-300">---</td>
                        </tr>
                        {Number(total_subsidios_tributaveis) > 0 && (
                            <tr>
                                <td className="py-3 px-4 font-bold uppercase">Subsídios Tributáveis (Alim./Trans.)</td>
                                <td className="py-3 px-4 text-center">1</td>
                                <td className="py-3 px-4 text-right font-bold">{formatCurrency(Number(total_subsidios_tributaveis))}</td>
                                <td className="py-3 px-4 text-right text-slate-300">---</td>
                            </tr>
                        )}
                        {Number(total_subsidios_isentos) > 0 && (
                            <tr>
                                <td className="py-3 px-4 font-bold uppercase">Subsídios Isentos (Resid./Outros)</td>
                                <td className="py-3 px-4 text-center">1</td>
                                <td className="py-3 px-4 text-right font-bold">{formatCurrency(Number(total_subsidios_isentos))}</td>
                                <td className="py-3 px-4 text-right text-slate-300">---</td>
                            </tr>
                        )}
                        {Number(total_horas_extras) > 0 && (
                            <tr>
                                <td className="py-3 px-4 font-bold uppercase">Horas Extraordinárias / Ajustes</td>
                                <td className="py-3 px-4 text-center">---</td>
                                <td className="py-3 px-4 text-right font-bold">{formatCurrency(Number(total_horas_extras))}</td>
                                <td className="py-3 px-4 text-right text-slate-300">---</td>
                            </tr>
                        )}
                        {Number(total_faltas) > 0 && (
                            <tr>
                                <td className="py-3 px-4 font-bold uppercase text-rose-600">Faltas Não Justificadas</td>
                                <td className="py-3 px-4 text-center">---</td>
                                <td className="py-3 px-4 text-right text-slate-300">---</td>
                                <td className="py-3 px-4 text-right font-bold text-rose-600">({formatCurrency(Number(total_faltas))})</td>
                            </tr>
                        )}
                        <tr>
                            <td className="py-3 px-4 font-bold uppercase text-amber-600">S. Social Angola (INSS 3%)</td>
                            <td className="py-3 px-4 text-center">3%</td>
                            <td className="py-3 px-4 text-right text-slate-300">---</td>
                            <td className="py-3 px-4 text-right font-bold text-amber-600">{formatCurrency(Number(inss_trabalhador))}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 font-bold uppercase text-rose-600">Imp. sobre o Rendimento (IRT)</td>
                            <td className="py-3 px-4 text-center">Var.</td>
                            <td className="py-3 px-4 text-right text-slate-300">---</td>
                            <td className="py-3 px-4 text-right font-bold text-rose-600">{formatCurrency(Number(irt_devido))}</td>
                        </tr>
                    </tbody>
                    <tfoot className="border-t-2 border-slate-900 bg-slate-50 dark:bg-zinc-800 font-black">
                        <tr>
                            <td colSpan={2} className="py-4 px-4 uppercase text-xs tracking-tighter">Líquido a Disponibilizar ▸</td>
                            <td colSpan={2} className="py-4 px-4 text-right text-lg text-emerald-600 tracking-tighter">
                                {formatCurrency(Number(liquido_receber))}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Rodapé Informativo */}
            <div className="grid grid-cols-2 gap-12 mt-12 mb-8">
                <div className="border-t-2 border-slate-200 pt-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-8">Pelo Empregador</p>
                    <div className="h-0.5 w-32 bg-slate-200 mx-auto my-4" />
                    <p className="text-[8px] font-bold uppercase text-slate-500">Assinatura e Carimbo</p>
                </div>
                <div className="border-t-2 border-slate-200 pt-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-8">O Colaborador</p>
                    <div className="h-0.5 w-32 bg-slate-200 mx-auto my-4" />
                    <p className="text-[8px] font-bold uppercase text-slate-500">Confirmo recepção do valor líquido</p>
                </div>
            </div>

            {/* Acoes de exportacao (Hidden in Print) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6 print:hidden">
                <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => window.print()}>
                    <Printer size={16} /> Imprimir
                </Button>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 gap-2 text-white"
                        onClick={() => DocumentService.generate(DocumentType.PAYROLL_RECEIPT, ExportFormat.PDF, data, { companyInfo: empresa })}>
                        <Download size={16} /> PDF
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 gap-2 text-white"
                        onClick={() => DocumentService.generate(DocumentType.PAYROLL_RECEIPT, ExportFormat.XLSX, data, { companyInfo: empresa })}>
                        <FileSpreadsheet size={16} /> Excel
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 gap-2 text-white"
                        onClick={() => DocumentService.generate(DocumentType.PAYROLL_RECEIPT, ExportFormat.DOCX, data, { companyInfo: empresa })}>
                        <FileText size={16} /> Word
                    </Button>
                </div>
            </div>
        </div>
    );
}
