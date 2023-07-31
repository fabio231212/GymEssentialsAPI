import { tammanoController } from "../controllers/TamannoController";
import { verifyToken } from "./authMiddleware";
import { Router } from "express";

const tammanoRoute = Router();

const tamannoController = new tammanoController();

tammanoRoute.get("/", tamannoController.gettammanos);

export default tammanoRoute;