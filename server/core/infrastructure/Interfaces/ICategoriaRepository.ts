import { CategoriaProducto } from '@prisma/client';

export interface ICategoriaRepository {
    getCategorias(): Promise<CategoriaProducto[]>;
}
