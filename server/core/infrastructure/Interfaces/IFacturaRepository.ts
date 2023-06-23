import { EncabezadoFactura, Producto } from '@prisma/client';

export interface IFacturaRepository {
  getFacturasByUsuario(idUsuario: number): Promise<EncabezadoFactura[]>;
  getProductosByVendedor(idVendedor: number): Promise<Producto[]>;
  getFacturasById(id: number): Promise<EncabezadoFactura>;
}
