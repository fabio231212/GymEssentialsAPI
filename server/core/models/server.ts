import express, { Application } from 'express';
import cors from 'cors';
import { route } from '../presentation/routes/routers';
import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import path, { dirname } from 'path';

class Server {

  private router = route();
  // Definimos las propiedades
  private app: Application;
  private port: string;
  private httpServer: http.Server; // Creamos una propiedad para el servidor HTTP
  io: SocketIOServer; // Creamos una propiedad para el servidor de Socket.io

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.middlewares();
    this.routes();
    this.httpServer = http.createServer(this.app);
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
    });
  }

  routes() {
    this.app.use(this.router.usuarios.path, this.router.usuarios.router);
    this.app.use(this.router.roles.path, this.router.roles.router);
    this.app.use(this.router.productos.path, this.router.productos.router);
    this.app.use(this.router.facturas.path, this.router.facturas.router);
    this.app.use(this.router.marcas.path, this.router.marcas.router);
    this.app.use(this.router.tammanos.path, this.router.tammanos.router);
    this.app.use(this.router.categorias.path, this.router.categorias.router);
    this.app.use(this.router.estadoProducto.path, this.router.estadoProducto.router);
    this.app.use(this.router.comentario.path, this.router.comentario.router);
    this.app.use(this.router.metodoPago.path, this.router.metodoPago.router);
    this.app.use(this.router.direccion.path, this.router.direccion.router);
    this.app.use(this.router.evalUsuario.path, this.router.evalUsuario.router);
  }

  // Connect to database

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura del body
    this.app.use(express.json());
    // Carpeta Publica
    const serverFolderPath = path.join(__dirname, '../../../');
    this.app.use('/public', express.static(`${serverFolderPath}/storage/imgs`));
  }

  listen() {
    this.httpServer.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto ' + this.port);
    });
  }

}

export default Server;
