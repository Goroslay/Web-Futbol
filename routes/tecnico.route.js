import { Router } from "express";

import {validateTecnico} from '../middlewares/validators/index.validator.js'
import {validateIdNumeric,validarCampos} from '../middlewares/validators/common.validator.js'
import { getTecnicos,getTecnicosById,postTecnicos,putTecnicos,deleteTecnicos } from "../controllers/tecnico.controller.js";

const tecnicoRouter = Router()

tecnicoRouter.get('/tecnicos',validateTecnico.validateTecnicoFilter,validarCampos,getTecnicos)

tecnicoRouter.get('/tecnicos/:id',validateIdNumeric,validarCampos,getTecnicosById)

tecnicoRouter.post('/tecnicos',validateTecnico.validateTecnicoCreate,validarCampos,postTecnicos)

tecnicoRouter.put('/tecnicos/:id',validateTecnico.validateTecnicoUpdate,validateIdNumeric,validarCampos,putTecnicos)

tecnicoRouter.delete('/tecnicos/:id',validateIdNumeric,validarCampos,deleteTecnicos)

export default tecnicoRouter