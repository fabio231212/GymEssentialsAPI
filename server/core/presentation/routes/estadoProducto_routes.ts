import { EstadoProductoController } from "../controllers/EstadoProductoController";
import { verifyToken } from "./authMiddleware";
import { Router } from "express";

const estadoPoductoRoute = Router();

const estadoController = new EstadoProductoController();

estadoPoductoRoute.get('/', estadoController.getEstados);
//productoRoute.get('/', verifyToken, productoController.getProductos);

export default estadoPoductoRoute;
