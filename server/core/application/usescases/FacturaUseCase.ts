import { EncabezadoFactura, Producto } from "@prisma/client";
import { IProductoRepository } from "../../infrastructure/Interfaces/IProductoRepository";
import { PrismaProductoRepository } from "../../infrastructure/PrismaProductoRepository";
import { IFacturaRepository } from "../../infrastructure/Interfaces/IFacturaRepository";
import { PrismaFacturaRepository } from "../../infrastructure/PrismaFacturaRepository";

export class FacturaUseCase{
    private facturaRepository: IFacturaRepository;

    constructor(){
        this.facturaRepository = new PrismaFacturaRepository();
    }

    getFacturasByUsuario= async (idUsuario:number): Promise<EncabezadoFactura[]> => {
        return this.facturaRepository.getFacturasByUsuario(idUsuario);
    }
    getFacturasByIdVendedor= async (idVendedor:number): Promise<EncabezadoFactura[]> => {
        return this.facturaRepository.getFacturasByVendedor(idVendedor);
    }

}