// src/domain/repositories/UserRepository.ts

import { Usuario } from '@prisma/client';

export interface IUserRepository {
  getCountCompradores(): Promise<number>;
  getCantidadVendedores(): Promise<number>;
  createUser(user: Usuario): Promise<Usuario>;
  login(email: string, password: string): Promise<any | null>;
  getUsuarios(): Promise<Usuario[]>;
  updateHabilitado(id: number, habilitado: boolean): Promise<Usuario>;
  getTop5Vendedores(): Promise<any[]>;
  getTop3Worst(): Promise<any[]>;

  getCompradorConMasComprasXVendedor(idVendedor: number): Promise<any[]>;
  getEvaluacionesVendedor(idVendedor: any): Promise<any[]>;
}
