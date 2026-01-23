-- AlterTable
ALTER TABLE `rh_cargos` ADD COLUMN `departamentoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `rh_cargos` ADD CONSTRAINT `rh_cargos_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `rh_departamentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
