import { EvUsuarioUseCase } from "../../application/usescases/EvUsuarioUseCase";

export class EvUsuarioController {

    private evUsuarioUseCase: EvUsuarioUseCase;

    constructor() {
        this.evUsuarioUseCase = new EvUsuarioUseCase();
    }

    createEvaluacionUsuario = async (req: any, res: any) => {
        try {
            const evUsuario = await this.evUsuarioUseCase.createEvaluacionUsuario(req.body);
            const evaluacionUsuario = await this.evUsuarioUseCase.getEvaluacionUsuarioById(evUsuario.usuarioId);
            res.json(evaluacionUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json("Error al crear la evaluacion del usuario");
        }
    }

    getPromedioEvUsuario = async (req: any, res: any) => {
        try {
            const evUsuario = await this.evUsuarioUseCase.getPromedioEvUsuario(req.params.id);
            res.json(evUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json("Error al obtener el promedio de las evaluaciones del usuario");
        }
    }

    getEvaluacionUsuarioById = async (req: any, res: any) => {
        try {
            const evUsuario = await this.evUsuarioUseCase.getEvaluacionUsuarioById(req.params.id);
            res.json(evUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json("Error al obtener las evaluaciones del usuario");
        }
    }

}
