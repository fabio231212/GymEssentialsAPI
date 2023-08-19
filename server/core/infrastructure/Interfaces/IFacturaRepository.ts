import { DetalleFactura, EncabezadoFactura } from '@prisma/client';

export interface IFacturaRepository {
  createFactura(factura: any): Promise<any>;
  getFacturasByUsuario(idUsuario: number): Promise<EncabezadoFactura[]>;
  getProductosByVendedor(idVendedor: number): Promise<DetalleFactura[]>;
  getFacturasById(id: number): Promise<EncabezadoFactura>;
  actualizarEstadoPedido(id: number, estado: number): Promise<any>;
}
