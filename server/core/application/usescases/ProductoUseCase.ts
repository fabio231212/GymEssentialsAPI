import { Producto } from "@prisma/client";
import { IProductoRepository } from "../../infrastructure/Interfaces/IProductoRepository";
import { PrismaProductoRepository } from "../../infrastructure/PrismaProductoRepository";

export class ProductoUseCase{
    private productoRepository: IProductoRepository;

    constructor(){
        this.productoRepository = new PrismaProductoRepository();
    }

    getProductos= async (): Promise<Producto[]> => {
        return this.productoRepository.getProductos();
    }
    getProductoByIdVendedor= async (idVendedor: number): Promise<Producto[]> => {
        return this.productoRepository.getProductoByIdVendedor(idVendedor);
    }
    getProductoById= async (id: number): Promise<Producto> => {
        return this.productoRepository.getProductoById(id);
    }
    getProductsByCategory= async (id: number): Promise<Producto[]> => {
        return this.productoRepository.getProductsByCategory(id);
    }
}