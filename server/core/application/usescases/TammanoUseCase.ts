import {tamanno } from "@prisma/client";
import { ITamannoRepository } from "../../infrastructure/Interfaces/ITamannosRepository";
import { PrismaTammanoRepository } from "../../infrastructure/PrismaTamannoRepository"; 

export class TammanoUseCase{
    private tamannoRepository: ITamannoRepository;

    constructor(){
        this.tamannoRepository = new PrismaTammanoRepository();
    }

    getTammanos= async (): Promise<tamanno[]> => {
        return this.tamannoRepository.getTammanos();
    }
}