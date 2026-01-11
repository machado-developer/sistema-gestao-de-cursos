-- AlterTable
ALTER TABLE `turmas` ADD COLUMN `vagas` INTEGER NOT NULL DEFAULT 20;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `language` VARCHAR(191) NOT NULL DEFAULT 'pt',
    ADD COLUMN `theme` VARCHAR(191) NOT NULL DEFAULT 'dark';

-- CreateTable
CREATE TABLE `documentos` (
    `id` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `usuario` VARCHAR(191) NULL,
    `acao` VARCHAR(191) NOT NULL,
    `entidade` VARCHAR(191) NULL,
    `detalhes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
