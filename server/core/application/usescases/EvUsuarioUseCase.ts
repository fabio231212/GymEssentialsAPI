
import { IEvaluacionUsuarioRepository } from "../../infrastructure/Interfaces/IEvaluacionUsuarioRepository";
import { PrismaEvUsuarioRepository } from "../../infrastructure/PrismaEvUsuarioRepository";

export class EvUsuarioUseCase {
    private evUsuarioRepository: IEvaluacionUsuarioRepository;

    constructor() {
        this.evUsuarioRepository = new PrismaEvUsuarioRepository();
    }


    async createEvaluacionUsuario(data: any) {
        const evUsuario = await this.evUsuarioRepository.createEvaluacionUsuario(data);
        return evUsuario;
    }

    async getEvaluacionUsuarioById(id: number) {
        const evUsuario = await this.evUsuarioRepository.getEvaluacionUsuarioById(id);
        return evUsuario;
    }

    async getPromedioEvUsuario(id: number) {
        const evUsuario = await this.evUsuarioRepository.getPromedioEvUsuario(id);
        return evUsuario;
    }
}