import { body,param } from "express-validator";

export const validateTecnicoFilter = [
    body('id')
        .optional()
        .isInt({gt:-1}).withMessage('El id no se encuentra en el formato correcto numerico'),
    body('nombres')
        .optional()
        .isString().withMessage('El nombre no se encuentra en el formato correcto string')
        .trim(),
    body('apellidos')
        .optional()
        .isString().withMessage('El apellido no se encuentra en el formato correcto string')
        .trim(),
    body('fechaNacimiento')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento no se encuentra en el formato correcto ISO8601')
]

export const validateTecnicoCreate = [
    body('nombres')
        .notEmpty().withMessage('El nombre del tecnico es requerido')
        .isString().withMessage('El nombre no se encuentra en el formato correcto string')
        .trim(),
    body('apellidos')
        .notEmpty().withMessage('El nombre del tecnico es requerido')
        .isString().withMessage('El apellido no se encuentra en el formato correcto string')
        .trim(),
    body('fechaNacimiento')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento no se encuentra en el formato correcto ISO8601')
]

export const validateTecnicoUpdate = [
    param('id')
        .notEmpty().withMessage('El id del tecnico es requerido')
        .isInt({gt:-1}).withMessage('El id no se encuentra en el formato correcto numerico'),
    body('nombres')
        .optional()
        .isString().withMessage('El nombre no se encuentra en el formato correcto string')
        .trim(),
    body('apellidos')
        .optional()
        .isString().withMessage('El apellido no se encuentra en el formato correcto string')
        .trim(),
    body('fechaNacimiento')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento no se encuentra en el formato correcto ISO8601')
]