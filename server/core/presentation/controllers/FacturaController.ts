import { PrismaClient } from '@prisma/client';
import { FacturaUseCase } from '../../application/usescases/FacturaUseCase';
import e, { Request, Response } from 'express';
export class FacturaController {
  public facturaUseCase: FacturaUseCase;

  constructor() {
    this.facturaUseCase = new FacturaUseCase();
  }

  createFactura = async (req: Request, res: Response) => {
    const infoOrden = req.body;
    try {
      const prisma = new PrismaClient();
      const factura = await prisma.$transaction(async (tx) => {
        let direccion = null;
        let metodoPago = null;

        // Crear dirección si es necesario
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

        // Crear método de pago si es necesario
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

        // Crear encabezado de factura
        const encabezadoFactura = await tx.encabezadoFactura.create({
          data: {
            fechaCompra: infoOrden.EncabezadoFactura.fechaCompra,
            usuarioId: infoOrden.EncabezadoFactura.usuarioId,
            numTarjeta: infoOrden.EncabezadoFactura.numTarjeta,
            subTotal: infoOrden.EncabezadoFactura.subtotal,
            total: infoOrden.EncabezadoFactura.total,
            metodoPagoId: infoOrden.EncabezadoFactura.metodoPagoId || metodoPago?.id,
            IdDireccion: infoOrden.EncabezadoFactura.idDireccion || direccion?.id,

          },
        });

        // Crear detalles de factura
        const detallesFactura = await tx.detalleFactura.createMany({
          data: infoOrden.DetallesFactura.detalles.map((detalle: {
            cantidad: number;
            precioUnitario: number;
            productoId: number;
            estadoPedidoId: number;
          }) => ({
            cantidad: detalle.cantidad,
            precioUnitario: detalle.precioUnitario,
            encabezadosFacturaId: encabezadoFactura.id,
            productoId: detalle.productoId,
            estadoPedidoId: detalle.estadoPedidoId,
          })),
        });
      });
      return res.json(factura);
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
    let idVendedor = parseInt(req.params.idVendedor);
    const facturas = await this.facturaUseCase.getProductosByIdVendedor(
      idVendedor
    );
    res.json(facturas);
  };

  getFacturasById = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    const facturas = await this.facturaUseCase.getFacturasById(id);
    res.json(facturas);
  };
}
