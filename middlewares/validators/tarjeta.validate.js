import { body,param,query } from "express-validator"

const tipoTarjeta = ["amarilla","roja"]

export const validateTarjetaFilter = [
    query('id')
        .isInt({gt:-1}).withMessage('El id de la tarjeta no se encuentra en el formato valido numerico')
        .optional(),
    query('partidoId')
        .isInt({gt:-1}).withMessage('El id del partido no se encuentra en el formato valido numerico')
        .optional(),
    query('jugadorId')
        .isString().withMessage('El id del jugador no se encuentra en el formato valido string')
        .optional()
        .trim(),
    query('minuto')
        .isInt({gt:-1, lt:150}).withMessage('El minuto del partido no se encuentra en el formato valido numerico')
        .optional(),
    query('tipo')
        .isString().withMessage('El tipo de tarjeta no se encuentra en el formato valido string')
        .isIn(tipoTarjeta).withMessage(`El tipo de la tarjeta no se encuentra entre los tipos validos: ${tipoTarjeta.join(', ')}`)
        .optional()
]


export const validateTarjetaCreate = [
    body('partidoId')
        .isInt({gt:-1}).withMessage('El id del partido no se encuentra en el formato valido numerico')
        .notEmpty().withMessage('El id del partido es requerido'),
    body('jugadorId')
        .isString().withMessage('El id del jugador no se encuentra en el formato valido string')
        .notEmpty().withMessage('El id del jugador es requerido')
        .trim(),
    body('minuto')
        .isInt({gt:-1, lt:150}).withMessage('El minuto del partido no se encuentra en el formato valido numerico')
        .notEmpty().withMessage('El minuto del partido es requerido'),
    body('tipo')
        .isString().withMessage('El tipo de tarjeta no se encuentra en el formato valido string')
        .isIn(tipoTarjeta).withMessage(`El tipo de la tarjeta no se encuentra entre los tipos validos: ${tipoTarjeta.join(', ')}`)
        .notEmpty().withMessage('El tipo de tarjeta es requerido')
]


export const validateTarjetaUpdate = [
    param('id')
        .isInt({gt:-1}).withMessage('El id de la tarjeta no se encuentra en el formato valido numerico')
        .notEmpty().withMessage('El id de la tarjeta es requerido'),
    body('partidoId')
        .isInt({gt:-1}).withMessage('El id del partido no se encuentra en el formato valido numerico')
        .optional(),
    body('jugadorId')
        .isString().withMessage('El id del jugador no se encuentra en el formato valido string')
        .optional()
        .trim(),
    body('minuto')
        .isInt({gt:-1, lt:150}).withMessage('El minuto del partido no se encuentra en el formato valido numerico')
        .optional(),
    body('tipo')
        .isString().withMessage('El tipo de tarjeta no se encuentra en el formato valido string')
        .isIn(tipoTarjeta).withMessage(`El tipo de la tarjeta no se encuentra entre los tipos validos: ${tipoTarjeta.join(', ')}`)
        .optional()
]