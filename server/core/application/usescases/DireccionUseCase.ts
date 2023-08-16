
import { IDireccionRepository } from "../../infrastructure/Interfaces/IDireccionRepository";
import { PrismaDireccionRepository } from "../../infrastructure/PrismaDireccionRepository";
export class DireccionUseCase {
    private direccionRepository: IDireccionRepository;
    constructor() {
        this.direccionRepository = new PrismaDireccionRepository();

    }
    async getDireccionesByUsuario(idUsuario: number) {
        try {
            return await this.direccionRepository.getDireccionesByUsuario(idUsuario);
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las direcciones del usuario");
        }
    }
}