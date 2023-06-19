import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController";


const productoRoute = Router();

const productoController = new ProductoController();

productoRoute.get('/', productoController.getProductos);
productoRoute.get('/:idVendedor', productoController.getProductosByIdVendedor);
//productoRoute.get('/:id', productoController.getProductoById);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);

export default productoRoute;