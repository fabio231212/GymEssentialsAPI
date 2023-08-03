import { Request, Response } from "express"
import { Rol } from "@prisma/client";
import { RolUseCase } from "../../application/usescases/RolUseCase";


export class RolController{
    public  rolUseCase : RolUseCase
    constructor() {
        this.rolUseCase = new RolUseCase()

    }


    getRoles= async (req: Request, res: Response) => {
      const roles = await this.rolUseCase.getRol();
      res.json(roles);
    };

}


