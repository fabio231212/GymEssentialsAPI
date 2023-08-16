import { MetodoPagoUseCase } from "../../application/usescases/MetodoPagoUseCase";
import { Request, Response } from 'express';
export class MetodoPagoController {
    private metodoPagoUseCase: MetodoPagoUseCase;

    constructor() {
        this.metodoPagoUseCase = new MetodoPagoUseCase();
    }

    getMetodosPagoByUser = async (req: Request, res: Response) => {
        try {
            const idUsuario = Number(req.params.id);
            const metodosPago = await this.metodoPagoUseCase.getMetodosPagoByUser(idUsuario);
            res.json(metodosPago);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };
}