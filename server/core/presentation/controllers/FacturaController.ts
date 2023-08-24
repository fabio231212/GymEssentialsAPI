import { PrismaClient } from '@prisma/client';
import { FacturaUseCase } from '../../application/usescases/FacturaUseCase';
import e, { Request, Response } from 'express';
export class FacturaController {
  public facturaUseCase: FacturaUseCase;

  constructor() {
    this.facturaUseCase = new FacturaUseCase();
  }

  getVentasPorMesByVendedor = async (req: Request, res: Response) => {
    try {
      
    let idVendedor = parseInt(req.params.idVendedor);
    const ventas = await this.facturaUseCase.getVentasPorMesByVendedor(idVendedor);
    res.json(ventas);
  } catch (error) {
      console.log(error);
  }
  }

  getNumVentasCurrentDay = async (req: Request, res: Response) => {
    const cantidad = await this.facturaUseCase.getNumVentasCurrentDay();
    res.json(cantidad);
  }
  getTop5ProductosMasVendidos = async (req: Request, res: Response) => {
    const top5 = await this.facturaUseCase.getTop5ProductosMasVendidos();
    res.json(top5);
  }

  createFactura = async (req: Request, res: Response) => {
    const infoOrden = req.body;

    try {
      const prisma = new PrismaClient();

      const factura = await prisma.$transaction(async (tx) => {
        let direccion = null;
        let metodoPago = null;

        if (infoOrden.EncabezadoFactura.idDireccion === null) {
          direccion = await tx.direccionUsuario.create({
            data: {
              provincia: infoOrden.Direccion.provincia,
              canton: infoOrden.Direccion.canton,
              distrito: infoOrden.Direccion.distrito,
              sennas: infoOrden.Direccion.otrasSennas,
              codPostal: infoOrden.Direccion.zip,
              usuarioId: infoOrden.EncabezadoFactura.usuarioId,
            },
          });
        }

        if (infoOrden.EncabezadoFactura.metodoPagoId === null) {
          metodoPago = await tx.metodoPago.create({
            data: {
              numTarjeta: infoOrden.MetodoPago.numTarjeta,
              propietarioTarjeta: infoOrden.MetodoPago.propietarioTarjeta,
              mesVencimiento: infoOrden.MetodoPago.mesVencimiento,
              anioVencimiento: Number.parseInt(infoOrden.MetodoPago.anioVencimiento),
              idUsuario: infoOrden.EncabezadoFactura.usuarioId,
              
            },
          });
        }

        const encabezadoFactura = await tx.encabezadoFactura.create({
          data: {
            fechaCompra: infoOrden.EncabezadoFactura.fechaCompra,
            usuarioId: infoOrden.EncabezadoFactura.usuarioId,
            numTarjeta: infoOrden.EncabezadoFactura.numTarjeta,
            subTotal: infoOrden.EncabezadoFactura.subtotal,
            total: infoOrden.EncabezadoFactura.total,
            metodoPagoId: infoOrden.EncabezadoFactura.metodoPagoId || metodoPago?.id,
            IdDireccion: infoOrden.EncabezadoFactura.idDireccion || direccion?.id,
            estadoId: 1,
          },
        });

        const detallesFactura = await tx.detalleFactura.createMany({
          data: infoOrden.DetallesFactura.detalles.map((detalle: {
            cantidad: number;
            precioUnitario: number;
            productoId: number;
            estadoId: number;
          }) => ({
            cantidad: detalle.cantidad,
            precioUnitario: detalle.precioUnitario,
            encabezadosFacturaId: encabezadoFactura.id,
            productoId: detalle.productoId,
            estadoId: detalle.estadoId,
          })),
        });

        const stockUpdates = infoOrden.DetallesFactura.detalles.map((detalle: any) => ({
          id: detalle.productoId,
          cantidad: detalle.cantidad,
        }));

        await Promise.all(
          stockUpdates.map(async (update: any) => {
            const producto = await tx.producto.findUnique({
              where: { id: update.id },
            });

            if (producto) {
              const nuevoStock = producto.stock - update.cantidad;

              await tx.producto.update({
                where: { id: update.id },
                data: { stock: nuevoStock },
              });
            }
          })
        );

        return encabezadoFactura;
      });

      return res.json({ factura, message: 'Factura creada correctamente', success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Error al crear factura' });
    }
  };

  getFacturasByUsuario = async (req: Request, res: Response) => {
    let idUsuario = parseInt(req.params.idUsuario);
    const facturas = await this.facturaUseCase.getFacturasByUsuario(idUsuario);
    res.json(facturas);
  };

  getProductosByVendedor = async (req: Request, res: Response) => {
    try {
      let idVendedor = parseInt(req.params.idVendedor);
    const facturas = await this.facturaUseCase.getProductosByIdVendedor(
      idVendedor
    );
    res.json(facturas);
    }catch(e){
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  };

  getFacturasById = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    const facturas = await this.facturaUseCase.getFacturasById(id);
    res.json(facturas);
  };

  actualizarEstadoPedido = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let estado = parseInt(req.body.estado);
    const facturas = await this.facturaUseCase.actualizarEstadoPedido(id, estado);
    res.json(facturas);
  }
}
