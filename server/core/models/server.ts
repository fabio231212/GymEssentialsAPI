

import express, { Application } from 'express';
import cors from 'cors';
import { route } from '../presentation/routes/routers';

class Server {


    private router = route();
    // Definimos las propiedades
    private app: Application;
    private port: string;
  

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
        this.app.use('/public', express.static(__dirname + '../../core/storage/imgs'));
    }

    routes() {
        this.app.use(this.router.usuarios.path, this.router.usuarios.router);
        this.app.use(this.router.roles.path, this.router.roles.router);
        this.app.use(this.router.productos.path, this.router.productos.router);
        this.app.use(this.router.facturas.path, this.router.facturas.router);
    }
    // Connect to database
    
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura del body
        this.app.use(express.json())
        // Carpeta Publica
        this.app.use(express.static('public'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);

        })
    }
}

export default Server;