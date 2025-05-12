import { Router } from "express";
import { validarCampos,validateIdNumeric } from "../middlewares/validators/common.validator.js";
import { validateTorneo } from "../middlewares/validators/index.validator.js";
import { getTorneos,postTorneo,getTorneoById,putTorneo,deleteTorneo,positionsTorneo} from "../controllers/torneo.controller.js";

const torneoRouter = Router()

torneoRouter.get('/torneos',validateTorneo.validateTorneoFilter,validarCampos,getTorneos)

torneoRouter.get('/torneos/:id',validateIdNumeric,validarCampos,getTorneoById)

torneoRouter.post('/torneos',validateTorneo.validateTorneoCreation,validarCampos,postTorneo)

torneoRouter.put('/torneos/:id',validateIdNumeric,validateTorneo.validateTorneoUpdate,validarCampos,putTorneo)

torneoRouter.delete('/torneos/:id',validateIdNumeric,validarCampos,deleteTorneo)

torneoRouter.get('/torneos/:id/tabla',validateIdNumeric,validarCampos,positionsTorneo)

export default torneoRouter