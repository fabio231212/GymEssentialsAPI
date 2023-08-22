import { Router } from "express";
import { EvUsuarioController } from "../controllers/EvUsuarioController";
import { verifyToken } from "./authMiddleware";

const evUsuarioRoute = Router();

const evUsuarioController = new EvUsuarioController();

evUsuarioRoute.get("/:id", verifyToken, evUsuarioController.getEvaluacionUsuarioById);
evUsuarioRoute.get("/promedio/:id", verifyToken, evUsuarioController.getPromedioEvUsuario);
evUsuarioRoute.post("/",verifyToken, evUsuarioController.createEvaluacionUsuario);

export default evUsuarioRoute;