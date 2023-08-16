import { IMetodoPagoRepository } from "../../infrastructure/Interfaces/IMetodoPagoRepository";
import { PrismaMetodoPagoRepository } from "../../infrastructure/PrismaMetodoPagoRepository";

export class MetodoPagoUseCase {
    private metodoPagoRepository: IMetodoPagoRepository;

    constructor() {
        this.metodoPagoRepository = new PrismaMetodoPagoRepository();
    }
    getMetodosPagoByUser = async (id: number) => {
        return await this.metodoPagoRepository.getMetodosPagoByUser(id);
    };
}