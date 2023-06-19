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
}
