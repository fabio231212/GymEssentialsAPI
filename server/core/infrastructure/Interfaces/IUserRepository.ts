// src/domain/repositories/UserRepository.ts

import { Usuario } from '@prisma/client';

export interface IUserRepository {
  createUser(user: Usuario): Promise<Usuario>;
  login(email: string, password: string): Promise<any | null>;
}
