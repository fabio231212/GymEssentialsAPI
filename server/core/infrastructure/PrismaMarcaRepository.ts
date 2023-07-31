import { PrismaClient, marca } from "@prisma/client"; // Importa el modelo generado por Prisma
import { IMarcaRepository } from "./Interfaces/IMarcasRepository";

export class PrismaMarcaRepository implements IMarcaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //Obtiene todos los tamannos
  getMarcas(): Promise<marca[]> {
    try {
      return this.prisma.marca.findMany({
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener las marcas");
    }
  }
}