import { EncabezadoFactura } from '@prisma/client';

export interface IFacturaRepository {
  getFacturasByUsuario(idUsuario: number): Promise<EncabezadoFactura[]>;
  getFacturasByVendedor(idVendedor: number): Promise<EncabezadoFactura[]>;
}
