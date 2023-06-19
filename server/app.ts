import dotenv from "dotenv";
import Server from "./core/models/server";

// Configurar dotenv.
dotenv.config();


const server = new Server();


server.listen();