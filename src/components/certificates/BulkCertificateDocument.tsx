import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font
} from '@react-pdf/renderer'

// Define styles for absolute positioning over the background
const styles = StyleSheet.create({
    page: {
        width: 842,
        height: 595,
        position: 'relative',
        fontFamily: 'Helvetica',
        backgroundColor: '#fff'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
    },
    overlayContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
        paddingTop: 20
    },
    logo: {
        width: 180,
        height: 80,
        objectFit: 'contain',
        marginBottom: 10
    },
    certificateTitle: {
        fontSize: 26,
        fontFamily: 'Helvetica-Bold',
        color: '#004587',
        marginBottom: 15,
        textAlign: 'center'
    },
    statement: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        color: '#004587',
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 1
    },
    studentName: {
        fontSize: 40,
        fontFamily: 'Helvetica-BoldOblique',
        color: '#004587',
        marginBottom: 25,
        textAlign: 'center'
    },
    bodyText: {
        fontSize: 16,
        color: '#1f2937',
        textAlign: 'center',
        lineHeight: 1.8,
        maxWidth: 720,
        marginBottom: 30
    },
    bold: {
        fontFamily: 'Helvetica-Bold',
        color: '#004587'
    },
    footerContainer: {
        marginTop: 'auto',
        alignItems: 'center',
        width: '100%'
    },
    dateLocation: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        color: '#004587',
        marginBottom: 30
    },
    signatureLine: {
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#004587',
        marginBottom: 10
    },
    signatoryName: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: '#004587'
    },
    signatoryTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: '#004587',
        marginTop: 2
    }
})

interface CertificateData {
    id: string
    aluno: {
        nome_completo: string
        bi_documento: string
    }
    turma: {
        data_inicio: string
        data_fim: string
        curso: {
            nome: string
            carga_horaria: number
        }
    }
    media_final: number | null
}

interface BulkCertificateDocumentProps {
    certificates: CertificateData[]
}

export const BulkCertificateDocument = ({ certificates }: BulkCertificateDocumentProps) => (
    <Document>
        {certificates.map((cert) => {
            const startDate = new Date(cert.turma.data_inicio).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' })
            const endDate = new Date(cert.turma.data_fim).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
            const issueDate = new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
            const grade = cert.media_final ? cert.media_final.toFixed(0) : '---'

            return (
                <Page key={cert.id} size="A4" orientation="landscape" style={styles.page}>
                    {/* Background Image */}
                    <Image
                        src="/certificate-bg.png"
                        style={styles.background}
                    />

                    {/* Content Overlay */}
                    <View style={styles.overlayContainer}>
                        {/* Company Logo */}
                        <Image
                            src="/logo.png"
                            style={styles.logo}
                        />

                        {/* Title */}
                        <Text style={styles.certificateTitle}>
                            Certificado de conclusão de estágio
                        </Text>

                        {/* Statement */}
                        <Text style={styles.statement}>
                            A EMPRESA NEWTECH CERTIFICA QUE
                        </Text>

                        {/* Student Name */}
                        <Text style={styles.studentName}>
                            {cert.aluno.nome_completo}
                        </Text>

                        {/* Body Text */}
                        <Text style={styles.bodyText}>
                            Portador do BI <Text style={styles.bold}>nº{cert.aluno.bi_documento}</Text>, concluiu com aproveitamento a Formação {'\n'}
                            de <Text style={styles.bold}>{cert.turma.curso.nome}</Text>, realizado no período de <Text style={styles.bold}>{startDate} a {endDate}</Text> {'\n'}
                            e foi avaliado com uma nota de <Text style={styles.bold}>{grade}valores</Text>.
                        </Text>

                        {/* Footer / Signature Section */}
                        <View style={styles.footerContainer}>
                            <Text style={styles.dateLocation}>
                                Luanda, aos {issueDate}
                            </Text>

                            <View style={styles.signatureLine} />

                            <Text style={styles.signatoryName}>
                                Benjamim Manuel
                            </Text>
                            <Text style={styles.signatoryTitle}>
                                Diretor Técnico
                            </Text>
                        </View>
                    </View>
                </Page>
            )
        })}
    </Document>
)
