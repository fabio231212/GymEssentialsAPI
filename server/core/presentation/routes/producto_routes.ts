import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController";
// ES REQUERIDO PARA PODER HACER LAS GESTION DE IMAGENES EN LA RUTA DE PRODUCTOS
import ImageUploader from  "../controllers/storageController";

const productoRoute = Router();

const productoController = new ProductoController();

productoRoute.get('/', productoController.getProductos);
productoRoute.get('/:id', productoController.getProductoById);
productoRoute.get('/idVendedor/:idVendedor', productoController.getProductosByIdVendedor);
productoRoute.get('/categoria/:idCategoria', productoController.getProductsByCategory);
//Se utiliza la función 'upload.array' para procesar hasta 5 archivos con el nombre 'imagenes' adjuntados a la solicitud
//ESTO SOLO SE PUEDE HACER GRACIAS AL USO DE MULTER, ESTO LLAMA AL CREATE PRODUCT Y A SU VEZ AL STORAGE CONTROLLER QUE MANEJA LA GESTION DE IMAGENES
productoRoute.post('/', ImageUploader.upload.array('imagenes', 5), productoController.createProduct);
productoRoute.put('/:id',ImageUploader.upload.array('imagenes', 5) ,productoController.editProduct);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);

export default productoRoute;