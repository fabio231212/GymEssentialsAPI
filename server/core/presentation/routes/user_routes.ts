import { Router } from "express";
import { UserController } from "../controllers/UserController";


const userRoute = Router();

const userController = new UserController();

userRoute.get('/', userController.getUser);
// router.get('/:id', getUsuario);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
userRoute.post('/', userController.createUser);
export default userRoute;