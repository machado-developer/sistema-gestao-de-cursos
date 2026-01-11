import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

// Register Alex Brush font
Font.register({
    family: 'Alex Brush',
    src: 'https://raw.githubusercontent.com/google/fonts/main/ofl/alexbrush/AlexBrush-Regular.ttf'
})

const styles = StyleSheet.create({
    page: {
        width: 842, // A4 Landscape
        height: 595,
        backgroundColor: '#fff',
        fontFamily: 'Helvetica'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 280 // Adjust based on the logo position in the background image
    },
    title: {
        fontSize: 24,
        color: '#1a4f8b', // Dark blue from image
        marginBottom: 10,
        fontFamily: 'Helvetica-Bold'
    },
    subtitle: {
        fontSize: 12,
        color: '#1a4f8b',
        marginBottom: 20,
        fontFamily: 'Helvetica-Bold',
        marginTop: 10,
        textTransform: 'uppercase'
    },
    studentName: {
        fontSize: 48, // Increased size for script font legibility
        color: '#1a4f8b',
        fontFamily: 'Alex Brush',
        marginBottom: 10,
        marginTop: 5
    },
    bodyText: {
        fontSize: 14,
        color: '#1a4f8b',
        textAlign: 'center',
        lineHeight: 1.5,
        maxWidth: 700,
        marginBottom: 30
    },
    bold: {
        fontFamily: 'Helvetica-Bold'
    },
    datePlace: {
        fontSize: 12,
        color: '#1a4f8b',
        fontFamily: 'Helvetica-Bold',
        marginBottom: 50
    },
    signatureLine: {
        width: 250,
        height: 1,
        backgroundColor: '#1a4f8b',
        marginBottom: 5
    },
    signatureName: {
        fontSize: 12,
        color: '#1a4f8b',
        fontFamily: 'Helvetica-Bold'
    },
    signatureRole: {
        fontSize: 10,
        color: '#1a4f8b',
        fontFamily: 'Helvetica'
    }
})

interface NewTechCertificateProps {
    data: any
    backgroundImage?: string
}

export const NewTechCertificateDocument = ({ data, backgroundImage }: NewTechCertificateProps) => {
    // Formatting Dates
    const formatDate = (date: string | Date) => {
        if (!date) return ''
        return new Date(date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })
    }

    const start = new Date(data.turma.data_inicio)
    const end = new Date(data.turma.data_fim)

    // Custom formatted date range "18 Maio a 19 Julho de 2024"
    const startStr = `${start.getDate()} ${start.toLocaleDateString('pt-PT', { month: 'long' })}`
    const endStr = `${end.getDate()} ${end.toLocaleDateString('pt-PT', { month: 'long' })} de ${end.getFullYear()}`

    // Issue Date
    const issueDate = new Date()
    const issueDateStr = `Luanda, aos ${issueDate.getDate()} de ${issueDate.toLocaleDateString('pt-PT', { month: 'long' })} de ${issueDate.getFullYear()}`

    // Use provided background or fallback to default
    const backgroundSrc = backgroundImage || "/images/certificate-bg.png"

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page} wrap={false}>
                <View style={{ width: 842, height: 595, position: 'relative' }}>
                    {/* Background Image */}
                    <Image
                        src={backgroundSrc}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: 842,
                            height: 595,
                            minWidth: 842,
                            minHeight: 595
                        }}
                    />

                    <View style={styles.content}>
                        {/* Student Name - Adjusted margin to account for removed title/subtitle */}
                        <Text style={styles.studentName}>{data.aluno.nome_completo}</Text>

                        {/* Body Text */}
                        <Text style={styles.bodyText}>
                            Portador(a) do BI nº <Text style={styles.bold}>{data.aluno.bi_documento}</Text>, concluiu com aproveitamento a{' '}
                            <Text style={styles.bold}>Formação/Estágio de {data.turma.curso.nome}</Text>, realizado no período de {startStr} a {endStr} e foi avaliada com uma nota de {data.media_final?.toFixed(0)} valores.
                        </Text>

                        {/* Date Place */}
                        <Text style={styles.datePlace}>{issueDateStr}</Text>

                        {/* Signature Area */}
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Text style={styles.signatureName}>Elsandro Lukenny Bento Bungo</Text>
                            <Text style={styles.signatureRole}>Diretor Técnico</Text>
                        </View>

                        {/* QR Code Validation */}
                        {data.qrCode && (
                            <View style={{ position: 'absolute', bottom: 40, left: 30, alignItems: 'center' }}>
                                <Image src={data.qrCode} style={{ width: 60, height: 60 }} />
                                <Text style={{ fontSize: 8, color: '#1a4f8b', marginTop: 4, fontFamily: 'Helvetica-Bold' }}>
                                    Código: {data.codigo_unico}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    )
}
