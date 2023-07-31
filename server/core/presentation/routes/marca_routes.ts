import { MarcaController } from "../controllers/MarcaController";
import { verifyToken } from "./authMiddleware";
import { Router } from "express";

const marcaRoute = Router();

const marcaController = new MarcaController();

marcaRoute.get('/', marcaController.getMarcas);
//productoRoute.get('/', verifyToken, productoController.getProductos);

export default marcaRoute;
