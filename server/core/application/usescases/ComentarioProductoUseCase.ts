import { ComentarioProducto } from "@prisma/client";
import { comentariosProducto } from "../../../prisma/seeds/comentariosProducto.seed";
import { IComentarioProducto } from "../../infrastructure/Interfaces/IComentarioProducto";
import { PrismaComentarioProductoRp } from "../../infrastructure/PrismaComentarioRepository";

export class ComentarioProductoUseCase {
    private comentarioRepository: IComentarioProducto;
    

    constructor(){
        this.comentarioRepository = new PrismaComentarioProductoRp();
    }


    async saveComentarioProducto(comentarioProducto: ComentarioProducto): Promise<ComentarioProducto> {
        return await this.comentarioRepository.saveComentarioProducto(comentarioProducto);

    }
    


  
}