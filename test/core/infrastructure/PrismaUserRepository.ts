// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Rol, Usuario } from '@prisma/client'; // Importa el modelo generado por Prisma
import { UserRepository } from '../domain/repositories/UserRepository';


export class PrismaUserRepository implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(user: Usuario): Promise<Usuario> {
    const rol: Rol = {
      id: 1,
      descripcion : "Admin"
    }
    this.prisma.$connect();
    
    return this.prisma.usuario.create({ data: user });
  }
}
