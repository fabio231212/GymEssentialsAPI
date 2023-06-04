// src/domain/repositories/UserRepository.ts

import { Rol } from '@prisma/client';

export interface RolRepository {
  crearRol(rol: Rol): Promise<Rol>;
}
