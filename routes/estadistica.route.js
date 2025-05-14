import { Router } from "express";

import { validateEstadistica } from "../middlewares/validators/index.validator.js";
import { validateIdNumeric,validarCampos } from "../middlewares/validators/common.validator.js";

import { getEstadisticas,getEstadisticaById,postEstadistica,putEstadistica,deleteEstadistica } from "../controllers/estadistica.controller.js";

const estadisticaRouter = Router()

estadisticaRouter.get('/estadisticas',validateEstadistica.validateEstadisticaFilter,validarCampos,getEstadisticas)

estadisticaRouter.get('/estadisticas/:id',validateIdNumeric,validarCampos,getEstadisticaById)

estadisticaRouter.post('/estadisticas',validateEstadistica.validateEstadisticaCreate,validarCampos,postEstadistica)

estadisticaRouter.put('/estadisticas/:id',validateIdNumeric,validateEstadistica.validateEstadisticaFilter,validarCampos,putEstadistica)

estadisticaRouter.delete('/estadisticas/:id',validateIdNumeric,validarCampos,deleteEstadistica)

export default estadisticaRouter