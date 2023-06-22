-- AddForeignKey
ALTER TABLE `EncabezadoFactura` ADD CONSTRAINT `EncabezadoFactura_metodoPagoId_fkey` FOREIGN KEY (`metodoPagoId`) REFERENCES `MetodoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
