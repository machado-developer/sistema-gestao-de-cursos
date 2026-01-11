/*
  Warnings:

  - You are about to drop the column `modelo_certificado` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `notas` on the `matriculas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bi_documento]` on the table `instrutores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `alunos` ADD COLUMN `bolseiro` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `cursos` DROP COLUMN `modelo_certificado`,
    ADD COLUMN `certificateTemplateId` VARCHAR(191) NULL,
    ADD COLUMN `frequencia_minima` DOUBLE NOT NULL DEFAULT 75.0;

-- AlterTable
ALTER TABLE `instrutores` ADD COLUMN `bi_documento` VARCHAR(191) NULL,
    ADD COLUMN `bio` TEXT NULL,
    ADD COLUMN `especialidade` VARCHAR(191) NULL,
    ADD COLUMN `genero` VARCHAR(191) NULL,
    ADD COLUMN `telefone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `matriculas` DROP COLUMN `notas`,
    ADD COLUMN `percentual_frequencia` DOUBLE NULL;

-- CreateTable
CREATE TABLE `certificate_templates` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `mapping` TEXT NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificates` (
    `id` VARCHAR(191) NOT NULL,
    `matriculaId` VARCHAR(191) NOT NULL,
    `templateId` VARCHAR(191) NULL,
    `codigo_unico` VARCHAR(191) NOT NULL,
    `hash_validacao` VARCHAR(191) NOT NULL,
    `data_emissao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `certificates_matriculaId_key`(`matriculaId`),
    UNIQUE INDEX `certificates_codigo_unico_key`(`codigo_unico`),
    UNIQUE INDEX `certificates_hash_validacao_key`(`hash_validacao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aulas` (
    `id` VARCHAR(191) NOT NULL,
    `turmaId` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL DEFAULT 'normal',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presencas` (
    `id` VARCHAR(191) NOT NULL,
    `aulaId` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `presencas_aulaId_alunoId_key`(`aulaId`, `alunoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avaliacoes` (
    `id` VARCHAR(191) NOT NULL,
    `aulaId` VARCHAR(191) NULL,
    `matriculaId` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `nota` DOUBLE NOT NULL,
    `peso` DOUBLE NOT NULL DEFAULT 1.0,
    `instrutorId` VARCHAR(191) NULL,
    `observacao` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `instrutores_bi_documento_key` ON `instrutores`(`bi_documento`);

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_certificateTemplateId_fkey` FOREIGN KEY (`certificateTemplateId`) REFERENCES `certificate_templates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aulas` ADD CONSTRAINT `aulas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presencas` ADD CONSTRAINT `presencas_aulaId_fkey` FOREIGN KEY (`aulaId`) REFERENCES `aulas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presencas` ADD CONSTRAINT `presencas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_aulaId_fkey` FOREIGN KEY (`aulaId`) REFERENCES `aulas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_instrutorId_fkey` FOREIGN KEY (`instrutorId`) REFERENCES `instrutores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
