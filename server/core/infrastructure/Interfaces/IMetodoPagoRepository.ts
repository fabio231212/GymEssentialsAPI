import { MetodoPago } from "@prisma/client";

export interface IMetodoPagoRepository {
    getMetodosPagoByUser(id: number): Promise<MetodoPago[]>;
}