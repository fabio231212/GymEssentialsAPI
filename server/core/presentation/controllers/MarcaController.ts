import { MarcaUseCase } from '../../application/usescases/MarcaUseCase';
import { Request, Response } from 'express';

export class MarcaController {
  public marcaUseCase: MarcaUseCase;

  constructor() {
    this.marcaUseCase = new MarcaUseCase();
  }

  getMarcas = async (req: Request, res: Response) => {
    const marcas = await this.marcaUseCase.getMarcas();
    res.json(marcas);
  };
}