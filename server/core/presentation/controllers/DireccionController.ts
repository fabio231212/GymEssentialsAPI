import { Request, Response } from "express";
import { DireccionUseCase } from "../../application/usescases/DireccionUseCase";

export class DireccionController {
    public direccionUseCase: DireccionUseCase;

    constructor() {
        this.direccionUseCase = new DireccionUseCase();
    }

    getDireccionsByIdUser = async (req: Request, res: Response) => {
        try {
            const idUsuario = Number(req.params.idUsuario);
            const direcciones = await this.direccionUseCase.getDireccionesByUsuario(idUsuario);
            res.json(direcciones);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener las direcciones del usuario" });
        }
    }
}