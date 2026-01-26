import { pdf } from "@react-pdf/renderer";
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { formatCurrency } from "@/lib/utils";

// Importações de Templates
import { NewTechCertificateDocument } from "@/components/certificates/NewTechCertificateDocument";
import { BulkCertificateDocument } from "@/components/certificates/BulkCertificateDocument";

/**
 * Tipos de documentos suportados pelo sistema
 */
export enum DocumentType {
    PAYROLL_RECEIPT = "PAYROLL_RECEIPT",
    PAYROLL_SHEET = "PAYROLL_SHEET",
    IRT_MAP = "IRT_MAP",
    INSS_MAP = "INSS_MAP",
    CERTIFICATE = "CERTIFICATE",
    BULK_CERTIFICATES = "BULK_CERTIFICATES",
    STUDENT_LIST = "STUDENT_LIST",
    ENROLLMENT_LIST = "ENROLLMENT_LIST",
    MATRICULA_CONFIRMATION = "MATRICULA_CONFIRMATION",
    ACADEMIC_PAUTA = "ACADEMIC_PAUTA",
    STUDENT_FINANCIAL_EXTRACT = "STUDENT_FINANCIAL_EXTRACT"
}

/**
 * Formatos de exportação suportados
 */
export enum ExportFormat {
    PDF = "PDF",
    XLSX = "XLSX",
    CSV = "CSV",
    DOCX = "DOCX"
}

const meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export class DocumentService {

    private static getCompanyData(info: any) {
        return {
            name: info?.nome || "NewTech Angola",
            address: info?.endereco || "Luanda, Angola",
            email: info?.email || "geral@newtech.ao",
            nif: info?.nif || "---"
        };
    }

    /**
     * Gera e descarrega um documento baseado no tipo, dados e formato
     */
    static async generate(type: DocumentType, format: ExportFormat, data: any, options: any = {}) {
        const company = this.getCompanyData(options.companyInfo);

        switch (type) {
            case DocumentType.PAYROLL_RECEIPT:
                return this.handlePayrollReceipt(format, data, company);
            case DocumentType.PAYROLL_SHEET:
                return this.handlePayrollSheet(format, data, company, options);
            case DocumentType.IRT_MAP:
            case DocumentType.INSS_MAP:
                return this.handleLegalMap(type, format, data, options);
            case DocumentType.STUDENT_LIST:
            case DocumentType.ENROLLMENT_LIST:
            case DocumentType.ACADEMIC_PAUTA:
                return this.handleTableExport(type, format, data, options, company);
            case DocumentType.CERTIFICATE:
                return this.handleCertificateExport(data, options);
            case DocumentType.BULK_CERTIFICATES:
                return this.handleBulkCertificateExport(data, options);
            case DocumentType.MATRICULA_CONFIRMATION:
                return this.handleMatriculaConfirmation(data, company);
            case DocumentType.STUDENT_FINANCIAL_EXTRACT:
                return this.handleStudentFinancialExtract(data, company);
            default:
                throw new Error("Tipo de documento não suportado.");
        }
    }

    // --- Handlers específicos ---

    private static async handleCertificateExport(data: any, options: any) {
        // Resolve background image path
        const bgPath = data?.turma?.curso?.certificateTemplate?.imageUrl || "/images/certificate-bg.png";
        const backgroundUrl = bgPath.startsWith('http') ? bgPath : `${window.location.origin}${bgPath}`;

        const doc = React.createElement(NewTechCertificateDocument, {
            data: {
                ...data,
                qrCode: options.qrCode || '',
                codigo_unico: data.certificate?.codigo_unico || options.codigo_unico
            },
            backgroundImage: backgroundUrl
        });

        const filename = `certificado_${data.aluno.nome_completo.replace(/\s+/g, '_')}.pdf`;
        return this.renderReactPDF(doc, filename);
    }

    private static async handleBulkCertificateExport(matriculas: any[], options: any) {
        const doc = React.createElement(BulkCertificateDocument, { certificates: matriculas });
        const filename = `certificados_lote_${new Date().getTime()}.pdf`;
        return this.renderReactPDF(doc as React.ReactElement, filename);
    }

    private static async handleMatriculaConfirmation(data: any, company: any) {
        // Implementação baseada em jsPDF para confirmação de matrícula
        const doc = new jsPDF();

        // Header
        doc.setFontSize(18);
        doc.text(company.name, 14, 20);
        doc.setFontSize(12);
        doc.text("CONFIRMAÇÃO DE MATRÍCULA", 105, 40, { align: 'center' });

        // Content
        doc.setFontSize(10);
        doc.text(`Confirmamos que o aluno(a) ${data.aluno.nome_completo}`, 14, 60);
        doc.text(`Portador do BI nº ${data.aluno.bi_documento}`, 14, 66);
        doc.text(`Encontra-se matriculado no curso de ${data.turma.curso.nome}`, 14, 72);
        doc.text(`Turma: ${data.turma.codigo_turma}`, 14, 78);

        // Footer
        doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 150);

        doc.save(`Confirmacao_${data.aluno.nome_completo.replace(/\s+/g, '_')}.pdf`);
    }

    private static async handleStudentFinancialExtract(data: any, company: any) {
        // Implementação para Extrato Financeiro do Aluno
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(company.name, 14, 20);
        doc.setFontSize(12);
        doc.text(`EXTRATO FINANCEIRO - ${data.aluno.nome_completo.toUpperCase()}`, 14, 40);

        const tableBody = data.pagamentos.map((p: any) => [
            new Date(p.data_pagamento).toLocaleDateString(),
            p.referencia || '---',
            p.metodo_pagamento,
            formatCurrency(Number(p.valor))
        ]);

        autoTable(doc, {
            startY: 50,
            head: [['Data', 'Ref.', 'Método', 'Valor']],
            body: tableBody,
            foot: [[
                { content: 'Total Pago', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: formatCurrency(data.totalPago), styles: { fontStyle: 'bold' } }
            ]]
        });

        doc.save(`Extrato_${data.aluno.nome_completo.replace(/\s+/g, '_')}.pdf`);
    }

    private static async renderReactPDF(document: React.ReactElement<any>, filename: string) {
        const blob = await pdf(document as any).toBlob();
        saveAs(blob, filename);
    }

    private static async handleTableExport(type: DocumentType, format: ExportFormat, data: any, options: any, company: any) {
        if (format === ExportFormat.PDF) {
            return this.exportGenericTablePDF(data, options.title, options.columns, options.filename || 'lista', company);
        }
        if (format === ExportFormat.XLSX) {
            return this.exportGenericTableXLSX(data, options.title, options.columns, options.filename || 'lista', company);
        }
        throw new Error(`Formato ${format} não suportado para listagens.`);
    }

    private static handlePayrollReceipt(format: ExportFormat, data: any, company: any) {
        switch (format) {
            case ExportFormat.PDF:
                return this.exportPayrollReceiptPDF(data, company);
            case ExportFormat.XLSX:
                return this.exportPayrollReceiptExcel(data, company);
            case ExportFormat.DOCX:
                return this.exportPayrollReceiptWord(data, company);
            default:
                throw new Error(`Formato ${format} não suportado para Recibo de Vencimento.`);
        }
    }

    private static handlePayrollSheet(format: ExportFormat, data: any, company: any, options: any) {
        switch (format) {
            case ExportFormat.PDF:
                return this.exportModelBPDF(data, options.mes, options.ano, company);
            case ExportFormat.XLSX:
                return this.exportModelBExcel(data, options.mes, options.ano, company);
            default:
                throw new Error(`Formato ${format} não suportado para Folha de Salário.`);
        }
    }

    private static handleLegalMap(type: DocumentType, format: ExportFormat, data: any, options: any) {
        if (format === ExportFormat.CSV) {
            const mapType = type === DocumentType.IRT_MAP ? 'IRT' : 'INSS';
            return this.exportLegalMapCSV(data, mapType, options.mes, options.ano);
        }
        throw new Error(`Formato ${format} não suportado para Mapas Legais.`);
    }

    // --- Implementações de Exportação (Portadas de payrollExporter.ts) ---

    private static exportPayrollReceiptPDF(data: any, company: any) {
        const doc = new jsPDF();
        const { funcionario, mes, ano, salario_base, total_subsidios_tributaveis, total_subsidios_isentos, total_horas_extras, total_faltas, inss_trabalhador, irt_devido, liquido_receber } = data;

        // Header
        doc.setTextColor(37, 99, 235);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(company.name, 14, 20);

        doc.setTextColor(100);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(company.address, 14, 25);
        doc.text(company.email, 14, 29);

        // Title
        doc.setTextColor(0);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("RECIBO DE VENCIMENTO", 195, 20, { align: "right" });
        doc.setFontSize(10);
        doc.text(`Período: ${meses[mes]} / ${ano}`, 195, 26, { align: "right" });

        // Employee Info
        doc.setDrawColor(37, 99, 235);
        doc.setLineWidth(0.5);
        doc.rect(14, 35, 182, 25);

        doc.setFontSize(9);
        doc.text("COLABORADOR:", 18, 42);
        doc.setFont("helvetica", "bold");
        doc.text(funcionario.nome.toUpperCase(), 18, 47);

        doc.setFont("helvetica", "normal");
        doc.text(`BI: ${funcionario.bi_documento}`, 18, 54);
        doc.text(`NIF: ${funcionario.nif || '---'}`, 60, 54);
        doc.text(`NIF Empresa: ${company.nif}`, 192, 31, { align: "right" });

        doc.text("DEPARTAMENTO:", 120, 42);
        doc.setFont("helvetica", "bold");
        doc.text((funcionario.departamento?.nome || 'Geral').toUpperCase(), 120, 47);

        doc.setFont("helvetica", "normal");
        doc.text("CARGO:", 120, 54);
        doc.text((funcionario.cargo?.nome || '---').toUpperCase(), 135, 54);

        // Table Data
        const tableBody = [
            ["Salário Base Mensal", "30 D", formatCurrency(Number(salario_base)), "---"],
        ];

        if (Number(total_subsidios_tributaveis) > 0) tableBody.push(["Subsídios Tributáveis", "1", formatCurrency(Number(total_subsidios_tributaveis)), "---"]);
        if (Number(total_subsidios_isentos) > 0) tableBody.push(["Subsídios Isentos", "1", formatCurrency(Number(total_subsidios_isentos)), "---"]);
        if (Number(total_horas_extras) > 0) tableBody.push(["Horas Extras / Ajustes", "---", formatCurrency(Number(total_horas_extras)), "---"]);
        if (Number(total_faltas) > 0) tableBody.push(["Faltas Injustificadas", "---", "---", `(${formatCurrency(Number(total_faltas))})`]);

        tableBody.push(["Segurança Social (3%)", "3%", "---", formatCurrency(Number(inss_trabalhador))]);
        tableBody.push(["Imposto IRT", "Var.", "---", formatCurrency(Number(irt_devido))]);

        autoTable(doc, {
            startY: 70,
            head: [["Descrição", "Quant.", "Vencimentos", "Descontos"]],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { halign: 'center' },
                2: { halign: 'right' },
                3: { halign: 'right' }
            },
            foot: [[
                { content: 'Líquido a Receber', colSpan: 2, styles: { fontStyle: 'bold', halign: 'right' } },
                { content: formatCurrency(Number(liquido_receber)), colSpan: 2, styles: { fontStyle: 'bold', halign: 'right', textColor: [22, 163, 74], fontSize: 11 } }
            ]]
        });

        // Signatures
        const finalY = (doc as any).lastAutoTable.finalY + 40;
        doc.setDrawColor(100);
        doc.line(30, finalY, 80, finalY); // Employer
        doc.line(130, finalY, 180, finalY); // Employee
        doc.setFontSize(8);
        doc.text("Pelo Empregador", 55, finalY + 5, { align: "center" });
        doc.text("O Colaborador", 155, finalY + 5, { align: "center" });

        doc.save(`Recibo_${funcionario.nome.replace(/\s+/g, '_')}_${meses[mes]}.pdf`);
    }

    private static exportPayrollReceiptExcel(data: any, company: any) {
        const { funcionario, mes, ano, salario_base, total_subsidios_tributaveis, total_subsidios_isentos, total_horas_extras, total_faltas, inss_trabalhador, irt_devido, liquido_receber } = data;

        const ws_data = [
            [company.name],
            [company.address],
            [`NIF: ${company.nif}`],
            ["RECIBO DE VENCIMENTO", `${meses[mes]} / ${ano}`],
            [],
            ["COLABORADOR", funcionario.nome],
            ["BI", funcionario.bi_documento],
            ["CARGO", funcionario.cargo?.nome],
            [],
            ["DESCRIÇÃO", "VENCIMENTOS", "DESCONTOS"],
            ["Salário Base", Number(salario_base), 0],
            ["Subsídios Tributáveis", Number(total_subsidios_tributaveis), 0],
            ["Subsídios Isentos", Number(total_subsidios_isentos), 0],
            ["Horas Extras", Number(total_horas_extras), 0],
            ["Faltas", 0, Number(total_faltas)],
            ["INSS (3%)", 0, Number(inss_trabalhador)],
            ["IRT", 0, Number(irt_devido)],
            [],
            ["LÍQUIDO A RECEBER", Number(liquido_receber)]
        ];

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Recibo");
        XLSX.writeFile(wb, `Recibo_${funcionario.nome}_${meses[mes]}.xlsx`);
    }

    private static async exportPayrollReceiptWord(data: any, company: any) {
        const { funcionario, mes, ano, salario_base, liquido_receber } = data;

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: company.name, bold: true, size: 28, color: "2563EB" }),
                        ]
                    }),
                    new Paragraph({ children: [new TextRun(company.address),] }),
                    new Paragraph({ children: [new TextRun(`NIF: ${company.nif}`),] }),
                    new Paragraph({ text: "" }),
                    new Paragraph({
                        children: [new TextRun({ text: "RECIBO DE VENCIMENTO", bold: true, size: 24 })],
                        alignment: AlignmentType.CENTER
                    }),
                    new Paragraph({
                        children: [new TextRun(`Período: ${meses[mes]} / ${ano}`)],
                        alignment: AlignmentType.CENTER
                    }),
                    new Paragraph({ text: "" }),
                    new Paragraph({ children: [new TextRun({ text: `Colaborador: ${funcionario.nome}`, bold: true })] }),
                    new Paragraph({ children: [new TextRun(`Cargo: ${funcionario.cargo?.nome || '---'}`)] }),
                    new Paragraph({ text: "" }),

                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Descrição", bold: true })] })], shading: { fill: "F3F4F6" } }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Valor", bold: true })] })], shading: { fill: "F3F4F6" } }),
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Salário Base")] }),
                                    new TableCell({ children: [new Paragraph(formatCurrency(Number(salario_base)))] }),
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Líquido a Receber")] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: formatCurrency(Number(liquido_receber)), bold: true, color: "16A34A" })] })] }),
                                ]
                            })
                        ]
                    })
                ]
            }]
        });

        const buffer = await Packer.toBlob(doc);
        saveAs(buffer, `Recibo_${funcionario.nome}.docx`);
    }

    private static async exportModelBExcel(relatorio: any, mes: number, ano: number, company: any) {
        if (!relatorio || !relatorio.folhas) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Folha de Salário");

        // Headers following image Model B standard
        const headers = ["DATA", "NOME", "FUNÇÃO", "DIAS TRABALHADOS", "SALÁRIO DIÁRIO", "SUBSÍDIO DE COMUNICA", "SALÁRIO", "INSS (3%)", "IRT", "A PAGAR", "IBAN"];
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } }; // Light gray
            cell.font = { bold: true };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        const processingDate = new Date(ano, mes, 0).toLocaleDateString('pt-PT');

        relatorio.folhas.forEach((f: any) => {
            const salaryBase = Number(f.salario_base);
            const dailySalary = salaryBase / 22;
            const daysWorked = 22 - (f.faltas_count || 0);
            const commAllowance = Number(f.total_subsidios_tributaveis);

            const rowData = [
                processingDate,
                f.funcionario?.nome || "---",
                f.funcionario?.cargo?.nome || "---",
                daysWorked,
                dailySalary,
                commAllowance,
                salaryBase,
                Number(f.inss_trabalhador),
                Number(f.irt_devido),
                Number(f.liquido_receber),
                f.funcionario?.iban || "---"
            ];

            const row = worksheet.addRow(rowData);
            row.eachCell(cell => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
            [5, 6, 7, 8, 9, 10].forEach(col => {
                row.getCell(col).numFmt = '#,##0.00 "kz"';
            });
        });

        // Total Row
        const totalAPagar = relatorio.resumo.totalLiquid;
        const totalRow = worksheet.addRow(["TOTAL", "", "", "", "", "", "", "", "", totalAPagar, ""]);
        totalRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } }; // Yellow
        totalRow.getCell(10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } }; // Green
        totalRow.font = { bold: true };

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `Folha_Salarial_${meses[mes]}_${ano}.xlsx`);
    }

    private static exportModelBPDF(relatorio: any, mes: number, ano: number, company: any) {
        if (!relatorio || !relatorio.folhas) return;
        const doc = new jsPDF({ orientation: "landscape" });

        // Branding
        doc.setTextColor(37, 99, 235);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(company.name, 14, 20);

        doc.setTextColor(0);
        doc.setFontSize(12);
        doc.text(`FOLHA DE SALÁRIO - ${meses[mes].toUpperCase()} / ${ano}`, 14, 28);

        // Date as in Model B (last day of month)
        const processingDate = new Date(ano, mes, 0).toLocaleDateString('pt-PT');
        doc.setFontSize(10);
        doc.text(processingDate, 280, 20, { align: 'right' });

        const columns = ["DATA", "NOME", "FUNÇÃO", "DIAS TRAB.", "SAL. DIÁRIO", "SUB. COM.", "SALÁRIO", "INSS", "IRT", "A PAGAR", "IBAN"];

        const tableBody = relatorio.folhas.map((f: any) => {
            const salaryBase = Number(f.salario_base);
            const dailySalary = salaryBase / 22;
            const daysWorked = 22 - (f.faltas_count || 0);
            const commAllowance = Number(f.total_subsidios_tributaveis);

            return [
                processingDate,
                f.funcionario?.nome || "---",
                f.funcionario?.cargo?.nome || "---",
                daysWorked.toString(),
                formatCurrency(dailySalary),
                formatCurrency(commAllowance),
                formatCurrency(salaryBase),
                formatCurrency(Number(f.inss_trabalhador)),
                formatCurrency(Number(f.irt_devido)),
                formatCurrency(Number(f.liquido_receber)),
                f.funcionario?.iban || "---"
            ];
        });

        autoTable(doc, {
            startY: 40,
            head: [columns],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42], fontSize: 7 },
            styles: { fontSize: 6, cellPadding: 1.5 },
            columnStyles: {
                9: { fontStyle: 'bold', textColor: [22, 163, 74] } // A PAGAR in Greenish
            },
            foot: [[
                { content: 'TOTAL', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: [255, 255, 0] } },
                { content: '', colSpan: 6 },
                { content: formatCurrency(relatorio.resumo.totalLiquid), styles: { halign: 'right', fontStyle: 'bold', fillColor: [146, 208, 80] } },
                { content: '' }
            ]]
        });

        doc.save(`Folha_Salarial_${meses[mes]}_${ano}.pdf`);
    }

    private static exportLegalMapCSV(relatorio: any, type: 'IRT' | 'INSS', mes: number, ano: number) {
        if (!relatorio || !relatorio.folhas || !relatorio.folhas.length) return;

        let csvContent = "\uFEFF"; // BOM for Excel UTF-8
        if (type === 'IRT') {
            csvContent += "NOME,BI,BASE IRT,IRT DEVIDO\n";
            relatorio.folhas.forEach((f: any) => {
                csvContent += `"${f.funcionario.nome}","${f.funcionario.bi_documento}",${f.base_irt},${f.irt_devido}\n`;
            });
        } else {
            csvContent += "NOME,NUMERO INSS,BASE INSS,TRABALHADOR(3%),EMPRESA(8%)\n";
            relatorio.folhas.forEach((f: any) => {
                csvContent += `"${f.funcionario.nome}","${f.funcionario.numero_inss || ''}",${f.base_inss},${f.inss_trabalhador},${f.inss_empresa}\n`;
            });
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `MAPA_${type}_${mes}_${ano}.csv`);
    }

    private static exportGenericTablePDF(data: any[][], title: string, columns: string[], filename: string, company: any) {
        const doc = new jsPDF();

        // Header Branding
        doc.setFontSize(18);
        doc.setTextColor(15, 23, 42); // Slate-900
        doc.setFont('helvetica', 'bold');
        doc.text(company.name, 14, 20);

        // Report Title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85); // Slate-700
        doc.text(title, 14, 30);

        // Generation Date
        const today = new Date().toLocaleDateString('pt-AO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // Slate-400
        doc.text(`Gerado em: ${today}`, 14, 36);

        // Table
        autoTable(doc, {
            head: [columns],
            body: data,
            startY: 42,
            styles: {
                fontSize: 9,
                cellPadding: 3,
                textColor: [51, 65, 85],
                lineColor: [226, 232, 240],
                lineWidth: 0.1,
            },
            headStyles: {
                fillColor: [15, 23, 42],
                textColor: 255,
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252],
            }
        });

        doc.save(`${filename}.pdf`);
    }

    private static async exportGenericTableXLSX(data: any[][], title: string, columns: string[], filename: string, company: any) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Lista");

        // Header
        worksheet.addRow([company.name]).font = { bold: true, size: 14 };
        worksheet.addRow([title.toUpperCase()]).font = { bold: true };
        worksheet.addRow([`Gerado em: ${new Date().toLocaleDateString()}`]);
        worksheet.addRow([]);

        // Table Header
        const headerRow = worksheet.addRow(columns);
        headerRow.eachCell((cell: any) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        });

        // Data
        data.forEach(rowData => worksheet.addRow(rowData));

        // Auto Column Width
        worksheet.columns.forEach(column => {
            column.width = 20;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `${filename}.xlsx`);
    }
}
