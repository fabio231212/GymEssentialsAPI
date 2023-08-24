import { DetalleFactura, EncabezadoFactura } from '@prisma/client';

export interface IFacturaRepository {
  getFacturasByUsuario(idUsuario: number): Promise<EncabezadoFactura[]>;
  getProductosByVendedor(idVendedor: number): Promise<DetalleFactura[]>;
  getFacturasById(id: number): Promise<EncabezadoFactura>;

  actualizarEstadoPedido(id: number, estado: number): Promise<any>;


  getNumVentasCurrentDay(): Promise<number>;

  getTop5ProductosMasVendidos(): Promise<any[]>;

  getVentasPorMesByVendedor(idVendedor: number): Promise<any[]>;

}
