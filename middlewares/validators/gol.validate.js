import { body,param,query } from "express-validator"

export const validateGolFilter = [
    query('id')
        .isInt({gt:-1}).withMessage('El id del gol no se encuentra en el formato adecuado numerico')
        .optional(),
    query('partidoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del partido no se encuentra en el formato adecuado numerico'),
    query('jugadorId')
        .optional()
        .isString().withMessage('El id del jugador no se encuentra en el formato adecuado string')
        .trim(),
    query('minuto')
        .optional()
        .isInt({gt:-1,lt:200}).withMessage('El minuto del partido no se encuentra en el formato correcto numerico'),
    query('deEquipoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del equipo que anoto el gol no se encuentra en el formato adecuado numerico'),
    query('aEquipoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del equipo que recibio el gol no se encuentra en el formato adecuado numerico'),
]


export const validateGolCreate = [
    body('partidoId')
        .notEmpty().withMessage('El id del partido es requerido')
        .isInt({gt:-1}).withMessage('El id del partido no se encuentra en el formato adecuado numerico'),
    body('jugadorId')
        .notEmpty().withMessage('El id del jugador que anoto es requerido')
        .isString().withMessage('El id del jugador no se encuentra en el formato adecuado string')
        .trim(),
    body('minuto')
        .notEmpty().withMessage('El minuto en que se hizo el gol es requerido')
        .isInt({gt:-1,lt:200}).withMessage('El minuto del partido no se encuentra en el formato correcto numerico'),
    body('deEquipoId')
        .notEmpty().withMessage('El id del equipo que anoto el gol es requerido')
        .isInt({gt:-1}).withMessage('El id del equipo que anoto el gol no se encuentra en el formato adecuado numerico'),
    body('aEquipoId')
        .notEmpty().withMessage('El id del equipo que recibio el gol es requerido')
        .isInt({gt:-1}).withMessage('El id del equipo que recibio el gol no se encuentra en el formato adecuado numerico'),
]


export const validateGolUpdate = [
    param('id')
        .isInt({gt:-1}).withMessage('El id del gol no se encuentra en el formato adecuado numerico')
        .notEmpty().withMessage('El id del gol es requerido'),
    body('partidoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del partido no se encuentra en el formato adecuado numerico'),
    body('jugadorId')
        .optional()
        .isString().withMessage('El id del jugador no se encuentra en el formato adecuado string')
        .trim(),
    body('minuto')
        .optional()
        .isInt({gt:-1,lt:200}).withMessage('El minuto del partido no se encuentra en el formato correcto numerico'),
    body('deEquipoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del equipo que anoto el gol no se encuentra en el formato adecuado numerico'),
    body('aEquipoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del equipo que recibio el gol no se encuentra en el formato adecuado numerico'),
]