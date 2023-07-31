import { tamanno } from '@prisma/client';

export interface ITamannoRepository {
    getTammanos(): Promise<tamanno[]>;
}
