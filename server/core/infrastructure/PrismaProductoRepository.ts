// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Producto } from '@prisma/client'; // Importa el modelo generado por Prisma
import { IProductoRepository } from './Interfaces/IProductoRepository';


export class PrismaProductoRepository implements IProductoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getProductoByIdVendedor(id: number): Promise<Producto[]> {
    try {
      return this.prisma.producto.findMany({where: {usuarioId: id}});
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los productos del vendedor');
    }
  }
    crearProducto(producto: Producto): Promise<Producto> {
        throw new Error('Method not implemented.');
    }
    getProductos(): Promise<Producto[]> {
      try {
        return this.prisma.producto.findMany({
          include: {
            categoriaProducto: true,
            usuario: {select: {nombre: true, email: true}},
            imagenes: true,
            estadoProducto: {select: {descripcion: true}},
            comentarios: true,
         }});
      } catch (error) {
        // Manejo de errores
        console.error(error);
        throw new Error('Error al obtener los productos');
      }
    }
    getProductoById(id: number): Promise<Producto> {
        throw new Error('Method not implemented.');
    }


}
