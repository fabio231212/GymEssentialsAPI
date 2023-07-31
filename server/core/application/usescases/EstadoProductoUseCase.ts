import {EstadoProducto } from "@prisma/client";
import { IEstadoProductoRepository } from "../../infrastructure/Interfaces/IEstadoProductoRepository";
import { PrismaEstadoProductoRepository } from "../../infrastructure/PrismaEstadoProductoRepository"; 

export class EstadoProductoUseCase{
    private estadoRepository: IEstadoProductoRepository;

    constructor(){
        this.estadoRepository = new PrismaEstadoProductoRepository();
    }

    getEstados= async (): Promise<EstadoProducto[]> => {
        return this.estadoRepository.getEstados();
    }
}