-- CreateTable
CREATE TABLE `rh_descontos` (
    `id` VARCHAR(191) NOT NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(18, 2) NOT NULL,
    `data_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo` VARCHAR(191) NOT NULL DEFAULT 'OUTRO',
    `motivo` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'APROVADO',
    `mes_referencia` INTEGER NOT NULL,
    `ano_referencia` INTEGER NOT NULL,
    `observacao` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rh_descontos` ADD CONSTRAINT `rh_descontos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
