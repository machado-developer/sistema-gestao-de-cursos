-- AlterTable
ALTER TABLE `sys_email_jobs` ADD COLUMN `lockedUntil` DATETIME(3) NULL,
    ADD COLUMN `workerId` VARCHAR(191) NULL;
