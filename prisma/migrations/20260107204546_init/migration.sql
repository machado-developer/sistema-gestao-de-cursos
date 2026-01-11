-- CreateTable
CREATE TABLE `alunos` (
    `id` VARCHAR(191) NOT NULL,
    `nome_completo` VARCHAR(191) NOT NULL,
    `bi_documento` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `genero` VARCHAR(191) NULL,
    `escolaAcademica` VARCHAR(191) NULL,
    `escolaridade` VARCHAR(191) NULL,
    `Endereco` VARCHAR(191) NULL,

    UNIQUE INDEX `alunos_bi_documento_key`(`bi_documento`),
    UNIQUE INDEX `alunos_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `carga_horaria` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `media_minima_aprovacao` DOUBLE NOT NULL DEFAULT 10.0,
    `preco_base` DECIMAL(65, 30) NOT NULL,
    `modelo_certificado` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instrutores` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `instrutores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `codigo_turma` VARCHAR(191) NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `instrutorId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Em Andamento',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `turmas_codigo_turma_key`(`codigo_turma`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matriculas` (
    `id` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NOT NULL,
    `turmaId` VARCHAR(191) NOT NULL,
    `notas` VARCHAR(191) NOT NULL DEFAULT '[]',
    `media_final` DOUBLE NULL,
    `status_academico` VARCHAR(191) NOT NULL DEFAULT 'Cursando',
    `valor_total` DECIMAL(65, 30) NOT NULL,
    `valor_pago` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `estado_pagamento` VARCHAR(191) NOT NULL DEFAULT 'Pendente',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamentos` (
    `id` VARCHAR(191) NOT NULL,
    `matriculaId` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metodo_pagamento` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_instrutorId_fkey` FOREIGN KEY (`instrutorId`) REFERENCES `instrutores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamentos` ADD CONSTRAINT `pagamentos_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
