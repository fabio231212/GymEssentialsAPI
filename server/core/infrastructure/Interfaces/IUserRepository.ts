// src/domain/repositories/UserRepository.ts

import { Usuario } from '@prisma/client';

export interface IUserRepository {
  createUser(user: Usuario): Promise<Usuario>;
}
