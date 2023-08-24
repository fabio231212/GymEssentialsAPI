

import { ProductoController } from '../controllers/ProductoController';
import { verifyToken } from './authMiddleware';
import { Router } from "express";
// ES REQUERIDO PARA PODER HACER LAS GESTION DE IMAGENES EN LA RUTA DE PRODUCTOS
import ImageUploader from "../controllers/StorageMIddleware";

const productoRoute = Router();

const productoController = new ProductoController();


productoRoute.get('/', productoController.getProductos);
productoRoute.get('/calificacion', productoController.getProductsByComentario);
productoRoute.get('/nuevo', productoController.getNewProducts);
productoRoute.get('/descuento', productoController.getProductsWithHigherDiscount);
productoRoute.get('/conDescuento/:idVendedor', verifyToken, productoController.getPrrudctsConDescuentoByVendedor);
productoRoute.get('/sinStock/:idVendedor', verifyToken, productoController.getProductsSinStockByVendedor);
productoRoute.get('/topProductVendedor/:idVendedor', verifyToken, productoController.getTopProductoByVendedor)
productoRoute.get('/topCategoriesVendedor/:idVendedor', productoController.getTopCategoriesByVendedor)
productoRoute.get('/:id', productoController.getProductoById);
productoRoute.get('/idVendedor/:idVendedor', verifyToken, productoController.getProductosByIdVendedor
);
productoRoute.get('/categoria/:idCategoria', productoController.getProductsByCategory
);



//Se utiliza la función 'upload.array' para procesar hasta 5 archivos con el nombre 'imagenes' adjuntados a la solicitud
//ESTO SOLO SE PUEDE HACER GRACIAS AL USO DE MULTER, ESTO LLAMA AL CREATE PRODUCT Y A SU VEZ AL STORAGE CONTROLLER QUE MANEJA LA GESTION DE IMAGENES
productoRoute.post('/', ImageUploader.upload.array('imagenes', 5), verifyToken, productoController.createProduct);
productoRoute.put('/:id', ImageUploader.upload.array('imagenes', 5), verifyToken, productoController.editProduct);


export default productoRoute;
