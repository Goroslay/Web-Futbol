import { validationResult, param } from "express-validator";
import AppError from '../../utils/appError.js'

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const erroresestilizados=errores.errors.map((error)=>`${error.path}: ${error.msg}`)
        throw new AppError(`Error en las validaciones: ${erroresestilizados}`, 400);
    }
    next();
};

export const validateIdNumeric = [
    param('id')
        .isInt({gt:-1}).withMessage('Debe proporcionar un id válido')
        .notEmpty().withMessage('Debe proporcionar un id')
];