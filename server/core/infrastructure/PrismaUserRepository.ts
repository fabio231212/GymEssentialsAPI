// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Rol, Usuario } from "@prisma/client"; // Importa el modelo generado por Prisma
import { IUserRepository } from "./Interfaces/IUserRepository";
import e from "express";
import { connect } from "http2";

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getUsuarios(): Promise<Usuario[]> {
    try {
      return this.prisma.usuario.findMany({
        include: {
          roles: true
        },
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener los usuarios");
    }
  }
  updateHabilitado(id: number, habilitado: boolean): Promise<Usuario> {
    try {
      return this.prisma.usuario.update({
        where: {
          id: id,
        },
        data: {
          habilitado: habilitado,
        },
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al actualizar el usuario");
    }
  }

  async createUser(user: any): Promise<Usuario> {
    try {
      const nuevoUsuario = await this.prisma.usuario.create({
        data: {
          nombre: user.nombre,
          apellidos: user.apellidos,
          cedula: user.cedula,
          clave: user.clave,
          email: user.email,
          numCelular: user.numCelular,
          roles : {
            connect : user.roles
          }
        },
      });
      return nuevoUsuario;
    } catch (error) {
      throw new Error("Error al crear el usuario");
    }
  }

  async login(email: string, password: string): Promise<any | null> {
    console.log(email + password)
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: {
          email: email,
        },
        include: {
          roles: true,
        },
      });

      // Se encontró el usuario
      if (usuario) {
        return usuario;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al iniciar sesión");
    }
  }
}
