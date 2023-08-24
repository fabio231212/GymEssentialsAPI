import { DetalleFactura, EncabezadoFactura, Producto } from '@prisma/client';

import { IFacturaRepository } from '../../infrastructure/Interfaces/IFacturaRepository';
import { PrismaFacturaRepository } from '../../infrastructure/PrismaFacturaRepository';

export class FacturaUseCase {
  private facturaRepository: IFacturaRepository;

  constructor() {
    this.facturaRepository = new PrismaFacturaRepository();
  }
  getNumVentasCurrentDay = async (): Promise<number> => {
    return this.facturaRepository.getNumVentasCurrentDay();
  }
  getTop5ProductosMasVendidos = async (): Promise<any[]> => {
    return this.facturaRepository.getTop5ProductosMasVendidos();
  }
  getFacturasByUsuario = async (
    idUsuario: number
  ): Promise<EncabezadoFactura[]> => {
    return this.facturaRepository.getFacturasByUsuario(idUsuario);
  };
  getProductosByIdVendedor = async (
    idVendedor: number
  ): Promise<DetalleFactura[]> => {
    return this.facturaRepository.getProductosByVendedor(idVendedor);
  };

  getFacturasById = async (id: number): Promise<EncabezadoFactura> => {
    return this.facturaRepository.getFacturasById(id);
  };

  actualizarEstadoPedido = async (id: number, estado: number) => {
    return this.facturaRepository.actualizarEstadoPedido(id, estado);
  }

  getVentasPorMesByVendedor = async (idVendedor: number): Promise<any[]> => {
    return this.facturaRepository.getVentasPorMesByVendedor(idVendedor);
  }

  
}
