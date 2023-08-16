import { MetodoPago, PrismaClient } from "@prisma/client";
import { IMetodoPagoRepository } from "./Interfaces/IMetodoPagoRepository";

export class PrismaMetodoPagoRepository implements IMetodoPagoRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    
    getMetodosPagoByUser = async (id: number): Promise<MetodoPago[]> => {
        try {
        return this.prisma.metodoPago.findMany({
            where: {
            idUsuario: id,
            },
        });
        } catch (error) {
        console.error(error);
        throw new Error("Error al obtener los metodos de pago del usuario");
        }
    };
}