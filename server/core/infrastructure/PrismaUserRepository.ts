// src/infrastructure/database/PrismaUserRepository.ts

import { PrismaClient, Rol, Usuario } from "@prisma/client"; // Importa el modelo generado por Prisma
import { IUserRepository } from "./Interfaces/IUserRepository";
import { parse } from "path";

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  getCountCompradores(): Promise<number> {
    try {
      return this.prisma.usuario.count({
        where: {
          roles: {
            some: {
              descripcion: 'comprador'
            }
          }
        }
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener la cantidad de usuarios compradores");
    }
  }

  getEvaluacionesVendedor(idVendedor: any): Promise<any[]> {
    return this.prisma.$queryRaw<any[]>`
    SELECT
      CONCAT('Calificacion ', C.calificacion) as name,
      COALESCE(COUNT(CU.calificacion), 0) as value
    FROM
      (
        SELECT DISTINCT calificacion
        FROM CalificacionUsuario
      ) AS C
    LEFT JOIN
      CalificacionUsuario CU
    ON
      C.calificacion = CU.calificacion
      AND CU.isVendedor = true
      AND CU.usuarioId = ${idVendedor}
    GROUP BY
      C.calificacion
    ORDER BY
      C.calificacion;
  `;

  }
  getCompradorConMasComprasXVendedor(idVendedor: number): Promise<any[]> {
    return this.prisma.$queryRaw<any[]>`  SELECT
    CONCAT(U.nombre, ' ', U.apellidos) AS name,
    SUM(DF.cantidad) AS value
FROM Usuario AS U
JOIN EncabezadoFactura AS EF ON U.id = EF.usuarioId
JOIN DetalleFactura AS DF ON EF.id = DF.encabezadosFacturaId
JOIN Producto AS P ON DF.productoId = P.id
WHERE P.usuarioId = ${idVendedor}
GROUP BY name
ORDER BY value DESC
LIMIT 5;`;
  }
  getCantidadVendedores(): Promise<number> {
    try {
      return this.prisma.usuario.count({
        where: {
          roles: {
            some: {
              descripcion: 'vendedor'
            }
          }
        }
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener la cantidad de usuarios");
    }
  }
  async getTop5Vendedores(): Promise<any[]> {
    const topVendedores = await this.prisma.$queryRaw<any[]>`
    SELECT
        u.nombre AS name,
        AVG(cu.calificacion) AS value
      FROM
        CalificacionUsuario cu
        JOIN Usuario u ON cu.usuarioId = u.id
      WHERE
        cu.isVendedor = true
      GROUP BY
        cu.usuarioId, u.nombre
      ORDER BY
        value DESC
      LIMIT 5;
  `;

    return topVendedores;
  }

  async getTop3Worst(): Promise<any[]> {
    const topVendedores = await this.prisma.$queryRaw<any[]>`

    SELECT
      u.nombre AS name,
      AVG(cu.calificacion) AS value
    FROM
      CalificacionUsuario cu
      JOIN Usuario u ON cu.usuarioId = u.id
    WHERE
      cu.isVendedor = true
    GROUP BY
      u.nombre
    ORDER BY
      value ASC
    LIMIT 3;
  `;

    return topVendedores;
  }

  getUsuarios(): Promise<Usuario[]> {
    try {
      return this.prisma.usuario.findMany({
        include: {
          roles: true,
        },
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al obtener los usuarios");
    }
  }
  updateHabilitado(id: number, habilitado: boolean): Promise<Usuario> {
    try {
      return this.prisma.usuario.update({
        where: {
          id: id,
        },
        data: {
          habilitado: habilitado,
        },
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al actualizar el usuario");
    }
  }

  async createUser(user: any): Promise<Usuario> {
    try {
      const nuevoUsuario = await this.prisma.usuario.create({
        data: {
          nombre: user.nombre,
          apellidos: user.apellidos,
          cedula: user.cedula,
          clave: user.clave,
          email: user.email,
          numCelular: user.numCelular,
          fotoPerfil:
            process.env.URL_IMAGENES +
            user.nombre.replace(/\s/g, "") +
            user.apellidos.replace(/\s/g, "") +
            user.cedula.replace(/\s/g, "") +
            ".jpg",
          roles: {
            connect: JSON.parse(user.roles),
          },
        },
      });

      if (user?.propietarioTarjeta) {
        await this.prisma.metodoPago.createMany({
          data: {
            propietarioTarjeta: user.propietarioTarjeta,
            numTarjeta: user.numeroTarjeta,
            anioVencimiento: parseInt(user.anioVencimiento),
            mesVencimiento: user.mesVencimiento,
            idUsuario: nuevoUsuario.id,
          },
        });
      }

      if (user.provincia) {
        await this.prisma.direccionUsuario.createMany({
          data: {
            provincia: user.provincia,
            canton: user.canton,
            distrito: user.distrito,
            sennas: user.otrasSennas,
            codPostal: user.zip,
            usuarioId: nuevoUsuario.id,
          },
        });
      }
      return nuevoUsuario;
    } catch (error) {
      throw new Error("Error al crear el usuario");
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<any | null> {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: {
          email: email,
        },
        include: {
          roles: true,
        },
      });

      // Se encontró el usuario
      if (usuario) {
        return usuario;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al iniciar sesión");
    }
  }
}
