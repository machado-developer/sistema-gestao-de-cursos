import { prisma } from "@/lib/prisma";
import { processarSalarioMensal } from "@/lib/calculosAngola";

export class RHService {
    // --- Funcionários ---

    static async listarFuncionarios() {
        return await prisma.funcionario.findMany({
            select: {
                id: true,
                nome: true,
                bi_documento: true,
                nif: true,
                email: true,
                telefone: true,
                status: true,
                departamentoId: true,
                cargoId: true,
                departamento: {
                    select: { nome: true }
                },
                cargo: {
                    select: { nome: true }
                },
                contratos: {
                    where: { status: "VIGENTE" },
                    take: 1,
                    select: {
                        tipo: true,
                        salario_base: true,
                        data_fim: true,
                        status: true
                    }
                }
            },
            orderBy: { nome: "asc" }
        });
    }

    static async obterFuncionario(id: string) {
        const funcionario = await prisma.funcionario.findUnique({
            where: { id },
            include: {
                cargo: true,
                departamento: true,
                documentos: true,
                contratos: {
                    orderBy: { data_inicio: 'desc' }
                },
                folhas: {
                    orderBy: [
                        { ano: 'desc' },
                        { mes: 'desc' }
                    ]
                }
            }
        });

        if (!funcionario) return null;

        // Achatar dados do contrato vigente para o formulário
        const contratoVigente = funcionario.contratos.find((c: { status: string; }) => c.status === "VIGENTE") || funcionario.contratos[0];

        return {
            ...funcionario,
            iban: funcionario.iban || "",
            tipo_contrato: contratoVigente?.tipo || "INDETERMINADO",
            data_fim: contratoVigente?.data_fim ? new Date(contratoVigente.data_fim).toISOString().split("T")[0] : "",
            renovacao_automatica: contratoVigente?.renovacao_automatica || false,
            salario_base: contratoVigente?.salario_base ? Number(contratoVigente.salario_base) : 0,
            subsidio_alimentacao: contratoVigente?.subsidio_alimentacao ? Number(contratoVigente.subsidio_alimentacao) : 0,
            subsidio_transporte: contratoVigente?.subsidio_transporte ? Number(contratoVigente.subsidio_transporte) : 0,
            subsidio_residencia: contratoVigente?.subsidio_residencia ? Number(contratoVigente.subsidio_residencia) : 0,
            outros_subsidios: contratoVigente?.outros_subsidios ? Number(contratoVigente.outros_subsidios) : 0,
            historico_contratos: funcionario.contratos, // Enviar todos os contratos para o histórico
            historico_pagamentos: funcionario.folhas, // Enviar todas as folhas de pagamento para o histórico
        };
    }

    static async criarFuncionario(dados: any) {
        const {
            nome,
            bi_documento,
            email,
            telefone,
            nif,
            iban,
            numero_inss,
            genero,
            data_nascimento,
            cargoId,
            departamentoId,
            data_admissao,
            tipo_contrato,
            data_fim,
            renovacao_automatica,
            salario_base,
            subsidio_alimentacao,
            subsidio_transporte,
            subsidio_residencia,
            outros_subsidios,
            hora_entrada,
            hora_saida,
            dias_trabalho,
            ...resto
        } = dados;

        return await prisma.$transaction(async (tx: { funcionario: { create: (arg0: { data: { nome: any; bi_documento: any; email: any; telefone: any; nif: any; iban: any; numero_inss: any; genero: any; data_nascimento: Date | null; cargo: { connect: { id: any; }; } | undefined; departamento: { connect: { id: any; }; } | undefined; data_admissao: Date; status: string; hora_entrada: any; hora_saida: any; dias_trabalho: any; }; }) => any; }; contrato: { create: (arg0: { data: { funcionarioId: any; tipo: any; data_inicio: Date; data_fim: Date | null; renovacao_automatica: boolean; status: string; salario_base: number; subsidio_alimentacao: number; subsidio_transporte: number; subsidio_residencia: number; outros_subsidios: number; }; }) => any; }; }) => {
            const dataAdmissao = new Date(data_admissao);

            const funcionario = await tx.funcionario.create({
                data: {
                    nome,
                    bi_documento,
                    email: email || null,
                    telefone,
                    nif: nif || null,
                    iban: iban || null,
                    numero_inss: numero_inss || null,
                    genero: genero || null,
                    data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
                    cargo: cargoId ? { connect: { id: cargoId } } : undefined,
                    departamento: departamentoId ? { connect: { id: departamentoId } } : undefined,
                    data_admissao: dataAdmissao,
                    status: "ATIVO",
                    hora_entrada: hora_entrada || null,
                    hora_saida: hora_saida || null,
                    dias_trabalho: dias_trabalho || null
                }
            });

            await tx.contrato.create({
                data: {
                    funcionarioId: funcionario.id,
                    tipo: tipo_contrato || "INDETERMINADO",
                    data_inicio: dataAdmissao,
                    data_fim: data_fim ? new Date(data_fim) : null,
                    renovacao_automatica: !!renovacao_automatica,
                    status: "VIGENTE",
                    salario_base: Number(salario_base || 0),
                    subsidio_alimentacao: Number(subsidio_alimentacao || 0),
                    subsidio_transporte: Number(subsidio_transporte || 0),
                    subsidio_residencia: Number(subsidio_residencia || 0),
                    outros_subsidios: Number(outros_subsidios || 0)
                }
            });

            return funcionario;
        });
    }

    static async atualizarFuncionario(id: string, dados: any) {
        const {
            nome,
            bi_documento,
            email,
            telefone,
            nif,
            iban,
            numero_inss,
            genero,
            data_nascimento,
            cargoId,
            departamentoId,
            data_admissao,
            tipo_contrato,
            data_fim,
            renovacao_automatica,
            salario_base,
            subsidio_alimentacao,
            subsidio_transporte,
            subsidio_residencia,
            outros_subsidios,
            hora_entrada,
            hora_saida,
            dias_trabalho
        } = dados;

        return await prisma.$transaction(async (tx: { funcionario: { update: (arg0: { where: { id: string; }; data: { nome: any; bi_documento: any; email: any; telefone: any; nif: any; iban: any; numero_inss: any; genero: any; data_nascimento: Date | null; cargo: { connect: { id: any; }; disconnect?: undefined; } | { disconnect: boolean; connect?: undefined; }; departamento: { connect: { id: any; }; disconnect?: undefined; } | { disconnect: boolean; connect?: undefined; }; data_admissao: Date; hora_entrada: any; hora_saida: any; dias_trabalho: any; }; }) => any; }; contrato: { findFirst: (arg0: { where: { funcionarioId: string; status: string; }; }) => any; update: (arg0: { where: { id: any; }; data: { tipo: any; data_fim: Date | null; renovacao_automatica: boolean; salario_base: number; subsidio_alimentacao: number; subsidio_transporte: number; subsidio_residencia: number; outros_subsidios: number; }; }) => any; create: (arg0: { data: { funcionarioId: string; tipo: any; data_inicio: Date; data_fim: Date | null; renovacao_automatica: boolean; status: string; salario_base: number; subsidio_alimentacao: number; subsidio_transporte: number; subsidio_residencia: number; outros_subsidios: number; }; }) => any; }; }) => {
            const funcionario = await tx.funcionario.update({
                where: { id },
                data: {
                    nome,
                    bi_documento,
                    email: email || null,
                    telefone,
                    nif: nif || null,
                    iban: iban || null,
                    numero_inss: numero_inss || null,
                    genero: genero || null,
                    data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
                    cargo: cargoId ? { connect: { id: cargoId } } : { disconnect: true },
                    departamento: departamentoId ? { connect: { id: departamentoId } } : { disconnect: true },
                    data_admissao: new Date(data_admissao),
                    hora_entrada: hora_entrada || null,
                    hora_saida: hora_saida || null,
                    dias_trabalho: dias_trabalho || null
                }
            });

            // Atualizar contrato vigente ou criar um novo se não existir
            const contratoVigente = await tx.contrato.findFirst({
                where: { funcionarioId: id, status: "VIGENTE" }
            });

            if (contratoVigente) {
                await tx.contrato.update({
                    where: { id: contratoVigente.id },
                    data: {
                        tipo: tipo_contrato,
                        data_fim: data_fim ? new Date(data_fim) : null,
                        renovacao_automatica: !!renovacao_automatica,
                        salario_base: Number(salario_base),
                        subsidio_alimentacao: Number(subsidio_alimentacao),
                        subsidio_transporte: Number(subsidio_transporte),
                        subsidio_residencia: Number(subsidio_residencia),
                        outros_subsidios: Number(outros_subsidios)
                    }
                });
            } else {
                await tx.contrato.create({
                    data: {
                        funcionarioId: id,
                        tipo: tipo_contrato || "INDETERMINADO",
                        data_inicio: new Date(data_admissao),
                        data_fim: data_fim ? new Date(data_fim) : null,
                        renovacao_automatica: !!renovacao_automatica,
                        status: "VIGENTE",
                        salario_base: Number(salario_base || 0),
                        subsidio_alimentacao: Number(subsidio_alimentacao || 0),
                        subsidio_transporte: Number(subsidio_transporte || 0),
                        subsidio_residencia: Number(subsidio_residencia || 0),
                        outros_subsidios: Number(outros_subsidios || 0)
                    }
                });
            }

            return funcionario;
        });
    }

    static async eliminarFuncionario(id: string) {
        // Usar transação para garantir que excluímos registros relacionados se necessário
        // Ou simplesmente deixar o banco lidar com cascade se configurado
        return await prisma.funcionario.delete({
            where: { id }
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
        const res = await prisma.presencaHR.upsert({
            where: {
                funcionarioId_data: {
                    funcionarioId: dados.funcionarioId,
                    data: dados.data
                }
            },
            update: dados,
            create: dados
        });

        // Sincronizar descontos automáticos se for falta
        const data = new Date(dados.data);
        await this.sincronizarDescontosFaltas(dados.funcionarioId, data.getUTCMonth() + 1, data.getUTCFullYear());

        return res;
    }

    static async sincronizarDescontosFaltas(funcionarioId: string, mes: number, ano: number) {
        const presencas = await prisma.presencaHR.findMany({
            where: {
                funcionarioId,
                data: {
                    gte: new Date(ano, mes - 1, 1),
                    lte: new Date(ano, mes, 0)
                },
                status: "FALTA_I"
            }
        });

        const totalFaltas = presencas.length;
        const contrato = await prisma.contrato.findFirst({
            where: { funcionarioId, status: "VIGENTE" }
        });

        // Procurar desconto automático existente
        const descontoAuto = await prisma.desconto.findFirst({
            where: {
                funcionarioId,
                mes_referencia: mes,
                ano_referencia: ano,
                tipo: "FALTA",
                observacao: "GERADO_AUTOMATICAMENTE"
            }
        });

        if (!contrato || totalFaltas === 0) {
            if (descontoAuto) await prisma.desconto.delete({ where: { id: descontoAuto.id } });
            return;
        }

        const valorFalta = (Number(contrato.salario_base) / 30) * totalFaltas;

        if (descontoAuto) {
            await prisma.desconto.update({
                where: { id: descontoAuto.id },
                data: {
                    valor: valorFalta,
                    motivo: `[AUTO] Presenças - Faltas Injustificadas (${totalFaltas} dias)`,
                    status: "APROVADO"
                }
            });
        } else {
            await prisma.desconto.create({
                data: {
                    funcionarioId,
                    valor: valorFalta,
                    mes_referencia: mes,
                    ano_referencia: ano,
                    tipo: "FALTA",
                    motivo: `[AUTO] Presenças - Faltas Injustificadas (${totalFaltas} dias)`,
                    status: "APROVADO",
                    observacao: "GERADO_AUTOMATICAMENTE"
                }
            });
        }
    }

    static async listarPresencasPorData(data: Date) {
        return await prisma.presencaHR.findMany({
            where: { data }
        });
    }

    // --- Gestão de Contratos e Renovação ---

    static async verificarContratosExpirados() {
        const hoje = new Date();
        hoje.setUTCHours(0, 0, 0, 0);

        const expirados = await prisma.contrato.findMany({
            where: {
                status: "VIGENTE",
                data_fim: { lt: hoje }
            }
        });

        for (const contrato of expirados) {
            if (contrato.renovacao_automatica && contrato.tipo !== "INDETERMINADO") {
                await this.renovarContrato(contrato.id);
            } else {
                await prisma.contrato.update({
                    where: { id: contrato.id },
                    data: { status: "CADUCADO" }
                });
            }
        }

        return expirados.length;
    }

    static async renovarContrato(id: string) {
        return await prisma.$transaction(async (tx: { contrato: { findUnique: (arg0: { where: { id: string; }; include: { funcionario: boolean; }; }) => any; update: (arg0: { where: { id: string; }; data: { status: string; }; }) => any; create: (arg0: { data: { funcionarioId: any; tipo: any; data_inicio: any; data_fim: Date | null; renovacao_automatica: any; status: string; salario_base: any; subsidio_alimentacao: any; subsidio_transporte: any; subsidio_residencia: any; outros_subsidios: any; }; }) => any; }; }) => {
            const antigo = await tx.contrato.findUnique({
                where: { id },
                include: { funcionario: true }
            });

            if (!antigo || antigo.status !== "VIGENTE") {
                throw new Error("Contrato inválido para renovação");
            }

            // Marcar antigo como renovado
            await tx.contrato.update({
                where: { id },
                data: { status: "RENOVADO" }
            });

            // Calcular nova data de fim se for determinado (ex: +6 meses ou manter mesmo período)
            let novaDataFim = null;
            if (antigo.data_fim && antigo.data_inicio) {
                const duracao = antigo.data_fim.getTime() - antigo.data_inicio.getTime();
                novaDataFim = new Date(antigo.data_fim.getTime() + duracao);
            }

            // Criar novo contrato
            return await tx.contrato.create({
                data: {
                    funcionarioId: antigo.funcionarioId,
                    tipo: antigo.tipo,
                    data_inicio: antigo.data_fim || new Date(),
                    data_fim: novaDataFim,
                    renovacao_automatica: antigo.renovacao_automatica,
                    status: "VIGENTE",
                    salario_base: antigo.salario_base,
                    subsidio_alimentacao: antigo.subsidio_alimentacao,
                    subsidio_transporte: antigo.subsidio_transporte,
                    subsidio_residencia: antigo.subsidio_residencia,
                    outros_subsidios: antigo.outros_subsidios
                }
            });
        });
    }

    static async encerrarContrato(id: string) {
        return await prisma.contrato.update({
            where: { id },
            data: { status: "ENCERRADO" }
        });
    }

    // --- Processamento Salarial ---

    static async processarFolhaMensal(mes: number, ano: number) {
        return await prisma.$transaction(async (tx) => {
            const funcionarios = await tx.funcionario.findMany({
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

                // Verificar se já existe processamento para ESTE funcionário no mês/ano
                const existeFolha = await tx.folhaPagamento.findUnique({
                    where: {
                        funcionarioId_mes_ano: {
                            funcionarioId: func.id,
                            mes,
                            ano
                        }
                    }
                });

                // Pular se já estiver PAGO. Se for PROCESSADO, permitimos re-processar para incluir novos descontos/faltas
                if (existeFolha && existeFolha.status === "PAGO") {
                    continue;
                }

                const contrato = func.contratos[0];

                // Consolidar presenças do mês
                let totalHENormais = 0;
                let totalHEDescanso = 0;
                let totalNoturnas = 0;
                let totalFaltas = 0;

                func.presencas.forEach((p: { horas_extras_50: any; horas_extras_100: any; horas_noturnas: any; status: string; }) => {
                    totalHENormais += p.horas_extras_50 || 0;
                    totalHEDescanso += p.horas_extras_100 || 0;
                    totalNoturnas += p.horas_noturnas || 0;
                    if (p.status === "FALTA_I") totalFaltas++;
                });

                // Buscar adiantamentos aprovados OU já processados (para acumular se re-processar)
                const adiantamentos = await tx.adiantamentoSalario.findMany({
                    where: {
                        funcionarioId: func.id,
                        mes_referencia: mes,
                        ano_referencia: ano,
                        status: { in: ["APROVADO", "PROCESSADO"] }
                    }
                });

                const totalAdiantamentos = adiantamentos.reduce((acc: number, curr: { valor: any; }) => acc + Number(curr.valor), 0);

                // Buscar descontos aprovados OU já processados
                const descontos = await tx.desconto.findMany({
                    where: {
                        funcionarioId: func.id,
                        mes_referencia: mes,
                        ano_referencia: ano,
                        status: { in: ["APROVADO", "PROCESSADO"] },
                        observacao: { not: "GERADO_AUTOMATICAMENTE" }
                    }
                });

                // Somar faltas manuais (em dias) aos das presenças
                const faltasManuaisDias = descontos
                    .filter(d => d.tipo === "FALTA")
                    .reduce((acc, curr) => acc + (curr.numeroDiasFalta || 0), 0);

                const totalFaltasPeriodo = totalFaltas + faltasManuaisDias;

                const totalOutrosDescontos = descontos
                    .filter(d => d.tipo !== "FALTA")
                    .reduce((acc: number, curr: { valor: any; }) => acc + Number(curr.valor), 0);

                // Executar cálculo angolano (Lei 12/23)
                const calc = processarSalarioMensal({
                    salarioBase: Number(contrato.salario_base),
                    subsidiosTributaveis: Number(contrato.subsidio_alimentacao || 0) + Number(contrato.subsidio_transporte || 0),
                    subsidiosIsentos: Number(contrato.subsidio_residencia || 0) + Number(contrato.outros_subsidios || 0),
                    horasExtrasNormais: totalHENormais,
                    horasExtrasDescanso: totalHEDescanso,
                    horasNoturnas: totalNoturnas,
                    faltasNaoJustificadas: totalFaltasPeriodo,
                    totalAdiantamentos,
                    outrosDescontos: totalOutrosDescontos
                });

                // Persistir folha
                const folha = await tx.folhaPagamento.upsert({
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
                        faltas_count: totalFaltasPeriodo,
                        base_inss: calc.baseInss,
                        inss_trabalhador: calc.inssTrabalhador,
                        inss_empresa: calc.inssEmpresa,
                        base_irt: calc.baseIrt,
                        irt_devido: calc.irt,
                        liquido_receber: calc.liquido,
                        total_adiantamentos: totalAdiantamentos,
                        outros_descontos: totalOutrosDescontos,
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
                        faltas_count: totalFaltasPeriodo,
                        base_inss: calc.baseInss,
                        inss_trabalhador: calc.inssTrabalhador,
                        inss_empresa: calc.inssEmpresa,
                        base_irt: calc.baseIrt,
                        irt_devido: calc.irt,
                        liquido_receber: calc.liquido,
                        total_adiantamentos: totalAdiantamentos,
                        outros_descontos: totalOutrosDescontos,
                        status: "PROCESSADO"
                    }
                });

                // Atualizar status para PROCESSADO (apenas os que estavam APROVADOS)
                if (adiantamentos.some(a => a.status === "APROVADO")) {
                    await tx.adiantamentoSalario.updateMany({
                        where: { id: { in: adiantamentos.filter(a => a.status === "APROVADO").map(a => a.id) } },
                        data: { status: "PROCESSADO" }
                    });
                }

                if (descontos.some(d => d.status === "APROVADO")) {
                    await tx.desconto.updateMany({
                        where: { id: { in: descontos.filter(d => d.status === "APROVADO").map(d => d.id) } },
                        data: { status: "PROCESSADO" }
                    });
                }

                resultados.push(folha);
            }

            return resultados;
        });
    }

    static async obterFolhaPorId(id: string) {
        const folha = await prisma.folhaPagamento.findUnique({
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

        if (!folha) return null;

        // Buscar detalhes de adiantamentos e descontos para o comprovante
        const [adiantamentos, descontos] = await Promise.all([
            prisma.adiantamentoSalario.findMany({
                where: {
                    funcionarioId: folha.funcionarioId,
                    mes_referencia: folha.mes,
                    ano_referencia: folha.ano,
                    status: "PROCESSADO"
                }
            }),
            prisma.desconto.findMany({
                where: {
                    funcionarioId: folha.funcionarioId,
                    mes_referencia: folha.mes,
                    ano_referencia: folha.ano,
                    status: "PROCESSADO",
                    observacao: { not: "GERADO_AUTOMATICAMENTE" }
                }
            })
        ]);

        return {
            ...folha,
            detalhesAdiantamentos: adiantamentos,
            detalhesDescontos: descontos
        };
    }

    static async obterRelatorioMensal(mes: number, ano: number) {
        const folhas = await prisma.folhaPagamento.findMany({
            where: { mes, ano },
            include: {
                funcionario: {
                    select: {
                        nome: true,
                        bi_documento: true,
                        numero_inss: true,
                        iban: true,
                        cargo: { select: { nome: true } }
                    }
                }
            }
        });

        const totalBase = folhas.reduce((acc: number, f: { salario_base: any; }) => acc + Number(f.salario_base), 0);
        const totalLiquid = folhas.reduce((acc: number, f: { liquido_receber: any; }) => acc + Number(f.liquido_receber), 0);
        const totalIRT = folhas.reduce((acc: number, f: { irt_devido: any; }) => acc + Number(f.irt_devido), 0);
        const totalINSS_T = folhas.reduce((acc: number, f: { inss_trabalhador: any; }) => acc + Number(f.inss_trabalhador), 0);
        const totalINSS_E = folhas.reduce((acc: number, f: { inss_empresa: any; }) => acc + Number(f.inss_empresa), 0);

        return {
            folhas,
            resumo: {
                totalBase,
                totalLiquid,
                totalIRT,
                totalINSS: totalINSS_T, // Para compatibilidade com o DocumentService
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
            select: {
                id: true,
                nome: true,
                descricao: true,
                _count: { select: { funcionarios: true, cargos: true } }
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
        // Verificar se existem funcionários ou cargos vinculados
        const [funcCount, cargoCount] = await Promise.all([
            prisma.funcionario.count({ where: { departamentoId: id } }),
            prisma.cargo.count({ where: { departamentoId: id } })
        ]);

        if (funcCount > 0 || cargoCount > 0) {
            const motivos = [];
            if (funcCount > 0) motivos.push(`${funcCount} colaborador(es)`);
            if (cargoCount > 0) motivos.push(`${cargoCount} cargo(s)`);

            throw new Error(`Não é possível eliminar: este departamento ainda possui ${motivos.join(' e ')} vinculados.`);
        }

        return await prisma.departamento.delete({ where: { id } });
    }

    // --- Cargos ---

    static async listarCargos() {
        return await prisma.cargo.findMany({
            select: {
                id: true,
                nome: true,
                salario_base: true,
                departamentoId: true,
                departamento: {
                    select: { nome: true }
                },
                _count: { select: { funcionarios: true } }
            },
            orderBy: { nome: "asc" }
        });
    }

    static async criarCargo(dados: any) {
        const { id, nome, departamentoId, salario_base_sugerido } = dados;
        return await prisma.cargo.create({
            data: {
                nome,
                departamentoId,
                salario_base: salario_base_sugerido ? Number(salario_base_sugerido) : null
            }
        });
    }

    static async atualizarCargo(id: string, dados: any) {
        const { nome, departamentoId, salario_base_sugerido } = dados;
        return await prisma.cargo.update({
            where: { id },
            data: {
                nome,
                departamentoId,
                salario_base: salario_base_sugerido ? Number(salario_base_sugerido) : null
            }
        });
    }

    static async eliminarCargo(id: string) {
        // Verificar se existem funcionários vinculados
        const funcCount = await prisma.funcionario.count({ where: { cargoId: id } });

        if (funcCount > 0) {
            throw new Error(`Não é possível eliminar: este cargo ainda possui ${funcCount} colaborador(es) vinculado(s).`);
        }

        return await prisma.cargo.delete({ where: { id } });
    }

    // --- Relatórios Legais ---

    static async getRelatorioINSS(mes: number, ano: number) {
        const folhas = await prisma.folhaPagamento.findMany({
            where: { mes, ano },
            include: { funcionario: { select: { nome: true, numero_inss: true, bi_documento: true } } }
        });

        const safeNumber = (val: any) => {
            if (val === null || val === undefined) return 0;
            if (typeof val === 'object' && typeof val.toNumber === 'function') return val.toNumber();
            const n = Number(val);
            return isNaN(n) ? 0 : n;
        };

        const linhas = folhas.map((f: any) => ({
            funcionario: f.funcionario,
            base_incidencia: safeNumber(f.base_inss),
            trabalhador_3: safeNumber(f.inss_trabalhador),
            empresa_8: safeNumber(f.inss_empresa),
            total_11: safeNumber(f.inss_trabalhador) + safeNumber(f.inss_empresa)
        }));

        const totais = linhas.reduce((acc: any, curr: any) => ({
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

        const safeNumber = (val: any) => {
            if (val === null || val === undefined) return 0;
            if (typeof val === 'object' && typeof val.toNumber === 'function') return val.toNumber();
            const n = Number(val);
            return isNaN(n) ? 0 : n;
        };

        const linhas = folhas.map((f: any) => ({
            funcionario: f.funcionario,
            rendimento_bruto: safeNumber(f.salario_base) + safeNumber(f.total_subsidios_tributaveis) + safeNumber(f.total_horas_extras),
            materia_colectavel: safeNumber(f.base_irt),
            irt_retido: safeNumber(f.irt_devido)
        }));

        const totalIRT = linhas.reduce((acc: any, curr: any) => acc + curr.irt_retido, 0);

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
    // --- Adiantamentos Salariais ---

    static async solicitarAdiantamento(dados: {
        funcionarioId: string;
        valor: number;
        mes_referencia: number;
        ano_referencia: number;
        motivo?: string;
    }) {
        return await prisma.adiantamentoSalario.create({
            data: {
                ...dados,
                valor: Number(dados.valor)
            }
        });
    }

    static async listarAdiantamentos(filtros?: {
        funcionarioId?: string;
        status?: string;
        mes?: number;
        ano?: number;
    }) {
        const where: any = {};
        if (filtros?.funcionarioId) where.funcionarioId = filtros.funcionarioId;
        if (filtros?.status) where.status = filtros.status;
        if (filtros?.mes) where.mes_referencia = filtros.mes;
        if (filtros?.ano) where.ano_referencia = filtros.ano;

        return await prisma.adiantamentoSalario.findMany({
            where,
            include: {
                funcionario: {
                    select: {
                        nome: true,
                        cargo: { select: { nome: true } },
                        departamento: { select: { nome: true } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async atualizarStatusAdiantamento(id: string, status: string, observacao?: string) {
        return await prisma.adiantamentoSalario.update({
            where: { id },
            data: { status, observacao }
        });
    }

    // --- Descontos Salariais ---

    static async registarDesconto(dados: {
        funcionarioId: string;
        valor: number;
        mes_referencia: number;
        ano_referencia: number;
        tipo?: string;
        motivo?: string;
        numeroDiasFalta?: number;
    }) {
        let valorFinal = Number(dados.valor);

        // Se for FALTA e tiver dias, calcular automaticamente baseado no salário base atual
        if (dados.tipo === "FALTA" && dados.numeroDiasFalta) {
            const funcionario = await prisma.funcionario.findUnique({
                where: { id: dados.funcionarioId },
                include: { contratos: { where: { status: "VIGENTE" }, take: 1 } }
            });

            if (funcionario && funcionario.contratos.length > 0) {
                const salarioBase = Number(funcionario.contratos[0].salario_base);
                valorFinal = (salarioBase / 30) * dados.numeroDiasFalta;
            }
        }

        return await prisma.desconto.create({
            data: {
                ...dados,
                valor: valorFinal
            }
        });
    }

    static async listarDescontos(filtros?: {
        funcionarioId?: string;
        status?: string;
        mes?: number;
        ano?: number;
    }) {
        const where: any = {};
        if (filtros?.funcionarioId) where.funcionarioId = filtros.funcionarioId;
        if (filtros?.status) where.status = filtros.status;
        if (filtros?.mes) where.mes_referencia = filtros.mes;
        if (filtros?.ano) where.ano_referencia = filtros.ano;

        return await prisma.desconto.findMany({
            where,
            include: {
                funcionario: {
                    select: {
                        nome: true,
                        cargo: { select: { nome: true } },
                        departamento: { select: { nome: true } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async atualizarStatusDesconto(id: string, status: string, observacao?: string) {
        return await prisma.desconto.update({
            where: { id },
            data: { status, observacao }
        });
    }
}
