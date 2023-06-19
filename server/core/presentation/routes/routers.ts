//import router from '../interfaces/routes/user_routes';

import rolRouter from "./rol_routes";
import userRoute from "./user_routes";
import productoRouter from "./producto_routes";
import facturaRoute from "./factura_routes";
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
        }
    }

    return apiPaths;

}