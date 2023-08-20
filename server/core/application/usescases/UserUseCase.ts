// src/application/usecases/CreateUserUseCase.ts

import { Usuario } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IUserRepository } from '../../infrastructure/Interfaces/IUserRepository';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';

export class UserUseCase {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new PrismaUserRepository();
  }


  async getCantidadUsuarios(): Promise<number> {
    return this.userRepository.getCantidadUsuarios();
  }

  async CrearUsuario(user: Usuario): Promise<Usuario> {
    return this.userRepository.createUser(user);
  }

  async getTop5Vendedores(): Promise<any[]> {
    return this.userRepository.getTop5Vendedores();
  }
  async getTop3Worst(): Promise<any[]> {
    return this.userRepository.getTop3Worst();
  }

  async login(email: string, password: string): Promise<any | null> {
    return this.userRepository.login(email, password);
  }

  async getUsuarios(): Promise<Usuario[]> {
    return this.userRepository.getUsuarios();
  }

  async updateHabilitado(id: number, habilitado: boolean): Promise<Usuario> {
    return this.userRepository.updateHabilitado(id, habilitado);
  }
}
