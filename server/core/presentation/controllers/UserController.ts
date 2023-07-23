import { Request, Response } from 'express';
import { UserUseCase } from '../../application/usescases/UserUseCase';
import { PrismaClient, Usuario, Rol, Prisma } from '@prisma/client'; // Asegúrate de importar PrismaClient y los tipos de Usuario y Rol correctamente
import jwt from 'jsonwebtoken';

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

  login = async (req: Request, res: Response): Promise<Response> => {
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
      if (user && user.clave === password) {
        // Generar el token JWT
        const roles = user.roles.map((rol) => rol.descripcion);
        const token = jwt.sign(
          { userId: user.id, roles: roles },
          'me_gustan_malvadas',
          {
            expiresIn: '1h', //token dura 1 hora
          }
        );

        return res.status(200).json({ token: token, usuario: user });
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
}
