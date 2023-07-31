import { PrismaClient, tamanno } from "@prisma/client"; // Importa el modelo generado por Prisma
import { ITamannoRepository } from "./Interfaces/ITamannosRepository";

export class PrismaTammanoRepository implements ITamannoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //Obtiene todos los tamannos
  getTammanos(): Promise<tamanno[]> {
    try {
      return this.prisma.tamanno.findMany({
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener los tamaños");
    }
  }
}