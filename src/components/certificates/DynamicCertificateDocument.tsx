import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font
} from '@react-pdf/renderer'

// Helper to get nested properties from object
const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null
    }, obj)
}

const styles = StyleSheet.create({
    page: {
        width: 842,
        height: 595,
        position: 'relative',
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
    field: {
        position: 'absolute'
    }
})

interface MappingField {
    x: number
    y: number
    fontSize: number
    fontFamily?: string
    color?: string
    align?: 'left' | 'center' | 'right'
    path: string // e.g., "aluno.nome_completo"
    uppercase?: boolean
    bold?: boolean
    italic?: boolean
}

interface DynamicCertificateDocumentProps {
    certificates: any[] // Array of data merged with issuance/template info
    template: {
        imageUrl: string
        mapping: string // JSON string
    }
}

export const DynamicCertificateDocument = ({ certificates, template }: DynamicCertificateDocumentProps) => {
    const mapping: MappingField[] = JSON.parse(template.mapping)

    /* 
       CRITICAL RULE: 
       Use the certificate template strictly as a background layer and never as a standalone page. 
       All text must be rendered on top of the same page.
    */
    return (
        <Document>
            {certificates.map((cert) => (
                <Page
                    key={cert.id}
                    size="A4"
                    orientation="landscape"
                    style={styles.page}
                    wrap={false} // Prevent automatic page breaks
                >
                    {/* CAMADA 1 (Base): Template Background */}
                    <Image
                        src={template.imageUrl}
                        style={styles.background}
                    />

                    {/* CAMADA 2 (Overlay): Dynamic Fields */}
                    {mapping.map((field, idx) => {
                        const rawValue = getNestedValue(cert, field.path)
                        let text = rawValue ? String(rawValue) : ''

                        if (field.uppercase) text = text.toUpperCase()

                        const fieldStyle: any = {
                            left: field.x,
                            top: field.y,
                            fontSize: field.fontSize || 12,
                            color: field.color || '#000',
                            textAlign: field.align || 'left',
                            width: field.align === 'center' ? (842 - field.x * 2) : 'auto', // Estimate center width
                            fontFamily: field.bold ? (field.italic ? 'Helvetica-BoldOblique' : 'Helvetica-Bold') : (field.italic ? 'Helvetica-Oblique' : 'Helvetica')
                        }

                        // If it's the QR code (special path)
                        if (field.path === 'qrCode') {
                            return (
                                <Image
                                    key={idx}
                                    src={cert.qrCode}
                                    style={[styles.field, { left: field.x, top: field.y, width: field.fontSize, height: field.fontSize }]}
                                />
                            )
                        }

                        return (
                            <View key={idx} style={[styles.field, fieldStyle]}>
                                <Text>{text}</Text>
                            </View>
                        )
                    })}
                </Page>
            ))}
        </Document>
    )
}
