import { body,param } from "express-validator";

export const validateEquipoFilter = [

    body('nombre')
        .optional()
        .isString().withMessage('El nombre no se encuentra en el formato adecuado String')
        .trim(),
    
    body('fechaFundacion')
        .optional()
        .isISO8601().withMessage('La fecha de fundacion debe ser una fecha en formato ISO 8601'),
    
    body('ciudad')
        .optional()
        .isString().withMessage('La ciudad no se encuentra en el formato adecuado String')
        .trim(),

    body('estadio')
        .optional()
        .isString().withMessage('La ciudad no se encuentra en el formato adecuado String')
        .trim(),

    body('torneoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del torneo no se encuentra en el formato adecuado numerico'),

    body('tecnicoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del tecnico no se encuentra en el formato adecuado numerico'),
    
    body('puntos')
        .optional()
        .isInt({gt:-1}).withMessage('Los puntos no se encuentran en el formato adecuado numerico')
]


export const validateEquipocreate = [
    body('nombre')
        .notEmpty().withMessage('El nombre del equipo es requerido')
        .isString().withMessage('El nombre no se encuentra en el formato adecuado String')
        .isLength({min:3}).withMessage('La longitud del nombre del equipo debe ser de minimo 3 caracteres')
        .trim(),
    
    body('fechaFundacion')
        .optional()
        .isISO8601().withMessage('La fecha de fundacion debe ser una fecha en formato ISO 8601'),
    
    body('ciudad')
        .notEmpty().withMessage('La ciudad del equipo es requerida')
        .isString().withMessage('La ciudad no se encuentra en el formato adecuado String')
        .isLength({min:3}).withMessage('La longitud del nombre de la ciudad debe ser de minimo 3 caracteres')
        .trim(),

    body('estadio')
        .optional()
        .isString().withMessage('La ciudad no se encuentra en el formato adecuado String')
        .isLength({min:3}).withMessage('La longitud del estadio debe ser de minimo 3 caracteres')
        .trim(),

    body('torneoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del torneo no se encuentra en el formato adecuado numerico'),

    body('tecnicoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del tecnico no se encuentra en el formato adecuado numerico'),
    
    body('puntos')
        .optional()
        .isInt({gt:-1}).withMessage('Los puntos no se encuentran en el formato adecuado numerico')
    
]


export const validateEquipoUpdate = [

    param('id')
        .notEmpty().withMessage('El id del equipo es requerido')
        .isInt({gt:-1}).withMessage('El id no se encuentra en el formato adecuado numerico'),

    body('nombre')
        .optional()
        .isString().withMessage('El nombre no se encuentra en el formato adecuado String')
        .isLength({min:3}).withMessage('La longitud del nombre debe ser de minimo 3 caracteres')
        .trim(),
    
    body('fechaFundacion')
        .optional()
        .isISO8601().withMessage('La fecha de fundacion debe ser una fecha en formato ISO 8601'),
    
    body('ciudad')
        .optional()
        .isString().withMessage('La ciudad no se encuentra en el formato adecuado String')
        .isLength({min:3}).withMessage('La longitud de la ciudad debe ser de minimo 3 caracteres')
        .trim(),

    body('estadio')
        .optional()
        .isString().withMessage('La ciudad no se encuentra en el formato adecuado String')
        .isLength({min:3}).withMessage('La longitud del estadio debe ser de minimo 3 caracteres')
        .trim(),

    body('torneoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del torneo no se encuentra en el formato adecuado numerico'),

    body('tecnicoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del tecnico no se encuentra en el formato adecuado numerico'),
    
    body('puntos')
        .optional()
        .isInt({gt:-1}).withMessage('Los puntos no se encuentran en el formato adecuado numerico')
]