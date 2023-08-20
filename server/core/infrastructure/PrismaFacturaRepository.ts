import { DetalleFactura, EncabezadoFactura, PrismaClient, Producto } from "@prisma/client";
import { IFacturaRepository } from "./Interfaces/IFacturaRepository";
import { usuario } from "../../prisma/seeds/usuario.seed";
import { imagenProducto } from "../../prisma/seeds/imagenProducto.seed";





export class PrismaFacturaRepository implements IFacturaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
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

    console.log(topProducts);

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
          encabezadosFactura: true,
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
                  imagenes: true
                }
              }
            }
          },
          metodoPago: true,
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
                  imagenes: true
                }
              }
            }
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
