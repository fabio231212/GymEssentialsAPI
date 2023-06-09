// src/application/usecases/CreateUserUseCase.ts

import { Usuario } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IUserRepository } from '../../infrastructure/Interfaces/IUserRepository';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';

export class UserUseCase {
  private userRepository: IUserRepository
  constructor() {
    this.userRepository = new PrismaUserRepository();
  }

  async CrearUsuario(user: Usuario): Promise<Usuario> {
    // Aquí puedes agregar lógica adicional, como validaciones o encriptación de contraseñas, antes de guardar el usuario
    return this.userRepository.createUser(user);
  }
}
