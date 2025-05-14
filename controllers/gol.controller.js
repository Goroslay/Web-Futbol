import { crearGol,obtenerGoles,editarGol,eliminarGol } from "../models/gol.model.js";

const getGol = async (req,res,next) => {
    try {
        const gol = await obtenerGoles(req.body)
        return res.status(200).json({
            success:true,
            data:gol
        })
    } catch (e) {
        next(e)
    }
}

const getGolById = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const gol = await obtenerGoles({id})
        return res.status(200).json({
            success:true,
            data:gol[0]
        })
    } catch (e) {
        next(e)
    }
}


const postGol = async (req,res,next) => {
    try {
        const gol = await crearGol(req.body)
        return res.status(201).json({
            success:true,
            data:gol
        })
    } catch (e) {
        next(e)
    }
}


const putGol = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const gol = await editarGol(id, req.body)
        return res.status(200).json({
            success:true,
            data:gol
        })
    } catch (e) {
        next(e)
    }
}

const deleteGol = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const gol = await eliminarGol(id)
        return res.status(200).json({
            success:true,
            data:gol
        })
    } catch (e) {
        next(e)
    }
}

export{
    getGol,
    getGolById,
    postGol,
    putGol,
    deleteGol
}