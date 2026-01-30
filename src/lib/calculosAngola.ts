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
 * Baseado na tabela de IRT de Angola conforme Lei n.º 14/25 (Tabela 2026)
 */
export function calcularIRT(valor: number): number {
    const escaloes = [
        { limite: 150000, fixa: 0, taxa: 0, excesso: 0 },
        { limite: 200000, fixa: 12500, taxa: 0.16, excesso: 150000 },
        { limite: 300000, fixa: 31250, taxa: 0.18, excesso: 200000 },
        { limite: 500000, fixa: 49250, taxa: 0.19, excesso: 300000 },
        { limite: 1000000, fixa: 87250, taxa: 0.20, excesso: 500000 },
        { limite: 1500000, fixa: 187250, taxa: 0.21, excesso: 1000000 },
        { limite: 2000000, fixa: 292250, taxa: 0.22, excesso: 1500000 },
        { limite: 2500000, fixa: 402250, taxa: 0.23, excesso: 2000000 },
        { limite: 5000000, fixa: 517250, taxa: 0.24, excesso: 2500000 },
        { limite: 10000000, fixa: 1117250, taxa: 0.245, excesso: 5000000 },
        { limite: Infinity, fixa: 2342250, taxa: 0.25, excesso: 10000000 },
    ];

    // Se o valor for menor ou igual ao limite de isenção
    if (valor <= 150000) return 0;

    // Encontra o escalão correspondente
    const escalao = escaloes.find(e => valor <= e.limite) || escaloes[escaloes.length - 1];

    const imposto = escalao.fixa + (valor - escalao.excesso) * escalao.taxa;

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

    return Math.round((valorHe50 + valorHe75 + valorHe100) * 100) / 100;

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
    const brutoAjustado = Math.round(Math.max(0, rendimentoBruto - valorFalta) * 100) / 100;

    // 5. Impostos e Descontos
    const inss = calcularINSS(brutoAjustado);
    const baseIrt = Math.round((brutoAjustado - inss.trabalhador) * 100) / 100;

    const irtValue = calcularIRT(baseIrt);

    // 6. Líquido
    const liquido = Math.round((baseIrt - irtValue + subsidiosIsentos) * 100) / 100;



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
