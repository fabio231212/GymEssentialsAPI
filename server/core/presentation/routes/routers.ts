//import router from '../interfaces/routes/user_routes';

import rolRouter from "./rol_routes";
import userRoute from "./user_routes";
import productoRouter from "./producto_routes";
import facturaRoute from "./factura_routes";
import marcaRoute from "./marca_routes";
import tammanoRoute from "./tammano_routes";
import categoriaRoute from "./categoria_routes";
import estadoPoductoRoute from "./estadoProducto_routes";
import comentarioRoute from "./comentarioProd_routes";
export const route = () =>{

     const apiPaths = {
        usuarios: {
            'path' : '/api/usuarios',
            'router' : userRoute
        },
        roles: {
            'path' : '/api/roles',
            'router' : rolRouter
        },
        productos: {
            'path' : '/api/productos',
            'router' : productoRouter
        },
        facturas: {
            'path' : '/api/facturas',
            'router' : facturaRoute
        },
        marcas: {
            'path' : '/api/marcas',
            'router' : marcaRoute
        },
        tammanos: {
            'path' : '/api/tamannos',
            'router' : tammanoRoute
        },
        categorias: {
            'path' : '/api/categorias',
            'router' : categoriaRoute
        },
        estadoProducto: {
            'path' : '/api/estadoproducto',
            'router' : estadoPoductoRoute
        },
        comentario: {
            'path' : '/api/comentario',
            'router' : comentarioRoute
        },
    }

    return apiPaths;

}