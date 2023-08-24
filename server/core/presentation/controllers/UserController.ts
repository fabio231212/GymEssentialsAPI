import { Request, Response } from "express";
import { UserUseCase } from "../../application/usescases/UserUseCase";
import { PrismaClient, Usuario, Rol, Prisma } from "@prisma/client"; // Asegúrate de importar PrismaClient y los tipos de Usuario y Rol correctamente
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
export class UserController {
  public userCase: UserUseCase;

  constructor() {
    this.userCase = new UserUseCase();
  }
  getCountCompradores = async (req: Request, res: Response): Promise<Response> => {
    try {
      const count = await this.userCase.getCantidadCompradores();
      return res.json(count);
    } catch (error) {
      return res.json("No se pudo obtener la cantidad de compradores");
    }
  };
  getCountVendedores = async (req: Request, res: Response): Promise<Response> => {
    try {
      const count = await this.userCase.getCantidadVendedores();
      return res.json(count);
    } catch (error) {
      return res.json("No se pudo obtener la cantidad de vendedores");
    }
  };

  getTop5Vendedores = async (req: Request, res: Response): Promise<Response> => {
    try {
      const topVendedores = await this.userCase.getTop5Vendedores();
      return res.json(topVendedores);
    } catch (error) {
      return res.json("No se pudo obtener los vendedores");
    }
  }

  getTop3Worst = async (req: Request, res: Response): Promise<Response> => {
    try {
      const topVendedores = await this.userCase.getTop3Worst();
      return res.json(topVendedores);
    } catch (error) {
      return res.json("No se pudo obtener los vendedores");
    }
  }
  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userdata = req.body;
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(userdata.clave, salt);
      req.body.clave = hash;
      const createdUser = await this.userCase.CrearUsuario(req.body);
      return res.json(createdUser);
    } catch (error) {
      return res.json("Se cayo");
    }
  };

  login = async (req: Request, res: Response) => {
    const password = req.body.clave;
    try {
      const user = await this.userCase.login(req.body.email, req.body.clave);

      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "Usuario no registrado" });
      }
      if (!user.habilitado) {
        return res
          .status(401)
          .send({ success: false, message: "Usuario inhabilitado" });
      }
      const checkPassword = await bcrypt.compare(password, user.clave);
      if (checkPassword === false) {
        res.status(401).send({
          success: false,
          message: "Credenciales no validas",
        });
      } else {
        // Generar el token JWT

        const roles = user.roles.map(
          (rol: { descripcion: any }) => rol.descripcion
        );
        const token = jwt.sign(
          {
            userId: user.id,
            nombre: user.nombre,
            apellidos: user.apellidos,
            fotoPerfil: user.fotoPerfil,
            mail: user.email,
            roles: roles,
          },
          "me_gustan_malvadas",
          {
            expiresIn: process.env.JWT_EXPIRE, //token dura 1 hora
          }
        );
        res.json({ token: token });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };

  getUsuarios = async (req: Request, res: Response): Promise<Response> => {
    try {
      const usuarios = await this.userCase.getUsuarios();
      return res.json(usuarios);
    } catch (error) {
      return res.json("No se pudo obtener los usuarios");
    }
  };

  updateHabilitado = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { habilitado } = req.body;
      const usuario = await this.userCase.updateHabilitado(
        parseInt(id),
        habilitado
      );
      return res.json(usuario);
    } catch (error) {
      return res.json("No se pudo actualizar el usuario");
    }
  };

  getCompradorConMasComprasXVendedor = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { idVendedor } = req.params;
      const comprador = await this.userCase.getCompradorConMasComprasXVendedor(
        parseInt(idVendedor)
      );
      return res.json(comprador);
    } catch (error) {
      return res.json("No se pudo obtener el comprador con mas compras");
    }
  }

  getEvaluacionesVendedor = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { idVendedor } = req.params;
      const respuesta = await this.userCase.getEvaluacionesVendedor(
        parseInt(idVendedor)
      );
      const evaluaciones = respuesta?.map((row: { name: any; value: any; }) => ({
        name: row.name,
        value: Number(row.value),
      }));

      return res.json(evaluaciones);
    } catch (error) {
      console.log(error);
      return res.json("No se pudo obtener las evaluaciones del vendedor");
    }
  }
}
