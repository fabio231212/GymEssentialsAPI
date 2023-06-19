import { Router } from "express";
import { RolController } from "../controllers/RolController";

const rolRouter = Router();


const rolController = new RolController();

rolRouter.get('/', rolController.getRol);
// router.get('/:id', getUsuario);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
rolRouter.post('/',rolController.CreateRol);
export default rolRouter;