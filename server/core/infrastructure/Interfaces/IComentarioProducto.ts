import { ComentarioProducto } from "@prisma/client";

export interface IComentarioProducto {
    saveComentarioProducto(comentarioProducto: ComentarioProducto): Promise<ComentarioProducto>;
}