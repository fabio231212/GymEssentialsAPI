/*
  Warnings:

  - You are about to alter the column `anioVencimiento` on the `metodopago` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `metodopago` MODIFY `anioVencimiento` INTEGER NOT NULL;
