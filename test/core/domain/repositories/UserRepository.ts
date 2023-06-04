// src/domain/repositories/UserRepository.ts

import { Usuario } from '@prisma/client';

export interface UserRepository {
  createUser(user: Usuario): Promise<Usuario>;
}
