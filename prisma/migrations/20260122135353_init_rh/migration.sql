-- CreateTable
CREATE TABLE `rh_funcionarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `bi_documento` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `data_nascimento` DATETIME(3) NULL,
    `genero` VARCHAR(191) NULL,
    `nif` VARCHAR(191) NULL,
    `iban` VARCHAR(191) NULL,
    `numero_inss` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `data_admissao` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ATIVO',
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rh_funcionarios_bi_documento_key`(`bi_documento`),
    UNIQUE INDEX `rh_funcionarios_email_key`(`email`),
    UNIQUE INDEX `rh_funcionarios_nif_key`(`nif`),
    UNIQUE INDEX `rh_funcionarios_numero_inss_key`(`numero_inss`),
    UNIQUE INDEX `rh_funcionarios_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rh_contratos` (
    `id` VARCHAR(191) NOT NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'VIGENTE',
    `salario_base` DECIMAL(18, 2) NOT NULL,
    `subsidio_alimentacao` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `subsidio_transporte` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `subsidio_residencia` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `outros_subsidios` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rh_presencas` (
    `id` VARCHAR(191) NOT NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `entrada` DATETIME(3) NULL,
    `saida` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,
    `horas_normais` DOUBLE NOT NULL DEFAULT 8,
    `horas_extras_50` DOUBLE NOT NULL DEFAULT 0,
    `horas_extras_100` DOUBLE NOT NULL DEFAULT 0,
    `horas_noturnas` DOUBLE NOT NULL DEFAULT 0,
    `observacao` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rh_presencas_funcionarioId_data_key`(`funcionarioId`, `data`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rh_folhas_pagamento` (
    `id` VARCHAR(191) NOT NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,
    `mes` INTEGER NOT NULL,
    `ano` INTEGER NOT NULL,
    `data_processamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `salario_base` DECIMAL(18, 2) NOT NULL,
    `total_subsidios_tributaveis` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `total_subsidios_isentos` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `total_horas_extras` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `total_faltas` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `base_inss` DECIMAL(18, 2) NOT NULL,
    `inss_trabalhador` DECIMAL(18, 2) NOT NULL,
    `inss_empresa` DECIMAL(18, 2) NOT NULL,
    `base_irt` DECIMAL(18, 2) NOT NULL,
    `irt_devido` DECIMAL(18, 2) NOT NULL,
    `outros_descontos` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `liquido_receber` DECIMAL(18, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'RASCUNHO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rh_folhas_pagamento_funcionarioId_mes_ano_key`(`funcionarioId`, `mes`, `ano`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rh_ferias_solicitacoes` (
    `id` VARCHAR(191) NOT NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `dias_uteis` INTEGER NOT NULL,
    `ano_referencia` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL DEFAULT 'GOZO_FERIAS',
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDENTE',
    `observacao` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rh_configs` (
    `id` VARCHAR(191) NOT NULL,
    `mes_referencia` INTEGER NULL,
    `ano_referencia` INTEGER NULL,
    `salario_minimo` DECIMAL(18, 2) NOT NULL DEFAULT 70000,
    `inss_trabalhador_pct` DECIMAL(5, 4) NOT NULL DEFAULT 0.03,
    `inss_empresa_pct` DECIMAL(5, 4) NOT NULL DEFAULT 0.08,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rh_funcionarios` ADD CONSTRAINT `rh_funcionarios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rh_contratos` ADD CONSTRAINT `rh_contratos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rh_presencas` ADD CONSTRAINT `rh_presencas_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rh_folhas_pagamento` ADD CONSTRAINT `rh_folhas_pagamento_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rh_ferias_solicitacoes` ADD CONSTRAINT `rh_ferias_solicitacoes_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
