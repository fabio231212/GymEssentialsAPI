// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Rol } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IRolRepository } from './Interfaces/IRolRepository';


export class PrismaRolRepository implements IRolRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async crearRol(rol: Rol): Promise<Rol> {
    this.prisma.$connect();
    return this.prisma.rol.create({ data: rol });
  }

    //Obtiene todos los tamannos
    getRol(): Promise<Rol[]> {
      try {
        return this.prisma.rol.findMany({
          where:{
            NOT: {
              id: 1
            }
          }
        });
      } catch (error) {
        // Manejo de errores
        console.error(error);
        throw new Error("Error al obtener los roles");
      }
    }
}
