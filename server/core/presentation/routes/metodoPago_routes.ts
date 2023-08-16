import { MarcaController } from "../controllers/MarcaController";
import { MetodoPagoController } from "../controllers/MetodoPagoController";
import { verifyToken } from "./authMiddleware";
import { Router } from "express";

const metodoPagoRoute = Router();

const metodoPagoController = new MetodoPagoController();

metodoPagoRoute.get('/:id', verifyToken,metodoPagoController.getMetodosPagoByUser);
//productoRoute.get('/', verifyToken, productoController.getProductos);

export default metodoPagoRoute;
