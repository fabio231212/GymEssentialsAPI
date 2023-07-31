import { TammanoUseCase } from '../../application/usescases/TammanoUseCase';
import { Request, Response } from 'express';

export class tammanoController {
  public tammanoUseCase: TammanoUseCase;

  constructor() {
    this.tammanoUseCase = new TammanoUseCase();
  }

  gettammanos = async (req: Request, res: Response) => {
    const tammanos = await this.tammanoUseCase.getTammanos();
    res.json(tammanos);
  };
}