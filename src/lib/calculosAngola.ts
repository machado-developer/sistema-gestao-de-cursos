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
 * @param base Rendimento bruto tributável
 */
export function calcularINSS(base: number) {
    const trabalhador = Math.round(base * 0.03 * 100) / 100;
    const empresa = Math.round(base * 0.08 * 100) / 100;
    return { trabalhador, empresa };
}

/**
 * Calcula o IRT (Imposto sobre o Rendimento do Trabalho) 
 * Estritamente baseado nos escalões fornecidos:
 * - Até 70.000 Kz → Isento
 * - 70.001 – 100.000 Kz → 10%
 * - 100.001 – 150.000 Kz → 13%
 * - 150.001 – 200.000 Kz → 16%
 * - 200.001 – 300.000 Kz → 18%
 * - Acima de 300.000 Kz → 19%
 */
export function calcularIRT(valor: number): number {
    if (valor <= 70000) return 0;

    let imposto = 0;

    // Escalão 1: 70.001 - 100.000 (30.000 de base)
    if (valor > 70000) {
        const excesso = Math.min(valor, 100000) - 70000;
        imposto += excesso * 0.10;
    }

    // Escalão 2: 100.001 - 150.000
    if (valor > 100000) {
        const excesso = Math.min(valor, 150000) - 100000;
        imposto += excesso * 0.13;
    }

    // Escalão 3: 150.001 - 200.000
    if (valor > 150000) {
        const excesso = Math.min(valor, 200000) - 150000;
        imposto += excesso * 0.16;
    }

    // Escalão 4: 200.001 - 300.000
    if (valor > 200000) {
        const excesso = Math.min(valor, 300000) - 200000;
        imposto += excesso * 0.18;
    }

    // Escalão 5: Acima de 300.000
    if (valor > 300000) {
        const excesso = valor - 300000;
        imposto += excesso * 0.19;
    }

    return Math.round(imposto * 100) / 100;
}

/**
 * Cálculo de horas extras com percentuais específicos
 */
export function calcularHorasExtras(
    salarioBase: number,
    horas: number,
    tipo: 0.5 | 1.0 | 0.25, // 50%, 100%, 25% (noturno)
    jornadaSemanal: number = 44
): number {
    // Cálculo do valor da hora (LGT Angola)
    const cargaHorariaMensal = (jornadaSemanal / 6) * 30; // ~220h
    const valorHora = salarioBase / cargaHorariaMensal;

    return horas * valorHora * (1 + tipo);
}

/**
 * Processamento completo do salário respeitando a ordem obrigatória:
 * Bruto -> Faltas -> INSS (Trabalhador) -> Base IRT -> IRT -> Líquido
 */
export function processarSalarioMensal(dados: {
    salarioBase: number;
    subsidiosTributaveis: number;
    subsidiosIsentos: number;
    horasExtras50?: number;
    horasExtras100?: number;
    horasNoturnas?: number;
    faltasNaoJustificadas?: number;
}): ResultadoProcessamento {
    const {
        salarioBase,
        subsidiosTributaveis,
        subsidiosIsentos,
        horasExtras50 = 0,
        horasExtras100 = 0,
        horasNoturnas = 0,
        faltasNaoJustificadas = 0
    } = dados;

    // 1. Horas Extras e Noturnas
    const valorHE50 = calcularHorasExtras(salarioBase, horasExtras50, 0.5);
    const valorHE100 = calcularHorasExtras(salarioBase, horasExtras100, 1.0);
    const valorNoturno = calcularHorasExtras(salarioBase, horasNoturnas, 0.25);
    const totalHE = valorHE50 + valorHE100 + valorNoturno;

    // 2. Salário Bruto Inicial (Base + Subsidios + HE)
    let rendimentoBruto = salarioBase + subsidiosTributaveis + totalHE;

    // 3. Desconto de faltas (Proporcional ao Salário Bruto / 30 por dia)
    const valorFalta = (salarioBase / 30) * faltasNaoJustificadas;

    // 4. Salário Bruto Ajustado (Após faltas)
    const brutoAjustado = rendimentoBruto - valorFalta;

    // 5. INSS (Incide sobre Bruto Ajustado)
    const inss = calcularINSS(brutoAjustado);

    // 6. Base IRT (Bruto Ajustado - INSS Trabalhador)
    const baseIrt = brutoAjustado - inss.trabalhador;

    // 7. IRT Progressive
    const irtValue = calcularIRT(baseIrt);

    // 8. Salário Líquido (Base IRT - IRT + Subsidios Isentos)
    const liquido = baseIrt - irtValue + subsidiosIsentos;

    return {
        salarioBase,
        totalSubsidiosTributaveis: subsidiosTributaveis,
        totalSubsidiosIsentos: subsidiosIsentos,
        totalHorasExtras: totalHE,
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
