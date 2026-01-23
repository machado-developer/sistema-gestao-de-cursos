import { prisma } from "@/lib/prisma";
import { processarSalarioMensal } from "@/lib/calculosAngola";

export class RHService {
    // --- Funcionários ---

    static async listarFuncionarios() {
        return await prisma.funcionario.findMany({
            include: {
                cargo: true,
                departamento: true,
                contratos: {
                    where: { status: "VIGENTE" },
                    take: 1
                }
            },
            orderBy: { nome: "asc" }
        });
    }

    static async obterFuncionario(id: string) {
        return await prisma.funcionario.findUnique({
            where: { id },
            include: {
                contratos: true,
                presencas: {
                    take: 30,
                    orderBy: { data: "desc" }
                },
                folhas: {
                    take: 12,
                    orderBy: { ano: "desc", mes: "desc" }
                }
            }
        });
    }

    static async criarFuncionario(dados: any) {
        const {
            nome,
            bi_documento,
            email,
            telefone,
            nif,
            numero_inss,
            cargoId,
            departamentoId,
            data_admissao,
            salario_base,
            subsidio_alimentacao,
            subsidio_transporte,
            ...resto
        } = dados;

        return await prisma.$transaction(async (tx) => {
            const dataAdmissao = new Date(data_admissao);

            const funcionario = await tx.funcionario.create({
                data: {
                    nome,
                    bi_documento,
                    email: email || null,
                    telefone,
                    nif: nif || null,
                    numero_inss: numero_inss || null,
                    cargoId,
                    departamentoId,
                    data_admissao: dataAdmissao,
                    status: "ATIVO"
                }
            });

            await tx.contrato.create({
                data: {
                    funcionarioId: funcionario.id,
                    tipo: "INDETERMINADO", // Default
                    data_inicio: dataAdmissao,
                    status: "VIGENTE",
                    salario_base: Number(salario_base || 0),
                    subsidio_alimentacao: Number(subsidio_alimentacao || 0),
                    subsidio_transporte: Number(subsidio_transporte || 0),
                    subsidio_residencia: 0,
                    outros_subsidios: 0
                }
            });

            return funcionario;
        });
    }

    // --- Contratos ---

    static async criarContrato(dados: any) {
        // Encerrar contrato vigente anterior se existir
        await prisma.contrato.updateMany({
            where: {
                funcionarioId: dados.funcionarioId,
                status: "VIGENTE"
            },
            data: { status: "ENCERRADO" }
        });

        return await prisma.contrato.create({
            data: dados
        });
    }

    // --- Presenças ---

    static async registarPresenca(dados: {
        funcionarioId: string;
        data: Date;
        status: string;
        entrada?: Date;
        saida?: Date;
        horas_normais?: number;
        horas_extras_50?: number;
        horas_extras_100?: number;
    }) {
        return await prisma.presencaHR.upsert({
            where: {
                funcionarioId_data: {
                    funcionarioId: dados.funcionarioId,
                    data: dados.data
                }
            },
            update: dados,
            create: dados
        });
    }

    // --- Processamento Salarial ---

    static async processarFolhaMensal(mes: number, ano: number) {
        const funcionarios = await prisma.funcionario.findMany({
            where: { status: "ATIVO" },
            include: {
                contratos: { where: { status: "VIGENTE" }, take: 1 },
                presencas: {
                    where: {
                        data: {
                            gte: new Date(ano, mes - 1, 1),
                            lt: new Date(ano, mes, 1)
                        }
                    }
                }
            }
        });

        const resultados = [];

        for (const func of funcionarios) {
            if (func.contratos.length === 0) continue;

            const contrato = func.contratos[0];

            // Consolidar presenças do mês
            let totalHE50 = 0;
            let totalHE100 = 0;
            let totalNoturnas = 0;
            let totalFaltas = 0;

            func.presencas.forEach(p => {
                totalHE50 += p.horas_extras_50 || 0;
                totalHE100 += p.horas_extras_100 || 0;
                totalNoturnas += p.horas_noturnas || 0;
                if (p.status === "FALTA_I") totalFaltas++;
            });

            // Executar cálculo angolano
            const calc = processarSalarioMensal({
                salarioBase: Number(contrato.salario_base),
                subsidiosTributaveis: Number(contrato.subsidio_alimentacao || 0) + Number(contrato.subsidio_transporte || 0),
                subsidiosIsentos: Number(contrato.subsidio_residencia || 0) + Number(contrato.outros_subsidios || 0),
                horasExtras50: totalHE50,
                horasExtras100: totalHE100,
                horasNoturnas: totalNoturnas,
                faltasNaoJustificadas: totalFaltas
            });

            // Persistir folha
            const folha = await prisma.folhaPagamento.upsert({
                where: {
                    funcionarioId_mes_ano: {
                        funcionarioId: func.id,
                        mes,
                        ano
                    }
                },
                update: {
                    salario_base: calc.salarioBase,
                    total_subsidios_tributaveis: calc.totalSubsidiosTributaveis,
                    total_subsidios_isentos: calc.totalSubsidiosIsentos,
                    total_horas_extras: calc.totalHorasExtras,
                    total_faltas: calc.totalFaltas,
                    base_inss: calc.baseInss,
                    inss_trabalhador: calc.inssTrabalhador,
                    inss_empresa: calc.inssEmpresa,
                    base_irt: calc.baseIrt,
                    irt_devido: calc.irt,
                    liquido_receber: calc.liquido,
                    status: "PROCESSADO"
                },
                create: {
                    funcionarioId: func.id,
                    mes,
                    ano,
                    salario_base: calc.salarioBase,
                    total_subsidios_tributaveis: calc.totalSubsidiosTributaveis,
                    total_subsidios_isentos: calc.totalSubsidiosIsentos,
                    total_horas_extras: calc.totalHorasExtras,
                    total_faltas: calc.totalFaltas,
                    base_inss: calc.baseInss,
                    inss_trabalhador: calc.inssTrabalhador,
                    inss_empresa: calc.inssEmpresa,
                    base_irt: calc.baseIrt,
                    irt_devido: calc.irt,
                    liquido_receber: calc.liquido,
                    status: "PROCESSADO"
                }
            });

            resultados.push(folha);
        }

        return resultados;
    }

    static async obterFolhaPorId(id: string) {
        return await prisma.folhaPagamento.findUnique({
            where: { id },
            include: {
                funcionario: {
                    include: {
                        cargo: true,
                        departamento: true
                    }
                }
            }
        });
    }

    static async obterRelatorioMensal(mes: number, ano: number) {
        const folhas = await prisma.folhaPagamento.findMany({
            where: { mes, ano },
            include: { funcionario: { select: { nome: true, bi_documento: true, numero_inss: true } } }
        });

        const totalLiquid = folhas.reduce((acc, f) => acc + Number(f.liquido_receber), 0);
        const totalIRT = folhas.reduce((acc, f) => acc + Number(f.irt_devido), 0);
        const totalINSS_T = folhas.reduce((acc, f) => acc + Number(f.inss_trabalhador), 0);
        const totalINSS_E = folhas.reduce((acc, f) => acc + Number(f.inss_empresa), 0);

        return {
            folhas,
            resumo: {
                totalLiquid,
                totalIRT,
                totalINSS_T,
                totalINSS_E,
                totalEncargosSociais: totalINSS_T + totalINSS_E,
                totalColaboradores: folhas.length
            }
        };
    }

    static async getDashboardStats() {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const [
            totalFuncionarios,
            contratosAtivos,
            solicitacoesFerias,
            folhaMesAnterior,
            presencasHoje
        ] = await Promise.all([
            prisma.funcionario.count({ where: { status: "ATIVO" } }),
            prisma.contrato.count({ where: { status: "VIGENTE" } }),
            prisma.feriasSolicitacao.count({
                where: {
                    data_inicio: { gte: firstDayOfMonth },
                    status: "APROVADO"
                }
            }),
            prisma.folhaPagamento.aggregate({
                where: {
                    mes: now.getMonth() || 12, // Mês anterior (simplificado)
                    ano: now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
                },
                _sum: { liquido_receber: true }
            }),
            prisma.presencaHR.count({
                where: {
                    data: { gte: today },
                    status: "PRESENTE"
                }
            })
        ]);

        return {
            totalFuncionarios,
            contratosAtivos,
            feriasEsteMes: solicitacoesFerias,
            totalFolha: Number(folhaMesAnterior._sum.liquido_receber || 0),
            presencasHoje
        };
    }

    // --- Departamentos ---

    static async listarDepartamentos() {
        return await prisma.departamento.findMany({
            include: {
                _count: { select: { funcionarios: true, cargos: true } },
                cargos: true
            },
            orderBy: { nome: "asc" }
        });
    }

    static async criarDepartamento(dados: any) {
        const { id, ...cleanData } = dados;
        const finalData = id ? dados : cleanData;
        return await prisma.departamento.create({ data: finalData });
    }

    static async atualizarDepartamento(id: string, dados: any) {
        return await prisma.departamento.update({ where: { id }, data: dados });
    }

    static async eliminarDepartamento(id: string) {
        return await prisma.departamento.delete({ where: { id } });
    }

    // --- Cargos ---

    static async listarCargos() {
        return await prisma.cargo.findMany({
            include: {
                _count: { select: { funcionarios: true } },
                departamento: true
            },
            orderBy: { nome: "asc" }
        });
    }

    static async criarCargo(dados: any) {
        const { id, ...cleanData } = dados;
        const finalData = id ? dados : cleanData;
        return await prisma.cargo.create({ data: finalData });
    }

    static async atualizarCargo(id: string, dados: any) {
        return await prisma.cargo.update({ where: { id }, data: dados });
    }

    static async eliminarCargo(id: string) {
        return await prisma.cargo.delete({ where: { id } });
    }

    // --- Relatórios Legais ---

    static async getRelatorioINSS(mes: number, ano: number) {
        const folhas = await prisma.folhaPagamento.findMany({
            where: { mes, ano },
            include: { funcionario: { select: { nome: true, numero_inss: true, bi_documento: true } } }
        });

        const linhas = folhas.map(f => ({
            funcionario: f.funcionario,
            base_incidencia: Number(f.base_inss),
            trabalhador_3: Number(f.inss_trabalhador),
            empresa_8: Number(f.inss_empresa),
            total_11: Number(f.inss_trabalhador) + Number(f.inss_empresa)
        }));

        const totais = linhas.reduce((acc, curr) => ({
            base: acc.base + curr.base_incidencia,
            trabalhador: acc.trabalhador + curr.trabalhador_3,
            empresa: acc.empresa + curr.empresa_8,
            total: acc.total + curr.total_11
        }), { base: 0, trabalhador: 0, empresa: 0, total: 0 });

        return { linhas, totais };
    }

    static async getRelatorioIRT(mes: number, ano: number) {
        const folhas = await prisma.folhaPagamento.findMany({
            where: { mes, ano },
            include: { funcionario: { select: { nome: true, nif: true, bi_documento: true } } }
        });

        const linhas = folhas.map(f => ({
            funcionario: f.funcionario,
            rendimento_bruto: Number(f.salario_base) + Number(f.total_subsidios_tributaveis) + Number(f.total_horas_extras),
            materia_colectavel: Number(f.base_irt),
            irt_retido: Number(f.irt_devido)
        }));

        const totalIRT = linhas.reduce((acc, curr) => acc + curr.irt_retido, 0);

        return { linhas, totalIRT };
    }

    static async getRelatorioFerias(mes: number, ano: number) {
        const emFerias = await prisma.feriasSolicitacao.findMany({
            where: {
                data_inicio: {
                    gte: new Date(ano, mes - 1, 1),
                    lte: new Date(ano, mes, 0)
                },
                status: "APROVADO"
            },
            include: { funcionario: { select: { nome: true, cargo: { select: { nome: true } } } } }
        });

        return { emFerias };
    }

    static async getRelatorioFaltas(mes: number, ano: number) {
        const faltas = await prisma.presencaHR.findMany({
            where: {
                data: {
                    gte: new Date(ano, mes - 1, 1),
                    lt: new Date(ano, mes, 1)
                },
                status: { in: ["FALTA_J", "FALTA_I"] }
            },
            include: { funcionario: { select: { nome: true } } },
            orderBy: { data: 'asc' }
        });

        return { faltas };
    }
}
