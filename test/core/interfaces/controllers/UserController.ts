import { Request, Response } from "express";
import { UserUseCase } from "../../application/usescases/UserUseCase";
import { Usuario } from "@prisma/client";

export class UserController {
  public createUserUseCase: UserUseCase;

  constructor() {
    this.createUserUseCase = new UserUseCase();
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: Usuario = {
        cedula: "208470478",
        nombre: "fabio",
        apellidos: "Ramirez",
        email: "ramirez@gmail.com",
        clave: "123",
        id: 0,
        numCelular: "12"
      };
      
      const createdUser = await this.createUserUseCase.CrearUsuario(user);

      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    res.json({
      msg: 'getUsuarios',
      id
    });
  }

  getUsuarioss(req: Request, resp: Response) {
    resp.json({
      msg: 'getUsuarios'
    });
  }
}