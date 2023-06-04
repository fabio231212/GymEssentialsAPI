// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Rol } from '@prisma/client'; // Importa el modelo generado por Prisma
import { RolRepository } from '../domain/repositories/RolRepository';


export class PrismaRolRepository implements RolRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async crearRol(rol: Rol): Promise<Rol> {
    this.prisma.$connect();
    return this.prisma.rol.create({ data: rol });
  }
}
