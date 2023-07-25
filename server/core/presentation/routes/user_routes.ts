import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from './authMiddleware';

const userRoute = Router();

const userController = new UserController();

userRoute.get('/', verifyToken, userController.getUser);
// router.get('/:id', getUsuario);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
userRoute.post('/', verifyToken, userController.createUser);
userRoute.post('/login', userController.login);
export default userRoute;
