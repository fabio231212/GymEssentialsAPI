/*
  Warnings:

  - You are about to drop the `_direccionusuariotousuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioId` to the `DireccionUsuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IdDireccion` to the `EncabezadoFactura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `MetodoPago` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_direccionusuariotousuario` DROP FOREIGN KEY `_DireccionUsuarioToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_direccionusuariotousuario` DROP FOREIGN KEY `_DireccionUsuarioToUsuario_B_fkey`;

-- DropForeignKey
ALTER TABLE `encabezadofactura` DROP FOREIGN KEY `EncabezadoFactura_metodoPagoId_fkey`;

-- AlterTable
ALTER TABLE `direccionusuario` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `encabezadofactura` ADD COLUMN `IdDireccion` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `metodopago` ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_direccionusuariotousuario`;

-- AddForeignKey
ALTER TABLE `DireccionUsuario` ADD CONSTRAINT `DireccionUsuario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncabezadoFactura` ADD CONSTRAINT `EncabezadoFactura_IdDireccion_fkey` FOREIGN KEY (`IdDireccion`) REFERENCES `DireccionUsuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MetodoPago` ADD CONSTRAINT `MetodoPago_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
