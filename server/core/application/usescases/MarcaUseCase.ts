import {marca } from "@prisma/client";
import { IMarcaRepository } from "../../infrastructure/Interfaces/IMarcasRepository";
import { PrismaMarcaRepository } from "../../infrastructure/PrismaMarcaRepository"; 

export class MarcaUseCase{
    private marcaRepository: IMarcaRepository;

    constructor(){
        this.marcaRepository = new PrismaMarcaRepository();
    }

    getMarcas= async (): Promise<marca[]> => {
        return this.marcaRepository.getMarcas();
    }
}