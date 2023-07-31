import { PrismaClient, CategoriaProducto } from "@prisma/client"; // Importa el modelo generado por Prisma
import { ICategoriaRepository } from "./Interfaces/ICategoriaRepository";

export class PrismaCategoriaRepository implements ICategoriaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //Obtiene todos los tamannos
  getCategorias(): Promise<CategoriaProducto[]> {
    try {
      return this.prisma.categoriaProducto.findMany({
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener las marcas");
    }
  }
}