import {
  DetalleFactura,
  EncabezadoFactura,
  PrismaClient,
  Producto,
} from "@prisma/client";
import { IFacturaRepository } from "./Interfaces/IFacturaRepository";
import { usuario } from "../../prisma/seeds/usuario.seed";
import { imagenProducto } from "../../prisma/seeds/imagenProducto.seed";





export class PrismaFacturaRepository implements IFacturaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async actualizarEstadoPedido(id: number, estado: number): Promise<any> {
    try {
      // Actualiza el estado del detalleFactura
      const detalleFacturaActualizado = await this.prisma.detalleFactura.update(
        {
          where: { id: id },
          data: { estadoId: estado },
        }
      );

      // Obtén el encabezadoFactura
      const encabezadoFactura = await this.prisma.encabezadoFactura.findUnique({
        where: { id: detalleFacturaActualizado.encabezadosFacturaId },
        include: {
          detallesFactura: true,
        },
      });

      // Verifica si todos los detalles están entregados
      const todosLosDetallesEntregados =
        encabezadoFactura?.detallesFactura.every(
          (detalleFactura: { estadoId: number }) =>
            detalleFactura.estadoId === 3
        );

      // Verifica si al menos un detalle está entregado
      const hayUnDetalleEntregado = encabezadoFactura?.detallesFactura.some(
        (detalleFactura) => detalleFactura.estadoId === 3
      );

      // Verifica si el estado del encabezadoFactura ya está en progreso
      const encabezadoFacturaEnProgreso = encabezadoFactura?.estadoId === 2;

      // Actualiza el estado del encabezadoFactura si todos los detalles están entregados
      if (todosLosDetallesEntregados) {
        await this.prisma.encabezadoFactura.update({
          where: { id: encabezadoFactura?.id },
          data: { estadoId: 3 },
        });
      } else if (hayUnDetalleEntregado && !encabezadoFacturaEnProgreso) {
        // Actualiza el estado del encabezadoFactura a En Progreso
        await this.prisma.encabezadoFactura.update({
          where: { id: encabezadoFactura?.id },
          data: { estadoId: 2 },
        });
      }

      return detalleFacturaActualizado;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el estado del pedido");
    }
  }

  createFactura(data: any): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // Crear método de pago
      if (data.metodoPago != null) {
        const metodoPago = await tx.metodoPago.create({
          data: data.encabezadoFactura.metodoPago,
        });

        if (data.direccion != null) {
          // Crear dirección
          const direccion = await tx.direccionUsuario.create({
            data: data.encabezadoFactura.direccion,
          });

          // Asociar dirección y método de pago al encabezado de factura
          data.encabezadoFactura.metodoPagoId = metodoPago.id;
          data.encabezadoFactura.IdDireccion = direccion.id;
        }
      }
      // Crear encabezado de factura
      const encabezadoFactura = await tx.encabezadoFactura.create({
        data: data.encabezadoFactura,
      });

      // Asociar encabezado de factura a los detalles de factura
      const detallesFactura = data.encabezadoFactura.detallesFactura.map(
        (detalle: { encabezadosFacturaId: number }) => {
          detalle.encabezadosFacturaId = encabezadoFactura.id;
          return detalle;
        }
      );
    });
  }
  async getTop5ProductosMasVendidos(): Promise<any[]> {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const topProducts = await this.prisma.$queryRaw<any[]>`
      SELECT
        p.nombre AS name,
        SUM(df.cantidad) AS value
      FROM
        DetalleFactura df
        JOIN Producto p ON df.productoId = p.id
        JOIN EncabezadoFactura ef ON df.encabezadosFacturaId = ef.id
      WHERE
        ef.fechaCompra >= ${firstDayOfMonth}
      GROUP BY
       p.nombre
      ORDER BY
        value DESC
      LIMIT 5;
    `;


    return topProducts;
  }



  async getNumVentasCurrentDay(): Promise<number> {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const cantidad: number = await this.prisma.encabezadoFactura.count({
        where: {
          fechaCompra: {
            gte: startOfDay,
          },
        },
      });
      return cantidad;
    } catch (error) {
      // Manejo de errores aquí
      throw error; // Puedes lanzar o manejar el error según tus necesidades
    }
  }


  getProductosByVendedor(idVendedor: number): Promise<DetalleFactura[]> {
    try {
      return this.prisma.detalleFactura.findMany({
        where: {
          producto: {
            usuarioId: idVendedor,
          },
        },
        include: {
          producto: {
            include: {
              imagenes: true,
            },
          },
          encabezadosFactura: {
            include: {
              usuario: true,
            },
          },
          estadoPedido: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los productos del vendedor");
    }
  }

  getFacturasByUsuario = async (
    idUsuario: number
  ): Promise<EncabezadoFactura[]> => {
    try {
      return this.prisma.encabezadoFactura.findMany({
        where: { usuarioId: idUsuario },
        include: {
          usuario: true,
          detallesFactura: {
            include: {
              producto: {
                include: {
                  imagenes: true,
                },
              },
            },

          },
          metodoPago: true,
          estadoPedido: true,
          //   direccion: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los pedidos del cliente");
    }
  };

  getFacturasById(id: number): Promise<EncabezadoFactura> {
    try {
      return this.prisma.encabezadoFactura.findUnique({
        where: { id: id },
        include: {
          usuario: true,
          detallesFactura: {
            include: {
              producto: {
                include: {
                  imagenes: true,
                },
              },
            },

          },
          metodoPago: true,
          direccion: true,
          //  direccion: true,
        },
      }) as Promise<EncabezadoFactura>;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los pedidos del cliente");
    }
  }

}
