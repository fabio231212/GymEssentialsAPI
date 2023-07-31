import { EstadoProducto } from '@prisma/client';

export interface IEstadoProductoRepository {
    getEstados(): Promise<EstadoProducto[]>;
}
