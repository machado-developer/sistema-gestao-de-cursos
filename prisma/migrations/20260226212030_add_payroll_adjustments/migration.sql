-- AlterTable
ALTER TABLE `users` ADD COLUMN `isSystemRoot` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `rh_folhas_ajustes_historico` (
    `id` VARCHAR(191) NOT NULL,
    `folhaId` VARCHAR(191) NOT NULL,
    `campo` VARCHAR(191) NOT NULL,
    `valorAnterior` DECIMAL(18, 2) NOT NULL,
    `valorNovo` DECIMAL(18, 2) NOT NULL,
    `motivo` TEXT NOT NULL,
    `alteradoPorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rh_folhas_ajustes_historico` ADD CONSTRAINT `rh_folhas_ajustes_historico_folhaId_fkey` FOREIGN KEY (`folhaId`) REFERENCES `rh_folhas_pagamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rh_folhas_ajustes_historico` ADD CONSTRAINT `rh_folhas_ajustes_historico_alteradoPorId_fkey` FOREIGN KEY (`alteradoPorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
