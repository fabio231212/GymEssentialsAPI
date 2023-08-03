
import { Request, Response } from 'express';
import { ComentarioProductoUseCase } from '../../application/usescases/ComentarioProductoUseCase';

export class ComentarioProdController {
  public comentarioUseCase: ComentarioProductoUseCase;

  constructor() {
    this.comentarioUseCase = new ComentarioProductoUseCase();
  }

  save = async (req: Request, res: Response) => {
    const comentario = await this.comentarioUseCase.saveComentarioProducto(req.body);
    res.json(comentario);
  };
}