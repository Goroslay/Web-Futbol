import { body,param,query } from "express-validator";

const posiciones = ['PO','LD','DF','LI','MCD','MC','MCO','MI','MD','EI','ED','DC']

export const validateJugadorFilter = [
    query('nombres')
        .optional()
        .isString().withMessage('El nombre no se encuentra en el formato adecuado String')
        .trim(),
    query('apellidos')
        .optional()
        .isString().withMessage('El apellido no se encuentra en el formato adecuado String')
        .trim(),
    query('fechaNacimiento')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha en formato ISO 8601'),
    query('nacionalidad')
        .optional() 
        .isString().withMessage('La nacionalidad no se encuentra en el formato adecuado String')
        .trim(),
    query('posicion')
        .optional()
        .isIn(posiciones).withMessage(`La posicion debe ser una de las siguiente: ${posiciones.join(', ')}`)
        .trim(),
    query('dorsal')
        .optional()
        .isInt({gt:0,lt:30}).withMessage('El dorsal no se encuentra en el formato adecuado numerico'),
    query('equipoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del equipo no se encuentra en el formato adecuado numerico')
]

export const validateJugadorCreation = [
    body('id')
        .notEmpty().withMessage('El id es requerido'),
    body('nombres')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre no se encuentra en el formato adecuado String')
        .isLength({min:2}).withMessage('El nombre debe tener minimo 3 caracteres')
        .trim(),
    body('apellidos')
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido no se encuentra en el formato adecuado String')
        .isLength({min:2}).withMessage('El apellido debe tener minimo 3 caracteres')
        .trim(),
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha en formato ISO 8601'),
    body('nacionalidad')
        .notEmpty().withMessage('La nacionalidad es requerida')
        .isString().withMessage('La nacionalidad no se encuentra en el formato adecuado String')
        .trim(),
    body('posicion')
        .notEmpty().withMessage('La posicion es requerida')
        .isIn(posiciones).withMessage(`La posicion debe ser una de las siguiente: ${posiciones.join(', ')}`)
        .trim(),
    body('dorsal')
        .notEmpty().withMessage('El dorsal es requerido')
        .isInt({gt:0,lt:30}).withMessage('El dorsal no se encuentra en el formato adecuado numerico'),
    body('equipoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del equipo no se encuentra en el formato adecuado numerico')
]

export const validateUpdateJugador = [
    param('id')
        .notEmpty().withMessage('El id del jugador es requerido')
        .isString().withMessage('El id no se encuentra en el formato adecuado String'),
    body('nombres')
        .optional()
        .isString().withMessage('El nombre no se encuentra en el formato adecuado String')
        .isLength({min:2}).withMessage('El nombre debe tener minimo 3 caracteres')
        .trim(),
    body('apellidos')
        .optional()
        .isString().withMessage('El apellido no se encuentra en el formato adecuado String')
        .isLength({min:2}).withMessage('El apellido debe tener minimo 3 caracteres')
        .trim(),
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha en formato ISO 8601'),
    body('nacionalidad')
        .optional()
        .isString().withMessage('La nacionalidad no se encuentra en el formato adecuado String')
        .trim(),
    body('posicion')
        .optional()
        .isIn(posiciones).withMessage(`La posicion debe ser una de las siguiente: ${posiciones.join(', ')}`)
        .trim(),
    body('dorsal')
        .optional()
        .isInt({gt:0,lt:30}).withMessage('El dorsal no se encuentra en el formato adecuado numerico'),
    body('equipoId')
        .optional()
        .isInt({gt:-1}).withMessage('El id del equipo no se encuentra en el formato adecuado numerico')
]
