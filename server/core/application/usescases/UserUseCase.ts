// src/application/usecases/CreateUserUseCase.ts

import { Usuario } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IUserRepository } from '../../infrastructure/Interfaces/IUserRepository';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';

export class UserUseCase {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new PrismaUserRepository();
  }

  async CrearUsuario(user: Usuario): Promise<Usuario> {
    return this.userRepository.createUser(user);
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
