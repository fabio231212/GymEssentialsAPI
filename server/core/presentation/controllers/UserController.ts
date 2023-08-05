import { Request, Response } from 'express';
import { UserUseCase } from '../../application/usescases/UserUseCase';
import { PrismaClient, Usuario, Rol, Prisma } from '@prisma/client'; // Asegúrate de importar PrismaClient y los tipos de Usuario y Rol correctamente
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
export class UserController {
  public userCase: UserUseCase;

  constructor() {
    this.userCase = new UserUseCase();
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userdata = req.body;
      let salt = bcrypt.genSaltSync(10);
      let hash=bcrypt.hashSync(userdata.clave,salt);
      req.body.clave = hash;
      const createdUser = await this.userCase.CrearUsuario(req.body);
      return res.json(createdUser);
    } catch (error) {
      return res.json("Se cayo");
    }
  };


  login = async (req: Request, res: Response) => {
    const password  = req.body.clave;
    try {
      const user = await this.userCase.login(req.body.email, req.body.clave)

      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      if (!user.habilitado) {
        return res.status(401).send({ message: 'Usuario no habilitado' });
      }
      const checkPassword = await bcrypt.compare(password, user.clave);
      if (checkPassword === false) {
        res.status(401).send({
          success: false,
          message: 'Credenciales no validas',
        });
      }else {
        // Generar el token JWT
        
        const roles = user.roles.map((rol: { descripcion: any; }) => rol.descripcion);
        const token = jwt.sign(
          {
            userId: user.id,
            nombre: user.nombre,
            mail: user.email,
            roles: roles,
          }, 'me_gustan_malvadas',
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
  }

  updateHabilitado = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { habilitado } = req.body;
      const usuario = await this.userCase.updateHabilitado(parseInt(id), habilitado);
      return res.json(usuario);
    } catch (error) {
      return res.json("No se pudo actualizar el usuario");
    }
  }
}
