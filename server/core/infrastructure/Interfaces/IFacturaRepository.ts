import { DetalleFactura, EncabezadoFactura } from '@prisma/client';

export interface IFacturaRepository {
  getFacturasByUsuario(idUsuario: number): Promise<EncabezadoFactura[]>;
  getProductosByVendedor(idVendedor: number): Promise<DetalleFactura[]>;
  getFacturasById(id: number): Promise<EncabezadoFactura>;
}
