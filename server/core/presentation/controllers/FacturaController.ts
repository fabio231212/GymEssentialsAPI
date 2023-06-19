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

  getFacturasByVendedor = async (req: Request, res: Response) => {
    let idVendedor = parseInt(req.params.id);
    const facturas = await this.facturaUseCase.getFacturasByIdVendedor(
      idVendedor
    );
    res.json(facturas);
  };

  getFacturas = async (req: Request, res: Response) => {
    //const facturas = await this.facturaUseCase.getFacturasByUsuario(3);
    const ejm = {
      msg: 'hola',
    };
    res.json(ejm);
  };
}
