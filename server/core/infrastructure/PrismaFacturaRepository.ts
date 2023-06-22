import { EncabezadoFactura, PrismaClient, Producto } from '@prisma/client';
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

  getFacturasByUsuario = async (idUsuario: number): Promise<EncabezadoFactura[]> => {
    try {
      return this.prisma.encabezadoFactura.findMany({
        where: {usuarioId: idUsuario,},
        include: {
          usuario: true,
          detallesFactura: { include: { producto: true } },
          metodoPago: true
          //   direccion: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los pedidos del cliente');
    }
  };

  getFacturasById(id: number): Promise<EncabezadoFactura> {
    try {
      return this.prisma.encabezadoFactura.findUnique({
        where: { id: id },
        include: {
          usuario: true,
          detallesFactura: { include: { producto: true } },
          metodoPago: true,
          direccion: true,
        },
      }) as Promise<EncabezadoFactura>;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los pedidos del cliente');
    }
  }
}
