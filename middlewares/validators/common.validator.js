import { validationResult, param } from "express-validator";
import AppError from '../../utils/appError.js'

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const erroresFormateados = errores.array().map(err => ({
            campo: err.path,
            mensaje: err.msg
            }));
        throw new AppError(JSON.stringify(erroresFormateados), 400);
    }
    next();
};

export const validateIdNumeric = [
    param('id')
        .isInt({gt:-1}).withMessage('Debe proporcionar un id válido')
        .notEmpty().withMessage('Debe proporcionar un id')
];