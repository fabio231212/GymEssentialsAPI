import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from './authMiddleware';

const userRoute = Router();

const userController = new UserController();

userRoute.get('/', verifyToken, userController.getUsuarios);
userRoute.post('/', userController.createUser);
userRoute.post('/login', userController.login);
userRoute.put('/:id', verifyToken, userController.updateHabilitado);
// router.get('/:id', getUsuario);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
export default userRoute;
