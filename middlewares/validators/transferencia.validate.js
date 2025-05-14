import { body,param } from "express-validator";


const tipoTransferencia = ["traspaso","prestamo","libre"]

export const validateTransferenciaFilter = [
    body('id')
        .isInt({gt:-1}).withMessage('El id de la transferencia no se encuentra en el formato valido numerico')
        .optional(),
    body('jugadorId')
        .isString().withMessage('El id del jugador no se encuentra en el formato valido string')
        .optional(),
    body('equipoOrigenId')
        .isInt({gt:-1}).withMessage('El id del equipo de origen no se encuentra en el formato valido numerico')
        .optional(),
    body('equipoDestinoId')
        .isInt({gt:-1}).withMessage('El id del equipo destino no se encuentra en el formato valido numerico')
        .optional(),
    body('fecha')
        .isISO8601().withMessage('La fecha de la tranferencia no se encuentra en el formato valido ISO8601')
        .optional(),
    body('monto')
        .isDecimal().withMessage('El monto del traspaso no se encuentra en el formato valido decimal')
        .optional(),
    body('tipo')
        .isIn(tipoTransferencia).withMessage(`El tipo de transferencia no se encuentra entre las validas: ${tipoTransferencia.join(', ')}`)
        .optional()
]

export const validateTransferenciaCreate = [
    body('jugadorId')
        .isString().withMessage('El id del jugador no se encuentra en el formato valido string')
        .notEmpty().withMessage('El id del jugador traspasado es requerido'),
    body('equipoOrigenId')
        .isInt({gt:-1}).withMessage('El id del equipo de origen no se encuentra en el formato valido numerico')
        .notEmpty().withMessage('El id del equipo de donde proviene el jugador es requerido'),
    body('equipoDestinoId')
        .isInt({gt:-1}).withMessage('El id del equipo destino no se encuentra en el formato valido numerico')
        .notEmpty().withMessage('El id del equipo de destino del jugador es requerido'),
    body('fecha')
        .isISO8601().withMessage('La fecha de la tranferencia no se encuentra en el formato valido ISO8601')
        .notEmpty().withMessage('La fecha del transpaso es requerida'),
    body('monto')
        .isDecimal().withMessage('El monto del traspaso no se encuentra en el formato valido decimal')
        .optional(),
    body('tipo')
        .isIn(tipoTransferencia).withMessage(`El tipo de transferencia no se encuentra entre las validas: ${tipoTransferencia.join(', ')}`)
        .notEmpty().withMessage('El tipo de transpaso es requerido')
]


export const validateTransferenciaUpdate = [
    param('id')
        .isInt({gt:-1}).withMessage('El id de la transferencia no se encuentra en el formato valido numerico')
        .notEmpty().withMessage('El id de la transferencia es requerido'),
    body('jugadorId')
        .isString().withMessage('El id del jugador no se encuentra en el formato valido string')
        .optional(),
    body('equipoOrigenId')
        .isInt({gt:-1}).withMessage('El id del equipo de origen no se encuentra en el formato valido numerico')
        .optional(),
    body('equipoDestinoId')
        .isInt({gt:-1}).withMessage('El id del equipo destino no se encuentra en el formato valido numerico')
        .optional(),
    body('fecha')
        .isISO8601().withMessage('La fecha de la tranferencia no se encuentra en el formato valido ISO8601')
        .optional(),
    body('monto')
        .isDecimal().withMessage('El monto del traspaso no se encuentra en el formato valido decimal')
        .optional(),
    body('tipo')
        .isIn(tipoTransferencia).withMessage(`El tipo de transferencia no se encuentra entre las validas: ${tipoTransferencia.join(', ')}`)
        .optional()
]