import { body,param,query } from "express-validator"


export const validateEstadisticaFilter = [
    query('id')
        .isInt({gt:-1}).withMessage('El id de la estadistica no esta en el formato valido numerico')
        .optional(),
    query('jugadorId')
        .isString().withMessage('El id del jugador no esta en el formato valido string')
        .trim()
        .optional(),
    query('torneoId')
        .isInt({gt:-1}).withMessage('El id del torneo no esta en el formato valido numerico')
        .optional(),
    query('partidosJugados')
        .isInt({gt:-1}).withMessage('El numero de partidos jugados no esta en el formato valido numerico')
        .optional(),
    query('goles')
        .isInt({gt:-1}).withMessage('El numero de goles no esta en el formato valido numerico')
        .optional(),
    query('asistencias')
        .isInt({gt:-1}).withMessage('El numero de asistencias no esta en el formato valido numerico')
        .optional(),
    query('tarjetasAmarillas')
        .isInt({gt:-1}).withMessage('El numero de tarjetas amarillas no esta en el formato valido numerico')
        .optional(),
    query('tarjetasRojas')
        .isInt({gt:-1}).withMessage('El numero de tarjetas rojas no esta en el formato valido numerico')
        .optional(),
    query('minutosJugados')
        .isInt({gt:-1}).withMessage('El numero de minutos jugados no esta en el formato valido numerico')
        .optional()
]

export const validateEstadisticaCreate = [ 
    body('jugadorId')
        .isString().withMessage('El id del jugador no esta en el formato valido string')
        .trim()
        .notEmpty().withMessage('El id del jugador es requerido'),
    body('torneoId')
        .isInt({gt:-1}).withMessage('El id del torneo no esta en el formato valido numerico')
        .notEmpty().withMessage('El id del torneo es requerido'),
    body('partidosJugados')
        .isInt({gt:-1}).withMessage('El numero de partidos jugados no esta en el formato valido numerico')
        .optional(),
    body('goles')
        .isInt({gt:-1}).withMessage('El numero de goles no esta en el formato valido numerico')
        .optional(),
    body('asistencias')
        .isInt({gt:-1}).withMessage('El numero de asistencias no esta en el formato valido numerico')
        .optional(),
    body('tarjetasAmarillas')
        .isInt({gt:-1}).withMessage('El numero de tarjetas amarillas no esta en el formato valido numerico')
        .optional(),
    body('tarjetasRojas')
        .isInt({gt:-1}).withMessage('El numero de tarjetas rojas no esta en el formato valido numerico')
        .optional(),
    body('minutosJugados')
        .isInt({gt:-1}).withMessage('El numero de minutos jugados no esta en el formato valido numerico')
        .optional()
]


export const validateEstadisticaUpdate = [
        param('id')
        .isInt({gt:-1}).withMessage('El id de la estadistica no esta en el formato valido numerico')
        .notEmpty().withMessage('El id de la estadistica es requerido'),
    body('jugadorId')
        .isString().withMessage('El id del jugador no esta en el formato valido string')
        .trim()
        .optional(),
    body('torneoId')
        .isInt({gt:-1}).withMessage('El id del torneo no esta en el formato valido numerico')
        .optional(),
    body('partidosJugados')
        .isInt({gt:-1}).withMessage('El numero de partidos jugados no esta en el formato valido numerico')
        .optional(),
    body('goles')
        .isInt({gt:-1}).withMessage('El numero de goles no esta en el formato valido numerico')
        .optional(),
    body('asistencias')
        .isInt({gt:-1}).withMessage('El numero de asistencias no esta en el formato valido numerico')
        .optional(),
    body('tarjetasAmarillas')
        .isInt({gt:-1}).withMessage('El numero de tarjetas amarillas no esta en el formato valido numerico')
        .optional(),
    body('tarjetasRojas')
        .isInt({gt:-1}).withMessage('El numero de tarjetas rojas no esta en el formato valido numerico')
        .optional(),
    body('minutosJugados')
        .isInt({gt:-1}).withMessage('El numero de minutos jugados no esta en el formato valido numerico')
        .optional()
]