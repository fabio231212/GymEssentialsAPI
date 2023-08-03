import { ComentarioProducto, PrismaClient } from "@prisma/client";
import { IComentarioProducto } from "./Interfaces/IComentarioProducto";

export class PrismaComentarioProductoRp  implements IComentarioProducto{
    private prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
    saveComentarioProducto(comentarioProducto: ComentarioProducto): Promise<ComentarioProducto> {
        try {
            return this.prisma.comentarioProducto.create({
                data: comentarioProducto,
                include:{usuario:true}
            })
          } catch (error) {
            console.error(error);
            throw new Error("Error al crear el comentario");
          }
    }
    
}