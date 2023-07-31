import { CategoriaUseCase  } from '../../application/usescases/CategoriaUseCase';
import { Request, Response } from 'express';

export class CategoriaController {
  public categoriaUseCase: CategoriaUseCase;

  constructor() {
    this.categoriaUseCase = new CategoriaUseCase();
  }

  getCategorias = async (req: Request, res: Response) => {
    const marcas = await this.categoriaUseCase.getcategorias();
    res.json(marcas);
  };
}