
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
  getTopProductoByVendedor(id: number): Promise<any>;
  getTopCategoriesByVendedor(id: number): Promise<any>;
  getProdCountByCategory(): Promise<any>;
  getProductsSinStockByVendedor(id: number): Promise<any>;
  getPrrudctsConDescuentoByVendedor(id: number): Promise<any>;
}
