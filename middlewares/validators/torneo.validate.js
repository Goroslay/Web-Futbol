import { body, param } from "express-validator";


export const validateTorneoFilter = [
    body('nombre')
        .optional()
        .isString().withMessage('El nombre no se encuentra en el formato adecuado String')
        .trim(),
    body('temporada')
        .optional()
        .isString().withMessage('La temporada no se encuentra en el formato adecuado String')
        .trim(),
    body('fechaInicio')
        .optional()
        .isISO8601().withMessage('La fecha de inicio debe ser una fecha en formato ISO 8601'),
    body('fechaFin')
        .optional()
        .isISO8601().withMessage('La fecha de fin debe ser una fecha en formato ISO 8601'),
];

export const validateTorneoCreation = [
    body('nombre')
        .notEmpty().withMessage('El nombre del torneo es requerido')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres')
        .trim(),
    body('temporada')
        .notEmpty().withMessage('La temporada es requerida')
        .isString().withMessage('La temporada debe ser un texto')
        .isLength({min:1}).withMessage('La temporada debe tener al menos 3 caracteres')
        .trim(),
    body('fechaInicio')
        .notEmpty().withMessage('La fecha de inicio es requerida')
        .isISO8601().withMessage('La fecha de inicio debe ser una fecha en formato ISO 8601'),
    body('fechaFin')
        .notEmpty().withMessage('La fecha de fin es requerida')
        .isISO8601().withMessage('La fecha de fin debe ser una fecha en formato ISO 8601'),
    body('descripcion')
        .optional()
        .isString().withMessage('La descripción debe ser un texto')
        .trim()
];

export const validateTorneoUpdate = [
    param('id')
        .isInt({gt:-1}).withMessage('Debe proporcionar un id válido')
        .notEmpty().withMessage('Debe proporcionar un id'),
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres')
        .trim(),
    body('temporada')
        .optional()
        .isString().withMessage('La temporada debe ser un texto')
        .isLength({min:1}).withMessage('La temporada debe tener al menos 3 caracteres')
        .trim(),
    body('fechaInicio')
        .optional()
        .isISO8601().withMessage('La fecha de inicio debe ser una fecha en formato ISO 8601'),
    body('fechaFin')
        .optional()
        .isISO8601().withMessage('La fecha de fin debe ser una fecha en formato ISO 8601'),
    body('descripcion')
        .optional()
        .isString().withMessage('La descripción debe ser un texto')
        .trim()
];