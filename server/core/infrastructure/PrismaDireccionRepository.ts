import { DireccionUsuario, PrismaClient } from "@prisma/client";
import { IDireccionRepository } from "./Interfaces/IDireccionRepository";

export class PrismaDireccionRepository implements IDireccionRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    getDireccionesByUsuario = async (idUsuario: number): Promise<DireccionUsuario[]> => {
        try {
            return this.prisma.direccionUsuario.findMany({
                where: { usuarioId: idUsuario },
            });
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener las direcciones del usuario");
        }
    }
}