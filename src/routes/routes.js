//Del modulo de Express estamos agregando la funcionalidad Router
import { Router } from "express";
//Imporando del folder creado la funcionalidad Controller, se usa el punto para salir del fulder actual y entrar al otro: ../etc/etc.js
import Controller from "../controllers/controller.js";

//declar la constante router para crear el enrutador llamando al método Router()
const router = Router();

//el enrutador se encarga de manejar las rutas CRUD o solucitudes del cliente
router.post("/", Controller.create);
router.get("/", Controller.readAll);
router.get("/:id", Controller.read);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);


//exportar el enrutador
export default router;
