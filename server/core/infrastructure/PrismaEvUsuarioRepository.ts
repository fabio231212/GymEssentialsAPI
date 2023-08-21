import { CalificacionUsuario, PrismaClient } from "@prisma/client";
import { IEvaluacionUsuarioRepository } from "./Interfaces/IEvaluacionUsuarioRepository";

export class PrismaEvUsuarioRepository implements IEvaluacionUsuarioRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    async getPromedioEvUsuario(usuarioId: number): Promise<{ promedio: any }> {


        const result = await this.prisma.$queryRaw<any>`
        SELECT
          AVG(calificacion) as promedio
        FROM
          CalificacionUsuario
        WHERE
          usuarioId = ${usuarioId}
        GROUP BY
          usuarioId;
      `;

        return result as any;
    }

    createEvaluacionUsuario(data: any): Promise<CalificacionUsuario> {
        try {
            const evaluacionUsuario = this.prisma.calificacionUsuario.create({
                data: {
                    isVendedor: data.isVendedor,
                    calificacion: data.calificacion,
                    comentario: data.comentario,
                    usuarioId: data.usuarioId,
                }
            });
            return evaluacionUsuario;
        } catch (error) {
            console.error(error);
            throw new Error("Error al crear la evaluacion del usuario");
        }
    }
    getEvaluacionUsuarioById(id: number): Promise<CalificacionUsuario[] | null> {
        try {
            const evaluacionUsuario = this.prisma.calificacionUsuario.findMany({
                where: {
                    usuarioId: id,
                },
                include: {
                    usuario: true,
                }
            });
            return evaluacionUsuario;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener la evaluacion del usuario");
        }
    }

}