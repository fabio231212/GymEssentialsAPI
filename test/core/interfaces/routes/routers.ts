//import router from '../interfaces/routes/user_routes';

import rolRouter from "./rol_routes";
import userRoute from "./user_routes"


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
    }

    return apiPaths;

}