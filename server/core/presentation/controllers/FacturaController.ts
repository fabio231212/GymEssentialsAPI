import { FacturaUseCase } from '../../application/usescases/FacturaUseCase';
import e, { Request, Response } from 'express';
export class FacturaController {
  public facturaUseCase: FacturaUseCase;

  constructor() {
    this.facturaUseCase = new FacturaUseCase();
  }

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
