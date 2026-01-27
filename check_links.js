const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const users = await prisma.user.findMany({
        include: { funcionario: true }
    });
    console.log('Users:', users.map(u => ({ id: u.id, email: u.email, hasFuncionario: !!u.funcionario })));

    const funcs = await prisma.funcionario.findMany();
    console.log('Funcionarios:', funcs.map(f => ({ id: f.id, email: f.email, userId: f.userId })));
}

check();
