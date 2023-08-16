import { Router } from "express";
import { DireccionController } from "../controllers/DireccionController";
import { verifyToken } from "./authMiddleware";

const direccionRouter = Router();
const direccionController = new DireccionController();

direccionRouter.get('/:idUsuario', verifyToken, direccionController.getDireccionsByIdUser);

export default direccionRouter;
