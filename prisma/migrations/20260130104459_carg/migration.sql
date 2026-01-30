/*
  Warnings:

  - A unique constraint covering the columns `[nome,departamentoId]` on the table `rh_cargos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `rh_cargos_nome_key` ON `rh_cargos`;

-- CreateIndex
CREATE UNIQUE INDEX `rh_cargos_nome_departamentoId_key` ON `rh_cargos`(`nome`, `departamentoId`);
