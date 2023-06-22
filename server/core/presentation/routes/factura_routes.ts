import { Router } from 'express';
import { FacturaController } from '../controllers/FacturaController';

const facturaRoute = Router();

const facturaController = new FacturaController();

facturaRoute.get('/:id', facturaController.getFacturasById);
facturaRoute.get('/idUsuario/:idUsuario', facturaController.getFacturasByUsuario);
facturaRoute.get('/idVendedor/:idVendedor', facturaController.getFacturasByVendedor);
// router.post('/', postUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);

export default facturaRoute;
