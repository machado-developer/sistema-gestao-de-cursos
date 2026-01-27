/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `rh_funcionarios` ADD COLUMN `dias_trabalho` VARCHAR(191) NULL,
    ADD COLUMN `hora_entrada` VARCHAR(191) NULL,
    ADD COLUMN `hora_saida` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpires` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_resetToken_key` ON `users`(`resetToken`);
