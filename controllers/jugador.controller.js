import {
    crearJugador,
    obtenerJugador,
    editarJugador,
    eliminarJugador,
    añadirJugadorAEquipo,
    eliminarJugadorDeEquipo
} from '../models/jugador.model.js'

const getJugadores = async (req,res,next) => {
    try {
        const jugadores = await obtenerJugador(req.body)
        return res.status(200).json({
            success:true,
            data:jugadores
        })
    } catch (e) {
        next(e)
    }
}


const getJugadorById = async (req,res,next) => {
    try {
        const id = req.params.id
        const jugador = await obtenerJugador({id})
        return res.status(200).json({
            success:true,
            data:jugador
        })
    } catch (e) {
        next(e)
    }
}


const postJugadores = async (req,res,next) => {
    try {
        const jugador=await crearJugador(req.body)
        return res.status(201).json({
            success:true,
            data:jugador
        })
    } catch (e) {
        next(e)
    }
}

const putJugadores = async (req,res,next) => {
    try {
        const id = req.params.id
        const jugador = await editarJugador(id,req.body)
        return res.status(200).json({
            success:true,
            data:jugador
        })
    } catch (e) {
        next(e)
    }
}


const deleteJugadores = async (req,res,next) => {
    try {
        const id = req.params.id
        const jugador = await eliminarJugador(id)
        return res.status(200).json({
            success:true,
            data:jugador
        })
    } catch (e) {
        next(e)
    }
}

const postJugadoresEquipo = async (req,res,next) => {
    try {
        const equipoId= Number(req.params.equipoId)
        const jugadorId=req.params.jugadorId
        const jugador = await añadirJugadorAEquipo(jugadorId,equipoId)

        res.status(200).json({
            success:true,
            data:jugador
        })
    } catch (e) {
        next(e)
    }
}

const deleteJugadoresEquipo = async (req,res,next) => {
    try {
        const equipoId= Number(req.params.equipoId)
        const jugadorId=req.params.jugadorId
        const jugador = await eliminarJugadorDeEquipo(jugadorId,equipoId)

        res.status(200).json({
            success:true,
            data:jugador
        })
    } catch (e) {
        next(e)
    }
}

export {
    getJugadores,
    getJugadorById,
    postJugadores,
    putJugadores,
    deleteJugadores,
    postJugadoresEquipo,
    deleteJugadoresEquipo
}