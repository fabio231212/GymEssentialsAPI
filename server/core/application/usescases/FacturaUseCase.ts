import { EncabezadoFactura, Producto } from '@prisma/client';

import { IFacturaRepository } from '../../infrastructure/Interfaces/IFacturaRepository';
import { PrismaFacturaRepository } from '../../infrastructure/PrismaFacturaRepository';

export class FacturaUseCase {
  private facturaRepository: IFacturaRepository;

  constructor() {
    this.facturaRepository = new PrismaFacturaRepository();
  }

  getFacturasByUsuario = async (
    idUsuario: number
  ): Promise<EncabezadoFactura[]> => {
    return this.facturaRepository.getFacturasByUsuario(idUsuario);
  };
  getProductosByIdVendedor = async (
    idVendedor: number
  ): Promise<Producto[]> => {
    return this.facturaRepository.getProductosByVendedor(idVendedor);
  };

  getFacturasById = async (id: number): Promise<EncabezadoFactura> => {
    return this.facturaRepository.getFacturasById(id);
  };
}
