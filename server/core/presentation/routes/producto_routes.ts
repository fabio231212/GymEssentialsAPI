import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { verifyToken } from './authMiddleware';

const productoRoute = Router();

const productoController = new ProductoController();

productoRoute.get('/', verifyToken, productoController.getProductos);
productoRoute.get('/:id', verifyToken, productoController.getProductoById);
productoRoute.get(
  '/idVendedor/:idVendedor',
  verifyToken,
  productoController.getProductosByIdVendedor
);
productoRoute.get(
  '/categoria/:idCategoria',
  verifyToken,
  productoController.getProductsByCategory
);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);

export default productoRoute;
