import { Router } from "express";

import { validateEquipo } from "../middlewares/validators/index.validator.js";
import { validarCampos,validateIdNumeric } from "../middlewares/validators/common.validator.js";
import { getEquipos,getEquipoById,postEquipo,putEquipo,deleteEquipo,postEquipoATorneo,deleteEquipoAtorneo } from "../controllers/equipo.controller.js";

const equiposRouter = Router()

equiposRouter.get('/equipos',validateEquipo.validateEquipoFilter,validarCampos,getEquipos)

equiposRouter.get('/equipos/:id',validateIdNumeric,validarCampos,getEquipoById)

equiposRouter.post('/equipos',validateEquipo.validateEquipocreate,validarCampos,postEquipo)

equiposRouter.put('/equipos/:id',validateIdNumeric,validateEquipo.validateEquipoUpdate,validarCampos,putEquipo)

equiposRouter.delete('/equipos/:id',validateIdNumeric,validarCampos,deleteEquipo)

equiposRouter.post('/equipos/:equipoId/:torneoId',postEquipoATorneo)

equiposRouter.delete('/equipos/:equipoId/:torneoId',deleteEquipoAtorneo)

export default equiposRouter