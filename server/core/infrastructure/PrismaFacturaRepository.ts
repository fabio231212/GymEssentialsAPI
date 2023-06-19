import { EncabezadoFactura, PrismaClient } from '@prisma/client';
import { IFacturaRepository } from './Interfaces/IFacturaRepository';
import { usuario } from '../../prisma/seeds/usuario.seed';

export class PrismaFacturaRepository implements IFacturaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  getFacturasByVendedor(idVendedor: number): Promise<EncabezadoFactura[]> {
    try {
      return this.prisma.encabezadoFactura.findMany({
        where: {
          detallesFactura: {
            some: {
              producto: {
                usuarioId: idVendedor,
              },
            },
          },
        },
        include: {
          usuario: true,
          detallesFactura: {
            include: {
              producto: true,
            },
          },
          metodoPago: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los pedidos del cliente');
    }
  }
  getFacturasByUsuario = async (
    idUsuario: number
  ): Promise<EncabezadoFactura[]> => {
    try {
      return this.prisma.encabezadoFactura.findMany({
        include: {
          usuario: true,
          detallesFactura: { include: { producto: true } },
          metodoPago: true,
          //   direccion: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los pedidos del cliente');
    }
  };
}
