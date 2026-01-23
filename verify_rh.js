const { processarSalarioMensal } = require('./src/lib/calculosAngola');

// Mock data for tests
const tests = [
    { salario: 70000, nome: "Isento (Limite)" },
    { salario: 150000, nome: "Escalão Médio" },
    { salario: 500000, nome: "Escalão Alto" },
    { salario: 1500000, nome: "Escalão Muito Alto" }
];

console.log("=== VERIFICAÇÃO DE CÁLCULOS (ANGOLA) ===\n");

tests.forEach(t => {
    const result = processarSalarioMensal({
        salarioBase: t.salario,
        subsidiosTributaveis: 0,
        subsidiosIsentos: 0
    });

    console.log(`Teste: ${t.nome}`);
    console.log(`Salário Bruto: ${result.rendimentoBruto.toLocaleString()} Kz`);
    console.log(`INSS (3%): ${result.inssTrabalhador.toLocaleString()} Kz`);
    console.log(`Base IRT: ${result.baseIrt.toLocaleString()} Kz`);
    console.log(`IRT Devido: ${result.irt.toLocaleString()} Kz`);
    console.log(`Salário Líquido: ${result.liquido.toLocaleString()} Kz`);
    console.log("------------------------------------------");
});
