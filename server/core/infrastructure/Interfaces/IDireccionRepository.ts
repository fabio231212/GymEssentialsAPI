import { DireccionUsuario } from "@prisma/client";

export interface IDireccionRepository {
    getDireccionesByUsuario(idUsuario: number): Promise<DireccionUsuario[]>;

}