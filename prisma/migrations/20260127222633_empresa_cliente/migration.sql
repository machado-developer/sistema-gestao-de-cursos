-- AlterTable
ALTER TABLE `alunos` ADD COLUMN `empresaId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `matriculas` ADD COLUMN `empresaClienteId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `empresas_clientes` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nif` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `responsavel` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `empresas_clientes_nif_key`(`nif`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas_clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_empresaClienteId_fkey` FOREIGN KEY (`empresaClienteId`) REFERENCES `empresas_clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
