import { NextFunction, Router } from 'express';
import { FacturaController } from '../controllers/FacturaController';
import { verifyToken } from './authMiddleware';

const facturaRoute = Router();

const facturaController = new FacturaController();

facturaRoute.get('/:id', verifyToken, facturaController.getFacturasById);
facturaRoute.get(
  '/idUsuario/:idUsuario',
  verifyToken,
  facturaController.getFacturasByUsuario
);
facturaRoute.get(
  '/idVendedor/:idVendedor',
  verifyToken,
  facturaController.getProductosByVendedor
);
facturaRoute.post('/', verifyToken, facturaController.createFactura);
facturaRoute.put('/actualizarEstado/:id', verifyToken, facturaController.actualizarEstadoPedido);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);

export default facturaRoute;
