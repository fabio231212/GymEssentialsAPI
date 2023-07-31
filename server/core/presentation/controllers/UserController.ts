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
      const user: Usuario = {
        cedula: '208470478',
        nombre: 'fabio',
        apellidos: 'Ramirez',
        email: 'ramirez@gmail.com',
        clave: '123',
        id: 0,
        numCelular: '12',
      };

      const createdUser = await this.userCase.CrearUsuario(user);

      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    res.json({
      msg: 'getUsuarios',
      id,
    });
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.usuario.findUnique({
        where: {
          email,
        },
        include: {
          roles: true,
        },
      });

      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      const checkPassword = await bcrypt.compare(password, user.clave);
      // if (checkPassword === false) {
      //   res.status(401).send({
      //     success: false,
      //     message: 'Credenciales no validas',
      //   });
      // }
      if (user && user.clave === password) {
        // Generar el token JWT
        const roles = user.roles.map((rol) => rol.descripcion);
        const token = jwt.sign(
          {
            userId: user.id,
            nombre: user.nombre,
            mail: user.email,
            roles: roles,
          },
          'me_gustan_malvadas',
          {
            expiresIn: '1h', //token dura 1 hora
          }
        );

        res.json({ token: token });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };
}
