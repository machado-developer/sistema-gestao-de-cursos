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
    STUDENT_FINANCIAL_EXTRACT = "STUDENT_FINANCIAL_EXTRACT",
    EMPLOYEE_LIST = "EMPLOYEE_LIST",
    VACATION_MAP = "VACATION_MAP",
    ABSENCE_REPORT = "ABSENCE_REPORT"
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
            fullName: info?.nome_completo || info?.nome || "NEW TECH - PRESTAÇÃO DE SERVIÇOS, LDA",
            address: info?.endereco || "Luanda, Angola",
            email: info?.email || "geral@newtech.ao",
            nif: info?.nif || "---",
            telefone: info?.telefone || "---",
            logoUrl: info?.logoUrl || "/logo.png"
        };
    }

    private static async getBase64Image(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = (error) => reject(error);
            img.src = url;
        });
    }

    private static async drawStandardHeader(doc: jsPDF, company: any, title?: string) {
        // Logo
        try {
            const logoUrl = company.logoUrl.startsWith('http') ? company.logoUrl : window.location.origin + company.logoUrl;
            const logoBase64 = await this.getBase64Image(logoUrl);
            doc.addImage(logoBase64, 'PNG', 14, 10, 45, 15);
        } catch (e) {
            console.warn("Logo not found or could not be loaded", e);
        }

        // Company Details
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(company.fullName.toUpperCase(), 14, 32);

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        doc.text(`NIF: ${company.nif}`, 14, 37);
        doc.text(`Endereço: ${company.address}`, 14, 42);
        doc.text(`Tel: ${company.telefone} | Email: ${company.email}`, 14, 47);

        // Document Title
        let currentY = 52;
        if (title) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0); // Black as requested
            doc.text(title.toUpperCase(), 105, 62, { align: 'center' });
            currentY = 70;
        }

        // Border line
        doc.setDrawColor(0, 0, 0); // Black border
        doc.setLineWidth(0.5);
        doc.line(14, currentY, 196, currentY);

        return currentY + 10; // Margin bottom included
    }

    /**
     * Gera e descarrega um documento baseado no tipo, dados e formato
     */
    static async generate(type: DocumentType, format: ExportFormat, data: any, options: any = {}) {
        let companyInfo = options.companyInfo;

        if (!companyInfo) {
            try {
                const res = await fetch('/api/configuracoes/empresa');
                companyInfo = await res.json();
            } catch (e) {
                console.warn("Failed to fetch company info", e);
            }
        }

        const company = this.getCompanyData(companyInfo);

        switch (type) {
            case DocumentType.PAYROLL_RECEIPT:
                return this.handlePayrollReceipt(format, data, company);
            case DocumentType.PAYROLL_SHEET:
                return this.handlePayrollSheet(format, data, company, options);
            case DocumentType.IRT_MAP:
            case DocumentType.INSS_MAP:
            case DocumentType.VACATION_MAP:
            case DocumentType.ABSENCE_REPORT:
                return this.handleLegalMap(type, format, data, options, company);
            case DocumentType.STUDENT_LIST:
            case DocumentType.ENROLLMENT_LIST:
            case DocumentType.ACADEMIC_PAUTA:
            case DocumentType.EMPLOYEE_LIST:
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
        const doc = new jsPDF();
        const startY = await this.drawStandardHeader(doc, company, "CONFIRMAÇÃO DE MATRÍCULA");

        // Content
        doc.setFontSize(10);
        doc.text(`Confirmamos que o aluno(a) ${data.aluno.nome_completo}`, 14, startY + 10);
        doc.text(`Portador do BI nº ${data.aluno.bi_documento}`, 14, startY + 18);
        doc.text(`Encontra-se matriculado no curso de ${data.turma.curso.nome}`, 14, startY + 26);
        doc.text(`Turma: ${data.turma.codigo_turma}`, 14, startY + 34);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Documento gerado automaticamente pelo sistema em: ${new Date().toLocaleString('pt-AO')}`, 14, 280);

        doc.save(`Confirmacao_${data.aluno.nome_completo.replace(/\s+/g, '_')}.pdf`);
    }

    private static async handleStudentFinancialExtract(data: any, company: any) {
        const doc = new jsPDF();
        const startY = await this.drawStandardHeader(doc, company, `EXTRATO FINANCEIRO - ${data.aluno.nome_completo.toUpperCase()}`);

        const tableBody = data.pagamentos.map((p: any, idx: number) => [
            (idx + 1).toString(),
            new Date(p.data_pagamento).toLocaleDateString(),
            p.referencia || '---',
            p.metodo_pagamento,
            formatCurrency(Number(p.valor))
        ]);

        autoTable(doc, {
            startY: startY + 5,
            head: [['Nº', 'Data', 'Ref.', 'Método', 'Valor']],
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: [/* azul dark */ 30, 41, 59] },
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

    private static handleLegalMap(type: DocumentType, format: ExportFormat, data: any, options: any, company: any) {
        const isIRT = type === DocumentType.IRT_MAP;
        const isINSS = type === DocumentType.INSS_MAP;
        const isVacation = type === DocumentType.VACATION_MAP;
        const title = isIRT ? `MAPA DE IRT - ${meses[options.mes]} / ${options.ano}`
            : isINSS ? `MAPA DE INSS - ${meses[options.mes]} / ${options.ano}`
                : isVacation ? `MAPA DE FÉRIAS - ${meses[options.mes]} / ${options.ano}`
                    : `RELATÓRIO DE FALTAS - ${meses[options.mes]} / ${options.ano}`;

        const filename = isIRT ? `Mapa_IRT_${options.mes}_${options.ano}`
            : isINSS ? `Mapa_INSS_${options.mes}_${options.ano}`
                : isVacation ? `Mapa_Ferias_${options.mes}_${options.ano}`
                    : `Relatorio_Faltas_${options.mes}_${options.ano}`;

        if (format === ExportFormat.CSV) {
            const mapType = isIRT ? 'IRT' : (type === DocumentType.INSS_MAP ? 'INSS' : (type === DocumentType.VACATION_MAP ? 'FERIAS' : 'FALTAS')) as 'IRT' | 'INSS' | 'FERIAS' | 'FALTAS';
            return this.exportLegalMapCSV(data, mapType, options.mes, options.ano);
        }

        let columns: string[] = [];
        let rows: any[][] = [];

        if (isIRT) {
            columns = ["COLABORADOR", "NIF", "REND. BRUTO", "MAT. COLECTÁVEL", "IRT RETIDO"];
            rows = (data.linhas || []).map((l: any) => [
                l.funcionario?.nome?.toUpperCase() || '---',
                l.funcionario?.nif || '---',
                format === ExportFormat.PDF ? formatCurrency(l.rendimento_bruto) : Number(l.rendimento_bruto),
                format === ExportFormat.PDF ? formatCurrency(l.materia_colectavel) : Number(l.materia_colectavel),
                format === ExportFormat.PDF ? formatCurrency(l.irt_retido) : Number(l.irt_retido)
            ]);
        } else if (type === DocumentType.INSS_MAP) {
            columns = ["COLABORADOR", "Nº INSS", "BASE INCIDÊNCIA", "TRABALHADOR (3%)", "EMPRESA (8%)", "TOTAL (11%)"];
            rows = (data.linhas || []).map((l: any) => [
                l.funcionario?.nome?.toUpperCase() || '---',
                l.funcionario?.numero_inss || '---',
                format === ExportFormat.PDF ? formatCurrency(l.base_incidencia) : Number(l.base_incidencia),
                format === ExportFormat.PDF ? formatCurrency(l.trabalhador_3) : Number(l.trabalhador_3),
                format === ExportFormat.PDF ? formatCurrency(l.empresa_8) : Number(l.empresa_8),
                format === ExportFormat.PDF ? formatCurrency(l.total_11) : Number(l.total_11)
            ]);
        } else if (type === DocumentType.VACATION_MAP) {
            columns = ["COLABORADOR", "CARGO", "INÍCIO", "FIM", "DIAS ÚTEIS"];
            rows = (data.emFerias || []).map((f: any) => [
                f.funcionario?.nome?.toUpperCase() || '---',
                (f.funcionario?.cargo?.nome || '---').toUpperCase(),
                f.data_inicio ? new Date(f.data_inicio).toLocaleDateString() : '---',
                f.data_fim ? new Date(f.data_fim).toLocaleDateString() : '---',
                f.dias_uteis || 0
            ]);
        } else if (type === DocumentType.ABSENCE_REPORT) {
            columns = ["DATA", "COLABORADOR", "CLASSIFICAÇÃO", "OBSERVAÇÕES"];
            rows = (data.faltas || []).map((f: any) => [
                f.data ? new Date(f.data).toLocaleDateString() : '---',
                f.funcionario?.nome?.toUpperCase() || '---',
                f.status === 'FALTA_I' ? 'INJUSTIFICADA' : 'JUSTIFICADA',
                f.observacao || '---'
            ]);
        }

        if (format === ExportFormat.PDF) {
            return this.exportGenericTablePDF(rows, title, columns, filename, company);
        }

        if (format === ExportFormat.XLSX) {
            return this.exportGenericTableXLSX(rows, title, columns, filename, company);
        }

        throw new Error(`Formato ${format} não suportado para Mapas Legais.`);
    }

    // --- Implementações de Exportação (Portadas de payrollExporter.ts) ---

    private static async exportPayrollReceiptPDF(data: any, company: any) {
        const doc = new jsPDF();
        const { funcionario, mes, ano, salario_base, total_subsidios_tributaveis, total_subsidios_isentos, total_horas_extras, total_faltas, inss_trabalhador, irt_devido, liquido_receber } = data;

        const startY = await this.drawStandardHeader(doc, company, "RECIBO DE VENCIMENTO");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(50, 50, 50);
        doc.text(`Período: ${meses[mes]} / ${ano}`, 196, startY - 12, { align: "right" });

        // Employee Info Box
        doc.setDrawColor(37, 99, 235);
        doc.setLineWidth(0.3);
        doc.rect(14, startY + 10, 182, 25);

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("COLABORADOR:", 18, startY + 17);
        doc.setFont("helvetica", "bold");
        doc.text(funcionario.nome.toUpperCase(), 18, startY + 22);

        doc.setFont("helvetica", "normal");
        doc.text(`BI: ${funcionario.bi_documento}`, 18, startY + 29);
        doc.text(`NIF: ${funcionario.nif || '---'}`, 60, startY + 29);

        doc.text("DEPARTAMENTO:", 120, startY + 17);
        doc.setFont("helvetica", "bold");
        doc.text((funcionario.departamento?.nome || 'Geral').toUpperCase(), 120, startY + 22);

        doc.setFont("helvetica", "normal");
        doc.text("CARGO:", 120, startY + 29);
        doc.text((funcionario.cargo?.nome || '---').toUpperCase(), 135, startY + 29);

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
            startY: startY + 5,
            head: [["Descrição", "Quant.", "Vencimentos", "Descontos"]],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { halign: 'center' },
                2: { halign: 'right' },
                3: { halign: 'right' }
            },
            foot: [[
                { content: 'Líquido a Receber', colSpan: 2, styles: { fontStyle: 'bold', halign: 'right', fillColor: [16, 185, 129], textColor: 255 } },
                { content: formatCurrency(Number(liquido_receber)), colSpan: 2, styles: { fontStyle: 'bold', halign: 'right', fillColor: [16, 185, 129], textColor: 255, fontSize: 11 } }
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

    private static async exportPayrollReceiptExcel(data: any, company: any) {
        const { funcionario, mes, ano, salario_base, total_subsidios_tributaveis, total_subsidios_isentos, total_horas_extras, total_faltas, inss_trabalhador, irt_devido, liquido_receber } = data;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Recibo de Vencimento");

        // Column widths
        worksheet.columns = [
            { width: 35 }, // Descrição
            { width: 15 }, // Quant.
            { width: 20 }, // Vencimentos
            { width: 20 }  // Descontos
        ];

        // Header
        worksheet.addRow([company.name.toUpperCase()]).font = { bold: true, size: 14, color: { argb: 'FF1D4ED8' } };
        worksheet.addRow([company.address.toUpperCase()]).font = { size: 9, color: { argb: 'FF64748B' } };
        worksheet.addRow([`NIF: ${company.nif}`]).font = { size: 9, color: { argb: 'FF64748B' } };
        worksheet.addRow([]);

        const titleRow = worksheet.addRow(["RECIBO DE VENCIMENTO", "", "", `${meses[mes]} / ${ano}`]);
        titleRow.font = { bold: true, size: 12 };
        worksheet.mergeCells(`A${titleRow.number}:C${titleRow.number}`);
        titleRow.getCell(1).alignment = { horizontal: 'left' };
        titleRow.getCell(4).alignment = { horizontal: 'right' };

        worksheet.addRow([]);

        // Employee Info
        const infoStartRow = worksheet.addRow(["COLABORADOR:", funcionario.nome.toUpperCase()]);
        infoStartRow.getCell(1).font = { bold: true, size: 9 };
        worksheet.addRow(["BI:", funcionario.bi_documento]).getCell(1).font = { size: 9 };
        worksheet.addRow(["CARGO:", (funcionario.cargo?.nome || '---').toUpperCase()]).getCell(1).font = { size: 9 };
        worksheet.addRow([]);

        // Table Header
        const headerRow = worksheet.addRow(["DESCRIÇÃO", "QUANT.", "VENCIMENTOS", "DESCONTOS"]);
        headerRow.eachCell(cell => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.alignment = { horizontal: 'center' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        // Table Body
        const addDataRow = (desc: string, qty: string, v: number, d: number, color?: string) => {
            const row = worksheet.addRow([desc, qty, v || null, d || null]);
            row.eachCell((cell, colNumber) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                if (colNumber >= 3) {
                    cell.numFmt = '#,##0.00 "kz"';
                    cell.alignment = { horizontal: 'right' };
                }
                if (color) cell.font = { color: { argb: color }, bold: true };
            });
            return row;
        };

        addDataRow("Salário Base Mensal", "30 D", Number(salario_base), 0);
        if (Number(total_subsidios_tributaveis) > 0) addDataRow("Subsídios Tributáveis", "1", Number(total_subsidios_tributaveis), 0);
        if (Number(total_subsidios_isentos) > 0) addDataRow("Subsídios Isentos", "1", Number(total_subsidios_isentos), 0);
        if (Number(total_horas_extras) > 0) addDataRow("Horas Extras / Ajustes", "---", Number(total_horas_extras), 0);
        if (Number(total_faltas) > 0) addDataRow("Faltas Injustificadas", "---", 0, Number(total_faltas), 'FFE11D48');

        addDataRow("Segurança Social (3%)", "3%", 0, Number(inss_trabalhador), 'FFD97706');
        addDataRow("Imposto IRT", "Var.", 0, Number(irt_devido), 'FFE11D48');

        // Footer / Total
        worksheet.addRow([]);
        const totalRow = worksheet.addRow(["LÍQUIDO A RECEBER", "", "", Number(liquido_receber)]);
        worksheet.mergeCells(`A${totalRow.number}:C${totalRow.number}`);
        totalRow.getCell(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
        totalRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF10B981' } };
        totalRow.getCell(1).alignment = { horizontal: 'right' };

        totalRow.getCell(4).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
        totalRow.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF10B981' } };
        totalRow.getCell(4).numFmt = '#,##0.00 "kz"';
        totalRow.getCell(4).alignment = { horizontal: 'right' };

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `Recibo_${funcionario.nome.replace(/\s+/g, '_')}_${meses[mes]}.xlsx`);
    }

    private static async exportPayrollReceiptWord(data: any, company: any) {
        const { funcionario, mes, ano, salario_base, total_subsidios_tributaveis, total_subsidios_isentos, total_horas_extras, total_faltas, inss_trabalhador, irt_devido, liquido_receber } = data;

        const createTableCell = (content: string, options: any = {}) => {
            return new TableCell({
                children: [new Paragraph({
                    children: [new TextRun({ text: content, ...options.textOptions })],
                    alignment: options.alignment || AlignmentType.LEFT,
                })],
                shading: options.shading,
                verticalAlign: options.verticalAlign || 'center',
                margins: { top: 100, bottom: 100, left: 100, right: 100 }
            });
        };

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // Header
                    new Paragraph({
                        children: [new TextRun({ text: company.name.toUpperCase(), bold: true, size: 28, color: "1D4ED8" })],
                    }),
                    new Paragraph({
                        children: [new TextRun({ text: company.address, size: 18, color: "64748B" })],
                    }),
                    new Paragraph({
                        children: [new TextRun({ text: `NIF: ${company.nif}`, size: 18, color: "64748B" })],
                    }),
                    new Paragraph({ text: "" }),

                    new Paragraph({
                        children: [new TextRun({ text: "RECIBO DE VENCIMENTO", bold: true, size: 24, color: "1E293B" })],
                        alignment: AlignmentType.CENTER
                    }),
                    new Paragraph({
                        children: [new TextRun({ text: `Período: ${meses[mes]} / ${ano}`, size: 20, color: "64748B" })],
                        alignment: AlignmentType.CENTER
                    }),
                    new Paragraph({ text: "" }),

                    // Employee Info
                    new Paragraph({
                        children: [
                            new TextRun({ text: "COLABORADOR: ", bold: true, size: 20 }),
                            new TextRun({ text: funcionario.nome.toUpperCase(), size: 20, color: "1D4ED8", bold: true })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "BI: ", bold: true, size: 18 }),
                            new TextRun({ text: funcionario.bi_documento, size: 18 })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "CARGO: ", bold: true, size: 18 }),
                            new TextRun({ text: (funcionario.cargo?.nome || '---').toUpperCase(), size: 18 })
                        ]
                    }),
                    new Paragraph({ text: "" }),

                    // Main Table
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            // Table Header
                            new TableRow({
                                children: [
                                    createTableCell("DESCRIÇÃO", { shading: { fill: "1E293B" }, textOptions: { bold: true, color: "FFFFFF", size: 18 } }),
                                    createTableCell("QUANT.", { shading: { fill: "1E293B" }, textOptions: { bold: true, color: "FFFFFF", size: 18 }, alignment: AlignmentType.CENTER }),
                                    createTableCell("VENCIMENTOS", { shading: { fill: "1E293B" }, textOptions: { bold: true, color: "FFFFFF", size: 18 }, alignment: AlignmentType.RIGHT }),
                                    createTableCell("DESCONTOS", { shading: { fill: "1E293B" }, textOptions: { bold: true, color: "FFFFFF", size: 18 }, alignment: AlignmentType.RIGHT }),
                                ]
                            }),
                            // Table Content
                            new TableRow({
                                children: [
                                    createTableCell("Salário Base Mensal"),
                                    createTableCell("30 D", { alignment: AlignmentType.CENTER }),
                                    createTableCell(formatCurrency(Number(salario_base)), { alignment: AlignmentType.RIGHT }),
                                    createTableCell("---", { alignment: AlignmentType.RIGHT, textOptions: { color: "CBD5E1" } }),
                                ]
                            }),
                            ...(Number(total_subsidios_tributaveis) > 0 ? [new TableRow({
                                children: [
                                    createTableCell("Subsídios Tributáveis"),
                                    createTableCell("1", { alignment: AlignmentType.CENTER }),
                                    createTableCell(formatCurrency(Number(total_subsidios_tributaveis)), { alignment: AlignmentType.RIGHT }),
                                    createTableCell("---", { alignment: AlignmentType.RIGHT, textOptions: { color: "CBD5E1" } }),
                                ]
                            })] : []),
                            ...(Number(total_subsidios_isentos) > 0 ? [new TableRow({
                                children: [
                                    createTableCell("Subsídios Isentos"),
                                    createTableCell("1", { alignment: AlignmentType.CENTER }),
                                    createTableCell(formatCurrency(Number(total_subsidios_isentos)), { alignment: AlignmentType.RIGHT }),
                                    createTableCell("---", { alignment: AlignmentType.RIGHT, textOptions: { color: "CBD5E1" } }),
                                ]
                            })] : []),
                            ...(Number(total_horas_extras) > 0 ? [new TableRow({
                                children: [
                                    createTableCell("Horas Extras / Ajustes"),
                                    createTableCell("---", { alignment: AlignmentType.CENTER }),
                                    createTableCell(formatCurrency(Number(total_horas_extras)), { alignment: AlignmentType.RIGHT }),
                                    createTableCell("---", { alignment: AlignmentType.RIGHT, textOptions: { color: "CBD5E1" } }),
                                ]
                            })] : []),
                            ...(Number(total_faltas) > 0 ? [new TableRow({
                                children: [
                                    createTableCell("Faltas Injustificadas", { textOptions: { color: "E11D48" } }),
                                    createTableCell("---", { alignment: AlignmentType.CENTER }),
                                    createTableCell("---", { alignment: AlignmentType.RIGHT, textOptions: { color: "CBD5E1" } }),
                                    createTableCell(`(${formatCurrency(Number(total_faltas))})`, { alignment: AlignmentType.RIGHT, textOptions: { color: "E11D48", bold: true } }),
                                ]
                            })] : []),

                            new TableRow({
                                children: [
                                    createTableCell("Segurança Social (3%)", { textOptions: { color: "D97706" } }),
                                    createTableCell("3%", { alignment: AlignmentType.CENTER }),
                                    createTableCell("---", { alignment: AlignmentType.RIGHT, textOptions: { color: "CBD5E1" } }),
                                    createTableCell(formatCurrency(Number(inss_trabalhador)), { alignment: AlignmentType.RIGHT, textOptions: { color: "D97706", bold: true } }),
                                ]
                            }),
                            new TableRow({
                                children: [
                                    createTableCell("Imposto IRT", { textOptions: { color: "E11D48" } }),
                                    createTableCell("Var.", { alignment: AlignmentType.CENTER }),
                                    createTableCell("---", { alignment: AlignmentType.RIGHT, textOptions: { color: "CBD5E1" } }),
                                    createTableCell(formatCurrency(Number(irt_devido)), { alignment: AlignmentType.RIGHT, textOptions: { color: "E11D48", bold: true } }),
                                ]
                            }),

                            // Footer / Net Pay
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 2,
                                        children: [new Paragraph({
                                            children: [new TextRun({ text: "LÍQUIDO A RECEBER ▸", bold: true, color: "FFFFFF", size: 20 })],
                                            alignment: AlignmentType.RIGHT
                                        })],
                                        shading: { fill: "10B981" },
                                        margins: { top: 200, bottom: 200, right: 100 }
                                    }),
                                    new TableCell({
                                        columnSpan: 2,
                                        children: [new Paragraph({
                                            children: [new TextRun({ text: formatCurrency(Number(liquido_receber)), bold: true, color: "FFFFFF", size: 24 })],
                                            alignment: AlignmentType.RIGHT
                                        })],
                                        shading: { fill: "10B981" },
                                        margins: { top: 200, bottom: 200, right: 100 }
                                    }),
                                ]
                            })
                        ]
                    }),

                    new Paragraph({ text: "" }),
                    new Paragraph({ text: "" }),

                    // Signatures
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: 'none' }, bottom: { style: 'none' }, left: { style: 'none' }, right: { style: 'none' },
                            insideHorizontal: { style: 'none' }, insideVertical: { style: 'none' }
                        },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({ children: [new TextRun({ text: "__________________________", color: "64748B" })], alignment: AlignmentType.CENTER }),
                                            new Paragraph({ children: [new TextRun({ text: "Pelo Empregador", size: 16, color: "64748B" })], alignment: AlignmentType.CENTER })
                                        ]
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ children: [new TextRun({ text: "__________________________", color: "64748B" })], alignment: AlignmentType.CENTER }),
                                            new Paragraph({ children: [new TextRun({ text: "O Colaborador", size: 16, color: "64748B" })], alignment: AlignmentType.CENTER })
                                        ]
                                    }),
                                ]
                            })
                        ]
                    })
                ]
            }]
        });

        const buffer = await Packer.toBlob(doc);
        saveAs(buffer, `Recibo_${funcionario.nome.replace(/\s+/g, '_')}_${meses[mes]}.docx`);
    }

    private static async exportModelBExcel(relatorio: any, mes: number, ano: number, company: any) {
        if (!relatorio || !relatorio.folhas) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Folha de Salário");

        // Set column widths
        worksheet.columns = [
            { width: 5 },  // Nº
            { width: 15 }, // DATA
            { width: 35 }, // NOME
            { width: 25 }, // FUNÇÃO
            { width: 15 }, // DIAS TRABALHADOS
            { width: 18 }, // SALÁRIO DIÁRIO
            { width: 18 }, // SUBSÍDIO DE COMUNICA
            { width: 18 }, // SALÁRIO
            { width: 15 }, // INSS (3%)
            { width: 15 }, // IRT
            { width: 18 }, // A PAGAR
            { width: 25 }  // IBAN
        ];

        // Headers following image Model B standard
        const headers = ["Nº", "DATA", "NOME", "FUNÇÃO", "DIAS TRAB.", "SAL. DIÁRIO", "SUB. COM.", "SALÁRIO", "INSS", "IRT", "A PAGAR", "IBAN"];
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } }; // Navy Blue
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        const processingDate = new Date(ano, mes, 0).toLocaleDateString('pt-PT');

        relatorio.folhas.forEach((f: any, idx: number) => {
            const salaryBase = Number(f.salario_base);
            const dailySalary = salaryBase / 22;
            const daysWorked = 22 - (f.faltas_count || 0);
            const commAllowance = Number(f.total_subsidios_tributaveis);

            const rowData = [
                idx + 1,
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
            const isEven = idx % 2 === 0;

            row.eachCell((cell, colNumber) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                if (!isEven) {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } }; // Light slate
                }

                if (colNumber >= 6 && colNumber <= 11) {
                    cell.numFmt = '#,##0.00 "kz"';
                    cell.alignment = { horizontal: 'right' };
                }
            });
        });

        // Total Row
        const totalRow = worksheet.addRow([
            "TOTAIS",
            "",
            "",
            "",
            "",
            "",
            "",
            Number(relatorio.resumo.totalBase),
            Number(relatorio.resumo.totalINSS),
            Number(relatorio.resumo.totalIRT),
            Number(relatorio.resumo.totalLiquid),
            ""
        ]);

        totalRow.eachCell((cell, colNumber) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF10B981' } }; // Emerald
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            if (colNumber >= 8 && colNumber <= 11) {
                cell.numFmt = '#,##0.00 "kz"';
                cell.alignment = { horizontal: 'right' };
            }
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `Folha_Salarial_${meses[mes]}_${ano}.xlsx`);
    }

    private static async exportModelBPDF(relatorio: any, mes: number, ano: number, company: any) {
        if (!relatorio || !relatorio.folhas) return;
        const doc = new jsPDF({ orientation: "landscape" });

        const startY = await this.drawStandardHeader(doc, company, `FOLHA DE SALÁRIO - ${meses[mes].toUpperCase()} / ${ano}`);

        // Date as in Model B (last day of month)
        const processingDate = new Date(ano, mes, 0).toLocaleDateString('pt-PT');
        doc.setFontSize(10);
        doc.text(`Data Processamento: ${processingDate}`, 280, startY - 15, { align: 'right' });

        const columns = ["Nº", "DATA", "NOME", "FUNÇÃO", "DIAS TRAB.", "SAL. DIÁRIO", "SUB. COM.", "SALÁRIO", "INSS", "IRT", "A PAGAR", "IBAN"];

        const tableBody = relatorio.folhas.map((f: any, idx: number) => {
            const salaryBase = Number(f.salario_base);
            const dailySalary = salaryBase / 22;
            const daysWorked = 22 - (f.faltas_count || 0);
            const commAllowance = Number(f.total_subsidios_tributaveis);

            return [
                (idx + 1).toString(),
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
            startY: startY,
            head: [columns],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42], fontSize: 7 },
            styles: { fontSize: 6, cellPadding: 1.5 },
            columnStyles: {
                9: { fontStyle: 'bold', textColor: [22, 163, 74] } // A PAGAR in Greenish
            },
            foot: [[
                { content: 'TOTAIS', colSpan: 7, styles: { halign: 'right', fontStyle: 'bold', fillColor: [241, 245, 249], textColor: [0, 0, 0] } },
                { content: formatCurrency(Number(relatorio.resumo.totalBase) || 0), styles: { halign: 'right', fontStyle: 'bold', fillColor: [241, 245, 249], textColor: [0, 0, 0] } },
                { content: formatCurrency(Number(relatorio.resumo.totalINSS) || 0), styles: { halign: 'right', fontStyle: 'bold', fillColor: [241, 245, 249], textColor: [0, 0, 0] } },
                { content: formatCurrency(Number(relatorio.resumo.totalIRT) || 0), styles: { halign: 'right', fontStyle: 'bold', fillColor: [241, 245, 249], textColor: [0, 0, 0] } },
                { content: formatCurrency(Number(relatorio.resumo.totalLiquid) || 0), styles: { halign: 'right', fontStyle: 'bold', fillColor: [226, 232, 240], textColor: [0, 0, 0] } },
                { content: '', styles: { fillColor: [241, 245, 249] } }
            ]]
        });

        doc.save(`Folha_Salarial_${meses[mes]}_${ano}.pdf`);
    }

    private static exportLegalMapCSV(relatorio: any, type: 'IRT' | 'INSS' | 'FERIAS' | 'FALTAS', mes: number, ano: number) {
        if (!relatorio) return;

        let csvContent = "\uFEFF"; // BOM for Excel UTF-8

        if (type === 'IRT') {
            const items = relatorio.linhas || [];
            csvContent += "NOME,NIF,REND. BRUTO,MAT. COLECTÁVEL,IRT RETIDO\n";
            items.forEach((l: any) => {
                csvContent += `"${l.funcionario?.nome || ''}","${l.funcionario?.nif || ''}",${l.rendimento_bruto || 0},${l.materia_colectavel || 0},${l.irt_retido || 0}\n`;
            });
        } else if (type === 'INSS') {
            const items = relatorio.linhas || [];
            csvContent += "NOME,NUMERO INSS,BASE INCIDÊNCIA,TRABALHADOR(3%),EMPRESA(8%),TOTAL(11%)\n";
            items.forEach((l: any) => {
                csvContent += `"${l.funcionario?.nome || ''}","${l.funcionario?.numero_inss || ''}",${l.base_incidencia || 0},${l.trabalhador_3 || 0},${l.empresa_8 || 0},${l.total_11 || 0}\n`;
            });
        } else if (type === 'FERIAS') {
            const items = relatorio.emFerias || [];
            csvContent += "NOME,CARGO,INÍCIO,FIM,DIAS ÚTEIS\n";
            items.forEach((f: any) => {
                csvContent += `"${f.funcionario?.nome || ''}","${f.funcionario?.cargo?.nome || ''}",${f.data_inicio || ''},${f.data_fim || ''},${f.dias_uteis || 0}\n`;
            });
        } else if (type === 'FALTAS') {
            const items = relatorio.faltas || [];
            csvContent += "DATA,NOME,CLASSIFICAÇÃO,OBSERVAÇÕES\n";
            items.forEach((f: any) => {
                const status = f.status === 'FALTA_I' ? 'INJUSTIFICADA' : 'JUSTIFICADA';
                csvContent += `${f.data || ''},"${f.funcionario?.nome || ''}","${status}","${f.observacao || ''}"\n`;
            });
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `MAPA_${type}_${mes}_${ano}.csv`);
    }

    private static async exportGenericTablePDF(data: any[][], title: string, columns: string[], filename: string, company: any) {
        const doc = new jsPDF();
        const startY = await this.drawStandardHeader(doc, company, title);

        // Generation Date
        const today = new Date().toLocaleDateString('pt-AO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // Slate-400
        doc.text(`Gerado em: ${today}`, 14, startY - 2);

        // Table
        const enumeratedData = data.map((row, idx) => [(idx + 1).toString(), ...row]);
        const enumeratedColumns = ["Nº", ...columns];

        autoTable(doc, {
            head: [enumeratedColumns],
            body: enumeratedData,
            startY: startY,
            styles: {
                fontSize: 7, // Smaller font to avoid breaks
                cellPadding: 2, // Tighter padding
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

        // Set column widths based on headers
        worksheet.columns = [
            { width: 8 }, // Nº
            ...columns.map(() => ({ width: 25 }))
        ];

        // Header
        const companyNameRow = worksheet.addRow([company.name.toUpperCase()]);
        companyNameRow.font = { bold: true, size: 14, color: { argb: 'FF1D4ED8' } };

        const titleRow = worksheet.addRow([title.toUpperCase()]);
        titleRow.font = { bold: true, size: 11 };

        worksheet.addRow([`Gerado em: ${new Date().toLocaleDateString('pt-AO')}`]).font = { size: 9, color: { argb: 'FF64748B' } };
        worksheet.addRow([]);

        // Table Header
        const headerRow = worksheet.addRow(["Nº", ...columns]);
        headerRow.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } }; // Slate-900
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        // Data
        data.forEach((rowData, idx) => {
            const row = worksheet.addRow([idx + 1, ...rowData]);
            const isEven = idx % 2 === 0;

            row.eachCell((cell) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                if (!isEven) {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
                }
                cell.alignment = { vertical: 'middle' };
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `${filename}.xlsx`);
    }
}
