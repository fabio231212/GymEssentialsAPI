
import { Producto } from '@prisma/client';

export interface IProductoRepository {
  crearProducto(producto: Producto): Promise<Producto>;
  getProductos(): Promise<Producto[]>;
    getProductoById(id: number): Promise<Producto>;
    getProductoByIdVendedor(id: number): Promise<Producto[]>;

}
