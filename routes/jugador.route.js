import { Router } from "express";

import { validateJugador } from "../middlewares/validators/index.validator.js";
import { validarCampos } from "../middlewares/validators/common.validator.js";

import { getJugadores ,getJugadorById,postJugadores,putJugadores,deleteJugadores,postJugadoresEquipo,deleteJugadoresEquipo} from "../controllers/jugador.controller.js";

const jugadorRouter = Router()

jugadorRouter.get('/jugadores',validateJugador.validateJugadorFilter,validarCampos,getJugadores)

jugadorRouter.get('/jugadores/:id',getJugadorById)

jugadorRouter.post('/jugadores',validateJugador.validateJugadorCreation,validarCampos,postJugadores)

jugadorRouter.put('/jugadores/:id',validateJugador.validateUpdateJugador,validarCampos,putJugadores)

jugadorRouter.delete('/jugadores/:id',deleteJugadores)

jugadorRouter.post('/jugadores/:jugadorId/:equipoId',postJugadoresEquipo)

jugadorRouter.delete('/jugadores/:jugadorId/:equipoId',deleteJugadoresEquipo)

export default jugadorRouter