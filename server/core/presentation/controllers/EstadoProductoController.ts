import { EstadoProductoUseCase } from '../../application/usescases/EstadoProductoUseCase';
import { Request, Response } from 'express';

export class EstadoProductoController {
  public estadoUseCase: EstadoProductoUseCase;

  constructor() {
    this.estadoUseCase = new EstadoProductoUseCase();
  }

  getEstados = async (req: Request, res: Response) => {
    const estados = await this.estadoUseCase.getEstados();
    res.json(estados);
  };
}