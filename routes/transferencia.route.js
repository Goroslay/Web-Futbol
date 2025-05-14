import { Router } from "express";

import { validateTransferencia } from "../middlewares/validators/index.validator.js";
import { validateIdNumeric,validarCampos } from "../middlewares/validators/common.validator.js";

import { getTransferencias,getTransferenciaById,postTransferencia,putTransferencia,deleteTransferencia } from "../controllers/transferencia.controller.js";

const transferenciaRouter = Router()

transferenciaRouter.get('/transferencias',validateTransferencia.validateTransferenciaFilter,validarCampos,getTransferencias)

transferenciaRouter.get('/transferencias/:id',validateIdNumeric,validarCampos,getTransferenciaById)

transferenciaRouter.post('/transferencias',validateTransferencia.validateTransferenciaCreate,validarCampos,postTransferencia)

transferenciaRouter.put('/transferencias/:id',validateTransferencia.validateTransferenciaUpdate,validateIdNumeric,validarCampos,putTransferencia)

transferenciaRouter.delete('/transferencias/:id',validateIdNumeric,validarCampos,deleteTransferencia)

export default transferenciaRouter