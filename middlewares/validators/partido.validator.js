import { param,body,query } from "express-validator";


const estados = ['programado', 'curso', 'finalizado', 'suspendido']

export const validatePartidoCreation = [
    query('torneoId')
        .isInt({gt:-1}).withMessage('El id del torneo no se encuentra en el formato adecuado numerico')
        .notEmpty().withMessage('El id del torneo es requerido'),
    query('equipoLocalId')
        .isInt({gt:-1}).withMessage('El id del equipo local no se encuentra en el formato adecuado numerico')
        .notEmpty().withMessage('El id del equipo local es requerido'),
    query('equipoVisitanteId')
        .isInt({gt:-1}).withMessage('El id del equipo visitante no se encuentra en el formato adecuado numerico')
        .notEmpty().withMessage('El id del equipo visitante es requerido'),
    query('golesLocal')
        .optional()
        .isInt({gt:-1}).withMessage('El numero de goles del equipo local no se encuentra en el formato adecuado numerico'),
    query('golesVisitante')
        .optional()
        .isInt({gt:-1}).withMessage('El numero de goles del equipo visitante no se encuentra en el formato adecuado numerico'),
    query('fecha')
        .notEmpty().withMessage('La fecha del partido es requerida')
        .isISO8601().withMessage('La fecha no se encuentra en el formato requerido ISO8601'),
    query('estadoPartido')
        .optional()
        .isIn(estados).withMessage(`Los estados validos son: ${estados.join(', ')}`)
]


export const validatePartidoFilter = [
    body('torneoId')
        .isInt({gt:-1}).withMessage('El id del torneo no se encuentra en el formato adecuado numerico')
        .optional(),
    body('equipoLocalId')
        .isInt({gt:-1}).withMessage('El id del equipo local no se encuentra en el formato adecuado numerico')
        .optional(),
    body('equipoVisitanteId')
        .isInt({gt:-1}).withMessage('El id del equipo visitante no se encuentra en el formato adecuado numerico')
        .optional(),
    body('golesLocal')
        .optional()
        .isInt({gt:-1}).withMessage('El numero de goles del equipo local no se encuentra en el formato adecuado numerico'),
    body('golesVisitante')
        .optional()
        .isInt({gt:-1}).withMessage('El numero de goles del equipo visitante no se encuentra en el formato adecuado numerico'),
    body('fecha')
        .optional()
        .isISO8601().withMessage('La fecha no se encuentra en el formato requerido ISO8601'),
    body('estadoPartido')
        .optional()
        .isIn(estados).withMessage(`Los estados validos son: ${estados.join(', ')}`)
]


export const validatePartidoUpdate = [
    param('id')
        .notEmpty().withMessage('El id del patido es requerido')
        .isInt({gt:-1}).withMessage('El id del partido no se encuentra en el formato adecuado numerico'),
    body('torneoId')
        .isInt({gt:-1}).withMessage('El id del torneo no se encuentra en el formato adecuado numerico')
        .optional(),
    body('equipoLocalId')
        .isInt({gt:-1}).withMessage('El id del equipo local no se encuentra en el formato adecuado numerico')
        .optional(),
    body('equipoVisitanteId')
        .isInt({gt:-1}).withMessage('El id del equipo visitante no se encuentra en el formato adecuado numerico')
        .optional(),
    body('golesLocal')
        .optional()
        .isInt({gt:-1}).withMessage('El numero de goles del equipo local no se encuentra en el formato adecuado numerico'),
    body('golesVisitante')
        .optional()
        .isInt({gt:-1}).withMessage('El numero de goles del equipo visitante no se encuentra en el formato adecuado numerico'),
    body('fecha')
        .optional()
        .isISO8601().withMessage('La fecha no se encuentra en el formato requerido ISO8601'),
    body('estadoPartido')
        .optional()
        .isIn(estados).withMessage(`Los estados validos son: ${estados.join(', ')}`)
]