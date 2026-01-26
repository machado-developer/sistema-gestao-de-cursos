-- DropForeignKey
ALTER TABLE `documentos` DROP FOREIGN KEY `documentos_alunoId_fkey`;

-- AlterTable
ALTER TABLE `alunos` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `certificates` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `documentos` ADD COLUMN `funcionarioId` VARCHAR(191) NULL,
    MODIFY `alunoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `matriculas` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pagamentos` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `rh_contratos` ADD COLUMN `renovacao_automatica` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `rh_folhas_pagamento` ADD COLUMN `faltas_count` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `turmas` ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `empresa_config` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nif` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `logoUrl` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL DEFAULT 'Luanda',
    `pais` VARCHAR(191) NULL DEFAULT 'Angola',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamentos` ADD CONSTRAINT `pagamentos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
