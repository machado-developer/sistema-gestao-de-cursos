import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 10, fontFamily: "Helvetica" },
    header: { marginBottom: 20, borderBottomWidth: 1, paddingBottom: 10 },
    companyName: { fontSize: 14, fontWeight: "bold" },
    title: { fontSize: 16, textAlign: "center", marginVertical: 10, textDecoration: "underline" },
    section: { marginVertical: 10 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
    label: { fontWeight: "bold" },
    divider: { borderBottomWidth: 0.5, marginVertical: 10, borderColor: "#ccc" },
    totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingTop: 5, borderTopWidth: 1 },
    bold: { fontWeight: "bold" }
});

export const SalarySlipPDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.companyName}>SISTEMA DE GESTÃO - RH</Text>
                <Text>Luanda, Angola</Text>
            </View>

            <Text style={styles.title}>RECIBO DE SALÁRIO</Text>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text><Text style={styles.label}>Funcionário: </Text>{data.funcionario.nome}</Text>
                    <Text><Text style={styles.label}>Mês/Ano: </Text>{data.mes}/{data.ano}</Text>
                </View>
                <View style={styles.row}>
                    <Text><Text style={styles.label}>Cargo: </Text>{data.funcionario.cargo}</Text>
                    <Text><Text style={styles.label}>Nº INSS: </Text>{data.funcionario.numero_inss}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={[styles.label, { marginBottom: 5 }]}>VENCIMENTOS E SUBSÍDIOS</Text>
                <View style={styles.row}>
                    <Text>Salário Base</Text>
                    <Text>{Number(data.salario_base).toLocaleString()} Kz</Text>
                </View>
                <View style={styles.row}>
                    <Text>Subsídios Tributáveis</Text>
                    <Text>{Number(data.total_subsidios_tributaveis).toLocaleString()} Kz</Text>
                </View>
                <View style={styles.row}>
                    <Text>Horas Extras</Text>
                    <Text>{Number(data.total_horas_extras).toLocaleString()} Kz</Text>
                </View>
                <View style={styles.row}>
                    <Text>Subsídios Isentos</Text>
                    <Text>{Number(data.total_subsidios_isentos).toLocaleString()} Kz</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={[styles.label, { marginBottom: 5 }]}>DESCONTOS</Text>
                <View style={styles.row}>
                    <Text>INSS (3%)</Text>
                    <Text>-{Number(data.inss_trabalhador).toLocaleString()} Kz</Text>
                </View>
                <View style={styles.row}>
                    <Text>IRT</Text>
                    <Text>-{Number(data.irt_devido).toLocaleString()} Kz</Text>
                </View>
                <View style={styles.row}>
                    <Text>Faltas</Text>
                    <Text>-{Number(data.total_faltas).toLocaleString()} Kz</Text>
                </View>
            </View>

            <View style={styles.totalRow}>
                <Text style={styles.bold}>TOTAL LÍQUIDO A RECEBER</Text>
                <Text style={styles.bold}>{Number(data.liquido_receber).toLocaleString()} Kz</Text>
            </View>

            <View style={[styles.section, { marginTop: 100 }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={{ borderTopWidth: 1, width: 200, alignItems: "center", paddingTop: 5 }}>
                        <Text>A Empresa</Text>
                    </View>
                    <View style={{ borderTopWidth: 1, width: 200, alignItems: "center", paddingTop: 5 }}>
                        <Text>O Funcionário</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);
