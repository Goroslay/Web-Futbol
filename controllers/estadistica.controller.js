import { crearEstadistica,obtenerEstadisticas,editarEstadistica,eliminarEstadistica } from "../models/estadistica.model.js";

const getEstadisticas= async (req,res,next) => {
    try {
        const estadisticas = await obtenerEstadisticas(req.query)
        return res.status(200).json({
            success:true,
            data:estadisticas
        })
    } catch (e) {
        next(e)
    }
}


const getEstadisticaById = async (req,res,next) => {
    try {
        const id= Number(req.params.id)
        const estadistica = await obtenerEstadisticas({id})
        return res.status(200).json({
            success:true,
            data:estadistica[0]
        })
    } catch (e) {
        next(e)
    }
}


const postEstadistica = async (req,res,next) => {
    try {
        const estadistica = await crearEstadistica(req.body)
        return res.status(201).json({
            success:true,
            data:estadistica
        })
    } catch (e) {
        next(e)
    }
}

const putEstadistica = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const estadistica = await editarEstadistica(id,req.body)
        return res.status(200).json({
            success:true,
            data:estadistica
        })
    } catch (e) {
        next(e)
    }
}

const deleteEstadistica = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const estadistica = await eliminarEstadistica(id)
        return res.status(200).json({
            success:true,
            data:estadistica
        })
    } catch (e) {
        next(e)
    }
}

export {
    getEstadisticaById,
    getEstadisticas,
    postEstadistica,
    putEstadistica,
    deleteEstadistica
}