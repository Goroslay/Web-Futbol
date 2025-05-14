import { Router } from "express";

import { getPartidos,getPartidosById,postPartido,putPartido,deletePartido } from "../controllers/partido.controller.js";
import { validatePartido } from "../middlewares/validators/index.validator.js";
import { validarCampos, validateIdNumeric } from "../middlewares/validators/common.validator.js";


const partidoRouter = Router()

partidoRouter.get('/partidos',validatePartido.validatePartidoFilter,validarCampos,getPartidos)

partidoRouter.get('/partidos/:id',validateIdNumeric,validarCampos,getPartidosById)

partidoRouter.post('/partidos',validatePartido.validatePartidoCreation,validarCampos,postPartido)

partidoRouter.put('/partidos/:id',validateIdNumeric,validatePartido.validatePartidoFilter,validarCampos,putPartido)

partidoRouter.delete('/partidos/:id',validateIdNumeric,validarCampos,deletePartido)

export default partidoRouter