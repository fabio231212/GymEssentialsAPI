// src/application/usecases/CreateUserUseCase.ts

import { Rol } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IRolRepository } from '../../infrastructure/Interfaces/IRolRepository';
import { PrismaRolRepository } from '../../infrastructure/PrismaRolRepository';


export class RolUseCase {
  private rolRepository: IRolRepository
  constructor() {
    this.rolRepository = new PrismaRolRepository();
  }

  async CrearRol(rol: Rol): Promise<Rol> {
    // Aquí puedes agregar lógica adicional, como validaciones o encriptación de contraseñas, antes de guardar el usuario
    return this.rolRepository.crearRol(rol);
  }

  getRol = async (): Promise<Rol[]> => {
    return this.rolRepository.getRol();
}
}
