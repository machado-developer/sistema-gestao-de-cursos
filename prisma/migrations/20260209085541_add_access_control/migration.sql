-- AlterTable
ALTER TABLE `users` ADD COLUMN `profileId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `sys_profiles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_profiles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_modules` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_modules_name_key`(`name`),
    UNIQUE INDEX `sys_modules_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_profile_permissions` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `moduleId` VARCHAR(191) NOT NULL,
    `canRead` BOOLEAN NOT NULL DEFAULT true,
    `canWrite` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_profile_permissions_profileId_moduleId_key`(`profileId`, `moduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user_permissions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `moduleId` VARCHAR(191) NOT NULL,
    `canRead` BOOLEAN NOT NULL DEFAULT true,
    `canWrite` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_user_permissions_userId_moduleId_key`(`userId`, `moduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `sys_profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_profile_permissions` ADD CONSTRAINT `sys_profile_permissions_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `sys_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_profile_permissions` ADD CONSTRAINT `sys_profile_permissions_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `sys_modules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_permissions` ADD CONSTRAINT `sys_user_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_permissions` ADD CONSTRAINT `sys_user_permissions_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `sys_modules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
