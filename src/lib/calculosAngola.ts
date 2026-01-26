/**
 * Utilitários para cálculos laborais e fiscais de Angola
 * Adaptado estritamente às regras de negócio fornecidas pelo usuário.
 */

export interface ResultadoProcessamento {
    salarioBase: number;
    totalSubsidiosTributaveis: number;
    totalSubsidiosIsentos: number;
    totalHorasExtras: number;
    totalFaltas: number;
    rendimentoBruto: number;
    baseInss: number;
    inssTrabalhador: number; // 3%
    inssEmpresa: number;     // 8%
    baseIrt: number;
    irt: number;
    liquido: number;
}

/**
 * Calcula o INSS do trabalhador (3%) e da empresa (8%)
 */
export function calcularINSS(base: number) {
    const trabalhador = Math.round(base * 0.03 * 100) / 100;
    const empresa = Math.round(base * 0.08 * 100) / 100;
    return { trabalhador, empresa };
}

/**
 * Calcula o IRT (Imposto sobre o Rendimento do Trabalho) 
 * Baseado na tabela de IRT de Angola (Lei 12/23 e regulamentos atuais)
 */
export function calcularIRT(valor: number): number {
    if (valor <= 70000) return 0;

    let imposto = 0;

    if (valor > 70000) {
        const excesso = Math.min(valor, 100000) - 70000;
        imposto += excesso * 0.10;
    }
    if (valor > 100000) {
        const excesso = Math.min(valor, 150000) - 100000;
        imposto += excesso * 0.13;
    }
    if (valor > 150000) {
        const excesso = Math.min(valor, 200000) - 150000;
        imposto += excesso * 0.16;
    }
    if (valor > 200000) {
        const excesso = Math.min(valor, 300000) - 200000;
        imposto += excesso * 0.18;
    }
    if (valor > 300000) {
        const excesso = valor - 300000;
        imposto += excesso * 0.19;
    }

    return Math.round(imposto * 100) / 100;
}

/**
 * Cálculo de horas extras conforme LGT 12/23
 * - Dias Normais: 1ªs 30h (+50%), seguintes (+75%)
 * - Dias Descanso/Feriados: (+100%)
 */
export function calcularValorHorasExtras(
    salarioBase: number,
    horasNormaisExtras: number,
    horasDescansoExtras: number,
    jornadaSemanal: number = 44
): number {
    const valorHora = salarioBase / ((jornadaSemanal / 6) * 30);

    // Tiers para dias normais (LGT Art. 116)
    const he50 = Math.min(horasNormaisExtras, 30);
    const he75 = Math.max(0, horasNormaisExtras - 30);

    const valorHe50 = he50 * valorHora * 1.5;
    const valorHe75 = he75 * valorHora * 1.75;
    const valorHe100 = horasDescansoExtras * valorHora * 2.0;

    return valorHe50 + valorHe75 + valorHe100;
}

export function processarSalarioMensal(dados: {
    salarioBase: number;
    subsidiosTributaveis: number;
    subsidiosIsentos: number;
    horasExtrasNormais?: number;   // Horas em dias úteis
    horasExtrasDescanso?: number;  // Horas em fins de semana/feriados
    horasNoturnas?: number;        // Horas noturnas (21h-06h, +20%)
    faltasNaoJustificadas?: number;
}): ResultadoProcessamento {
    const {
        salarioBase,
        subsidiosTributaveis,
        subsidiosIsentos,
        horasExtrasNormais = 0,
        horasExtrasDescanso = 0,
        horasNoturnas = 0,
        faltasNaoJustificadas = 0
    } = dados;

    const valorHora = salarioBase / ((44 / 6) * 30);

    // 1. Horas Extras (50%, 75%, 100%)
    const totalHEValue = calcularValorHorasExtras(salarioBase, horasExtrasNormais, horasExtrasDescanso);

    // 2. Horas Noturnas (LGT Art. 166: +20%)
    const valorNoturno = horasNoturnas * valorHora * 0.20;

    // 3. Rendimento Bruto
    let rendimentoBruto = salarioBase + subsidiosTributaveis + totalHEValue + valorNoturno;

    // 4. Faltas
    const valorFalta = (salarioBase / 30) * faltasNaoJustificadas;
    const brutoAjustado = Math.max(0, rendimentoBruto - valorFalta);

    // 5. Impostos e Descontos
    const inss = calcularINSS(brutoAjustado);
    const baseIrt = brutoAjustado - inss.trabalhador;
    const irtValue = calcularIRT(baseIrt);

    // 6. Líquido
    const liquido = baseIrt - irtValue + subsidiosIsentos;

    return {
        salarioBase,
        totalSubsidiosTributaveis: subsidiosTributaveis,
        totalSubsidiosIsentos: subsidiosIsentos,
        totalHorasExtras: totalHEValue + valorNoturno,
        totalFaltas: valorFalta,
        rendimentoBruto: brutoAjustado,
        baseInss: brutoAjustado,
        inssTrabalhador: inss.trabalhador,
        inssEmpresa: inss.empresa,
        baseIrt,
        irt: irtValue,
        liquido
    };
}
