import { Request, Response } from "express"
import { Rol } from "@prisma/client";
import { RolUseCase } from "../../application/usescases/RolUseCase";


export class RolController{
    public  rolUseCase : RolUseCase
    constructor() {
        this.rolUseCase = new RolUseCase()

    }

     CreateRol = async(req: Request, res: Response): Promise<Response> => {
      try {
  
        const rol: Rol = {
          id: 2, 
          descripcion: "Cliente",
        };
  
        const rolCreado = await this.rolUseCase.CrearRol(rol);
  
        return res.status(201).json(rolCreado);
      } catch (error) {
        return res.status(500).json({ message: "ffff" });
      }
    }

     getRol = async(req: Request, res: Response) =>{

      const { id } = req.params;
       res.json({
        msg: 'getRoles',
        id
      })
    }

}


export const getUsuarioss = (req: Request, resp: Response) => {
  resp.json({
      msg: 'getUsuarios'
  })
}

