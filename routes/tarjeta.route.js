import { Router } from "express";

import { getTarjetas,getTarjetaById,postTarjeta,putTarjeta,deleteTarjeta } from "../controllers/tarjeta.controller.js";

import { validateTarjeta } from "../middlewares/validators/index.validator.js";
import {validateIdNumeric,validarCampos} from '../middlewares/validators/common.validator.js'


const tarjetaRouter = Router()

tarjetaRouter.get('/tarjetas',validateTarjeta.validateTarjetaFilter,validarCampos,getTarjetas)

tarjetaRouter.get('/tarjetas/:id',validateIdNumeric,validarCampos,getTarjetaById)

tarjetaRouter.post('/tarjetas',validateTarjeta.validateTarjetaCreate,validarCampos,postTarjeta)

tarjetaRouter.get('/tarjetas/:id',validateIdNumeric,validateTarjeta.validateTarjetaUpdate,validarCampos,putTarjeta)

tarjetaRouter.delete('/tarjetas/:id',validateIdNumeric,validarCampos,deleteTarjeta)

export default tarjetaRouter