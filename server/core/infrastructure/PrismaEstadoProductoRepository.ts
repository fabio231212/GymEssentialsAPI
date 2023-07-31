import { PrismaClient, EstadoProducto } from "@prisma/client"; // Importa el modelo generado por Prisma
import { IEstadoProductoRepository } from "./Interfaces/IEstadoProductoRepository";

export class PrismaEstadoProductoRepository implements IEstadoProductoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //Obtiene todos los estados
  getEstados(): Promise<EstadoProducto[]> {
    try {
      return this.prisma.estadoProducto.findMany({
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener los estados de los productos");
    }
  }
}