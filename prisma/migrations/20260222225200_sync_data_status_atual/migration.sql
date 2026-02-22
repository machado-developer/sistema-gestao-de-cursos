-- AlterTable
ALTER TABLE `rh_funcionarios` ADD COLUMN `dataStatusAtual` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `rh_funcionario_status_historico` (
    `id` VARCHAR(191) NOT NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,
    `statusAnterior` VARCHAR(191) NOT NULL,
    `novoStatus` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `descricao` TEXT NULL,
    `alteradoPorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rh_funcionario_status_historico` ADD CONSTRAINT `rh_funcionario_status_historico_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rh_funcionario_status_historico` ADD CONSTRAINT `rh_funcionario_status_historico_alteradoPorId_fkey` FOREIGN KEY (`alteradoPorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
