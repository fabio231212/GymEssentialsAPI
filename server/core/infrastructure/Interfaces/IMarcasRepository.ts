import { marca } from '@prisma/client';

export interface IMarcaRepository {
    getMarcas(): Promise<marca[]>;
}
