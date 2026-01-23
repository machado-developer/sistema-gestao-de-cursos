/*
  Warnings:

  - You are about to drop the column `cargo` on the `rh_funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `rh_funcionarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rh_funcionarios` DROP COLUMN `cargo`,
    DROP COLUMN `departamento`,
    ADD COLUMN `cargoId` VARCHAR(191) NULL,
    ADD COLUMN `departamentoId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `rh_departamentos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rh_departamentos_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rh_cargos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` TEXT NULL,
    `salario_base` DECIMAL(18, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rh_cargos_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rh_funcionarios` ADD CONSTRAINT `rh_funcionarios_cargoId_fkey` FOREIGN KEY (`cargoId`) REFERENCES `rh_cargos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rh_funcionarios` ADD CONSTRAINT `rh_funcionarios_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `rh_departamentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
