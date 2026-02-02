
import { RHService } from "../src/services/rhService";
import { prisma } from "../src/lib/prisma";

async function main() {
    console.log("Iniciando verificação de Adiantamento Salarial...");

    // 1. Find an active employee
    const funcionarios = await RHService.listarFuncionarios();
    const funcionario = funcionarios.find((f: any) => f.status === "ATIVO");

    if (!funcionario) {
        console.error("Nenhum funcionário ATIVO encontrado para teste. Crie um funcionário primeiro.");
        return;
    }

    console.log(`Usando funcionário: ${funcionario.nome} (${funcionario.id})`);

    // 2. Request Advance
    const valorAdiantamento = 15000;
    const date = new Date();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    console.log(`Solicitando adiantamento de ${valorAdiantamento} kz para ${mes}/${ano}...`);
    // Ensure we don't duplicate logic if running multiple times

    // Create new request
    const adiantamento = await RHService.solicitarAdiantamento({
        funcionarioId: funcionario.id,
        valor: valorAdiantamento,
        mes_referencia: mes,
        ano_referencia: ano,
        motivo: "Teste de verificação automatizada"
    });

    console.log(`Adiantamento criado. ID: ${adiantamento.id}, Status: ${adiantamento.status}`);

    // 3. Approve
    console.log("Aprovando adiantamento...");
    const aprovado = await RHService.atualizarStatusAdiantamento(adiantamento.id, "APROVADO", "Aprovado pelo teste");
    console.log(`Status atualizado: ${aprovado.status}`);

    // Clean up existing payroll for this month if exists (to allow re-processing)
    // Be careful not to delete real data if this was a prod env, but this is dev.
    const existingFolha = await prisma.folhaPagamento.findUnique({
        where: {
            funcionarioId_mes_ano: {
                funcionarioId: funcionario.id,
                mes,
                ano
            }
        }
    });

    if (existingFolha) {
        console.log("Removendo folha existente para permitir re-processamento...");
        await prisma.folhaPagamento.delete({ where: { id: existingFolha.id } });
    }

    // 4. Process Payroll
    console.log("Processando folha de pagamento...");
    try {
        const folhas = await RHService.processarFolhaMensal(mes, ano);
        const folha = folhas.find((f: any) => f.funcionarioId === funcionario.id);

        if (!folha) {
            console.error("Folha não gerada para o funcionário.");
            return;
        }

        console.log(`Folha gerada com sucesso.`);
        console.log(`Salário Base: ${folha.salario_base}`);
        console.log(`Líquido a Receber: ${folha.liquido_receber}`);
        console.log(`Total Adiantamentos deduzido: ${folha.total_adiantamentos}`);

        // 5. Verify Deduction
        if (Number(folha.total_adiantamentos) === valorAdiantamento) {
            console.log("SUCESSO: Adiantamento deduzido corretamente.");
        } else {
            console.error(`ERRO: Total de adiantamentos na folha (${folha.total_adiantamentos}) difere do valor solicitado (${valorAdiantamento}).`);
        }

        // 6. Verify Advance Status
        const checkAdiantamento = await prisma.adiantamentoSalario.findUnique({
            where: { id: adiantamento.id }
        });
        console.log(`Status final do adiantamento: ${checkAdiantamento?.status}`);

        if (checkAdiantamento?.status === "PROCESSADO") {
            console.log("SUCESSO: Status do adiantamento atualizado para PROCESSADO.");
        } else {
            console.error("ERRO: Status do adiantamento não foi atualizado para PROCESSADO.");
        }

        // Cleanup
        console.log("Limpando dados de teste...");
        await prisma.adiantamentoSalario.delete({ where: { id: adiantamento.id } });
        // Optionally delete folha
        await prisma.folhaPagamento.delete({ where: { id: folha.id } });
        console.log("Teste concluído.");

    } catch (error) {
        console.error("Erro durante processamento:", error);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
