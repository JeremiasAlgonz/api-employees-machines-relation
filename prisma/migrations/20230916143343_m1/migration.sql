-- CreateTable
CREATE TABLE `Funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `salario` DECIMAL(12, 2) NOT NULL,
    `cpf` DECIMAL(11, 0) NOT NULL,

    UNIQUE INDEX `Funcionarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Maquina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `potencia` DECIMAL(5, 1) NOT NULL,
    `producao` INTEGER NOT NULL,
    `dataCompra` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FuncionarioToMaquina` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FuncionarioToMaquina_AB_unique`(`A`, `B`),
    INDEX `_FuncionarioToMaquina_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Maquina` ADD CONSTRAINT `Maquina_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `Tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FuncionarioToMaquina` ADD CONSTRAINT `_FuncionarioToMaquina_A_fkey` FOREIGN KEY (`A`) REFERENCES `Funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FuncionarioToMaquina` ADD CONSTRAINT `_FuncionarioToMaquina_B_fkey` FOREIGN KEY (`B`) REFERENCES `Maquina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
