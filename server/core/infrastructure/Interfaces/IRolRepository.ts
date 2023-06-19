// src/domain/repositories/UserRepository.ts

import { Rol } from '@prisma/client';

export interface IRolRepository {
  crearRol(rol: Rol): Promise<Rol>;
}
