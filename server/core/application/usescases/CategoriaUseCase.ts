import {CategoriaProducto } from "@prisma/client";
import { ICategoriaRepository } from "../../infrastructure/Interfaces/ICategoriaRepository";
import { PrismaCategoriaRepository } from "../../infrastructure/PrismaCategoriaRepository"; 

export class CategoriaUseCase{
    private categoriaRepository: ICategoriaRepository;

    constructor(){
        this.categoriaRepository = new PrismaCategoriaRepository();
    }

    getcategorias= async (): Promise<CategoriaProducto[]> => {
        return this.categoriaRepository.getCategorias();
    }
}