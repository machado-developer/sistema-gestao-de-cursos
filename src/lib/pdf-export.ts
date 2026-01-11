import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface GeneratePdfParams {
    title: string
    subtitle?: string
    columns: string[]
    data: (string | number)[][]
    filename: string
}

export const generatePdfTable = ({
    title,
    subtitle,
    columns,
    data,
    filename
}: GeneratePdfParams) => {
    const doc = new jsPDF()

    // Header Branding (Text for now, can be replaced with Logo image)
    doc.setFontSize(22)
    doc.setTextColor(15, 23, 42) // Slate-900 like
    doc.setFont('helvetica', 'bold')
    doc.text('NewTech Angola', 14, 20)

    // Report Title
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(51, 65, 85) // Slate-700
    doc.text(title, 14, 30)

    if (subtitle) {
        doc.setFontSize(10)
        doc.setTextColor(100, 116, 139) // Slate-500
        doc.text(subtitle, 14, 36)
    }

    // Generation Date
    const today = new Date().toLocaleDateString('pt-AO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184) // Slate-400
    doc.text(`Gerado em: ${today}`, 14, subtitle ? 42 : 36)

    // Table
    autoTable(doc, {
        head: [columns],
        body: data,
        startY: subtitle ? 48 : 42,
        styles: {
            fontSize: 9,
            cellPadding: 4,
            textColor: [51, 65, 85], // Slate-700
            lineColor: [226, 232, 240], // Slate-200
            lineWidth: 0.1,
        },
        headStyles: {
            fillColor: [15, 23, 42], // Slate-900 (matches app theme)
            textColor: 255,
            fontStyle: 'bold',
            halign: 'left',
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252], // Slate-50
        },
        columnStyles: {
            // Can be extended if we pass column config, for now generic
        },
        // Portuguese localization for default text if any (usually just numbers)
    })

    doc.save(`${filename}.pdf`)
}
