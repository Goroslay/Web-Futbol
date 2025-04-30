import equiposRouter from './equipo.route.js'
import estadioRouter from './estadio.route.js'
import estadisticaRouter from './estadistica.route.js'
import golRouter from './gol.route.js'
import jugadorRouter from './jugador.route.js'
import partidoRouter from './partido.route.js'
import tarjetaRouter from './tarjeta.route.js'
import tecnicoRouter from './tecnico.route.js'
import torneoRouter from './torneo.route.js'
import transferenciaRouter from './transferencia.route.js'


import { Router } from 'express'


const indexRouter = Router()

indexRouter.use(equiposRouter)
indexRouter.use(estadioRouter)
indexRouter.use(estadisticaRouter)
indexRouter.use(golRouter)
indexRouter.use(jugadorRouter)
indexRouter.use(partidoRouter)
indexRouter.use(tarjetaRouter)
indexRouter.use(tecnicoRouter)
indexRouter.use(torneoRouter)
indexRouter.use(transferenciaRouter)

export default indexRouter