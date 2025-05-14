import { Router } from "express";

import { validateGol } from "../middlewares/validators/index.validator.js";
import {validarCampos,validateIdNumeric} from '../middlewares/validators/common.validator.js'

import { getGol,getGolById,postGol,putGol,deleteGol } from "../controllers/gol.controller.js";

const golRouter = Router()

golRouter.get('/gol',validateGol.validateGolFilter,validarCampos,getGol)

golRouter.get('/gol/:id',validateIdNumeric,validarCampos,getGolById)

golRouter.post('/gol',validateGol.validateGolCreate,validarCampos,postGol)

golRouter.put('/gol/:id',validateIdNumeric,validateGol.validateGolUpdate,validarCampos,putGol)

golRouter.delete('/gol/:id',validateIdNumeric,validarCampos,deleteGol)

export default golRouter