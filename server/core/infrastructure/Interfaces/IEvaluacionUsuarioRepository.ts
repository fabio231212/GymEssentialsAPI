import { CalificacionUsuario } from "@prisma/client";

export interface IEvaluacionUsuarioRepository {
    createEvaluacionUsuario(data: any): Promise<CalificacionUsuario>;

    getEvaluacionUsuarioById(id: number): Promise<CalificacionUsuario[] | null>;

    getPromedioEvUsuario(id: number): Promise<any>;
}