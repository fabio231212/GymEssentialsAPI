// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Rol, Usuario } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IUserRepository } from './Interfaces/IUserRepository';
import e from 'express';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(user: Usuario): Promise<Usuario> {
    return this.prisma.usuario.create({ data: user });
  }

  async login(email: string, password: string): Promise<Usuario | null> {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: {
          email,
        },
        include: {
          roles: true,
        },
      });

      // Se encontró el usuario y la contraseña coincide
      if (usuario && usuario.clave === password) {
        return usuario;

      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error al iniciar sesión');
    }
  }
}
