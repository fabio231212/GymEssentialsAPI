import { DetalleFactura, EncabezadoFactura, PrismaClient, Producto } from "@prisma/client";
import { IFacturaRepository } from "./Interfaces/IFacturaRepository";
import { usuario } from "../../prisma/seeds/usuario.seed";
import { imagenProducto } from "../../prisma/seeds/imagenProducto.seed";

export class PrismaFacturaRepository implements IFacturaRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  createFactura(data: any): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // Crear método de pago
      if(data.metodoPago!=null){
      const metodoPago = await tx.metodoPago.create({
        data: data.encabezadoFactura.metodoPago,
      });
    

    if(data.direccion!=null){
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
      const detallesFactura = data.encabezadoFactura.detallesFactura.map((detalle: { encabezadosFacturaId: number; }) => {
        detalle.encabezadosFacturaId = encabezadoFactura.id;
        return detalle;
      });

      // Crear detalles de factura
      const detallesFacturaCreated = await tx.detalleFactura.createMany({
        data: detallesFactura,
      });

      return { encabezadoFactura, detallesFactura: detallesFacturaCreated };
    });
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
          producto: true,
          encabezadosFactura: true,
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
          detallesFactura: { include: { producto:{
            include: {
              imagenes : true
            }
          } } },
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
          detallesFactura: { include: { producto:{
            include: {
              imagenes : true
            }
          } } },
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
