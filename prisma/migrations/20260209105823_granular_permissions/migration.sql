-- CreateTable
CREATE TABLE `sys_module_items` (
    `id` VARCHAR(191) NOT NULL,
    `moduleId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_module_items_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_profile_item_permissions` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `moduleItemId` VARCHAR(191) NOT NULL,
    `canRead` BOOLEAN NOT NULL DEFAULT true,
    `canWrite` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_profile_item_permissions_profileId_moduleItemId_key`(`profileId`, `moduleItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user_item_permissions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `moduleItemId` VARCHAR(191) NOT NULL,
    `canRead` BOOLEAN NOT NULL DEFAULT true,
    `canWrite` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_user_item_permissions_userId_moduleItemId_key`(`userId`, `moduleItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys_module_items` ADD CONSTRAINT `sys_module_items_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `sys_modules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_profile_item_permissions` ADD CONSTRAINT `sys_profile_item_permissions_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `sys_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_profile_item_permissions` ADD CONSTRAINT `sys_profile_item_permissions_moduleItemId_fkey` FOREIGN KEY (`moduleItemId`) REFERENCES `sys_module_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_item_permissions` ADD CONSTRAINT `sys_user_item_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_item_permissions` ADD CONSTRAINT `sys_user_item_permissions_moduleItemId_fkey` FOREIGN KEY (`moduleItemId`) REFERENCES `sys_module_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
