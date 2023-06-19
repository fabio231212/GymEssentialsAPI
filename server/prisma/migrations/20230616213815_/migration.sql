/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `direccionusuario` table. All the data in the column will be lost.
  - You are about to drop the column `IdDireccion` on the `encabezadofactura` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `metodopago` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `direccionusuario` DROP FOREIGN KEY `DireccionUsuario_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `encabezadofactura` DROP FOREIGN KEY `EncabezadoFactura_IdDireccion_fkey`;

-- DropForeignKey
ALTER TABLE `metodopago` DROP FOREIGN KEY `MetodoPago_idUsuario_fkey`;

-- DropIndex
DROP INDEX `EncabezadoFactura_metodoPagoId_fkey` ON `encabezadofactura`;

-- AlterTable
ALTER TABLE `direccionusuario` DROP COLUMN `usuarioId`;

-- AlterTable
ALTER TABLE `encabezadofactura` DROP COLUMN `IdDireccion`;

-- AlterTable
ALTER TABLE `metodopago` DROP COLUMN `idUsuario`;

-- CreateTable
CREATE TABLE `_DireccionUsuarioToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DireccionUsuarioToUsuario_AB_unique`(`A`, `B`),
    INDEX `_DireccionUsuarioToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EncabezadoFactura` ADD CONSTRAINT `EncabezadoFactura_metodoPagoId_fkey` FOREIGN KEY (`metodoPagoId`) REFERENCES `MetodoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DireccionUsuarioToUsuario` ADD CONSTRAINT `_DireccionUsuarioToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `DireccionUsuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DireccionUsuarioToUsuario` ADD CONSTRAINT `_DireccionUsuarioToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
