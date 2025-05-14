import { editarPartido,crearPartido,eliminarPartido,obtenerPartidos } from "../models/partido.model.js";


const getPartidos = async (req,res,next) => {
    try {
        const partidos = await obtenerPartidos(req.body)
        return res.status(200).json({
            success: true,
            data:partidos
        })
    } catch (e) {
        next(e)
    }
}

const getPartidosById = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const partido = await obtenerPartidos({id})
        return res.status(200).json({
            success:true,
            data:partido[0]
        })
    } catch (e) {
        next(e)
    }
}


const postPartido = async (req,res,next) => {
    try {
        const partido = await crearPartido(req.body)
        return res.status(201).json({
            success:true,
            data:partido
        })
    } catch (e) {
        next(e)
    }
}

const putPartido = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const partido = await editarPartido(id,req.body)
        return res.status(200).json({
            success:true,
            data:partido
        })
    } catch (e) {
        next(e)
    }
}


const deletePartido = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const partido = await eliminarPartido(id)
        return res.status(200).json({
            success:true,
            data:partido
        })
    } catch (e) {
        next(e)
    }
}

export {
    getPartidos,
    getPartidosById,
    postPartido,
    putPartido,
    deletePartido
}