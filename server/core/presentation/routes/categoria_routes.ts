import { CategoriaController } from "../controllers/CategoriaController";
import { verifyToken } from "./authMiddleware";
import { Router } from "express";

const categoriaRoute = Router();

const categoriaController = new CategoriaController();

categoriaRoute.get('/', categoriaController.getCategorias);

export default categoriaRoute;
