
import { Producto } from '@prisma/client';

export interface IProductoRepository {
  getProductos(): Promise<Producto[]>;
    getProductoById(id: number): Promise<Producto>;
    getProductoByIdVendedor(id: number): Promise<Producto[]>;
    getProductsByCategory(id: number): Promise<Producto[]>;
    createProduct(producto: any): Promise<Producto>;
    editProduct(producto: any): Promise<Producto>;
    getProdructsByComentario(): Promise<any>;
    getProductsWithHigherDiscount(): Promise<any>;
    getNewProducts(): Promise<any>;
}
