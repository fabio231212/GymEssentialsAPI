import { Router } from 'express';
import { FacturaController } from '../controllers/FacturaController';

const facturaRoute = Router();

const facturaController = new FacturaController();

facturaRoute.get('/:id', facturaController.getFacturasByUsuario);
facturaRoute.get('/', facturaController.getFacturas);
facturaRoute.get('/facturaVendedor/:id', facturaController.getFacturasByVendedor);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);

export default facturaRoute;
