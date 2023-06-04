import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { PrismaUserRepository } from "../../infrastructure/PrismaUserRepository";
import { UserUseCase } from "../../application/usescases/UserUseCase";

const userRoute = Router();

const userController = new UserController();

//router.get('/', getUsuarioss);
// router.get('/:id', getUsuario);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
userRoute.post('/',userController.createUser);
export default userRoute;