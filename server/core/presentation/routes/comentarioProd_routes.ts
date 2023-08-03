import { CategoriaController } from "../controllers/CategoriaController";
import { ComentarioProdController } from "../controllers/ComentarioProdController";
import { verifyToken } from "./authMiddleware";
import { Router } from "express";

const comentarioRoute = Router();

const comentarioController = new ComentarioProdController();

comentarioRoute.post('/',verifyToken, comentarioController.save);

export default comentarioRoute;
