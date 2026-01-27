const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        const data = {
            nome: "Antonio Machado",
            bi_documento: "0065ADBB0F005",
            email: "ulundoantonio@gmail.com",
            telefone: "+244948575047",
            nif: "500001451715",
            iban: null,
            numero_inss: null,
            genero: "M",
            data_nascimento: new Date("1992-01-07T00:00:00.000Z"),
            cargoId: "3d39cb9d-0e03-47bc-8782-63ba7053cd84",
            departamentoId: "84977fc5-f8ca-49c8-9e17-ea2281297ce0",
            data_admissao: new Date("2026-01-27T00:00:00.000Z"),
            status: "ATIVO",
            hora_entrada: "08:00",
            hora_saida: "17:00",
            dias_trabalho: "Seg,Ter,Qua,Qui,Sex"
        };

        console.log("Attempting to create funcionario with data:", JSON.stringify(data, null, 2));

        const res = await prisma.funcionario.create({ data });
        console.log("Success!", res);
    } catch (e) {
        console.error("FULL ERROR MESSAGE:");
        console.error(e.message);
        if (e.code) console.error("Error Code:", e.code);
        if (e.meta) console.error("Error Meta:", e.meta);
    } finally {
        await prisma.$disconnect();
    }
}

test();
