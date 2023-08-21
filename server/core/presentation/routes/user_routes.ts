import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from './authMiddleware';
import ImageUploader from "../controllers/StorageMIddleware";

const userRoute = Router();

const userController = new UserController();

userRoute.get('/', verifyToken, userController.getUsuarios);
userRoute.get('/top5', userController.getTop5Vendedores);
userRoute.get('/top3Worst', userController.getTop3Worst);
userRoute.get('/cantidad', userController.getCantidadUsuarios);
userRoute.get('/evaluacionesVendedor/:idVendedor', verifyToken, userController.getEvaluacionesVendedor);
userRoute.get('/compradorConMasComprasXVendedor/:idVendedor', verifyToken, userController.getCompradorConMasComprasXVendedor);
userRoute.post('/', ImageUploader.uploadFotoPerfil.single('fotoPerfil'), userController.createUser);
userRoute.post('/login', userController.login);
userRoute.put('/:id', verifyToken, userController.updateHabilitado);
// router.get('/:id', getUsuario);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
export default userRoute;
