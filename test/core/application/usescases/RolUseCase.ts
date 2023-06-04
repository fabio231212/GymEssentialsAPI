// src/application/usecases/CreateUserUseCase.ts

import { Rol } from '@prisma/client'; // Importa el modelo generado por Prisma
import { RolRepository } from '../../domain/repositories/RolRepository';
import { PrismaRolRepository } from '../../infrastructure/PrismaRolRepository';


export class RolUseCase {
  private rolRepository: RolRepository
  constructor() {
    this.rolRepository = new PrismaRolRepository();
  }

  async CrearRol(rol: Rol): Promise<Rol> {
    // Aquí puedes agregar lógica adicional, como validaciones o encriptación de contraseñas, antes de guardar el usuario
    return this.rolRepository.crearRol(rol);
  }
}
