// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Rol, Usuario } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IUserRepository } from './Interfaces/IUserRepository';


export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(user: Usuario): Promise<Usuario> {
    
    return this.prisma.usuario.create({ data: user });
  }
}
