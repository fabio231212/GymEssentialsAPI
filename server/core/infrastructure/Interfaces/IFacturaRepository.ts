import { EncabezadoFactura } from '@prisma/client';

export interface IFacturaRepository {
  getFacturasByUsuario(idUsuario: number): Promise<EncabezadoFactura[]>;
  getProductosByVendedor(idVendedor: number): Promise<EncabezadoFactura[]>;
  getFacturasById(id: number): Promise<EncabezadoFactura>;
}
