import { crearTarjeta,obtenerTarjetas,editarTarjeta,eliminarTarjeta } from "../models/tarjeta.model.js";

const getTarjetas = async (req,res,next) => {
    try {
        const tarjetas = await obtenerTarjetas(req.query)
        return res.status(200).json({
            success:true,
            data:tarjetas
        })
    } catch (e) {
        next(e)
    }
}


const getTarjetaById = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const tarjeta = await obtenerTarjetas({id})
        return res.status(201).json({
            success:true,
            data:tarjeta[0]
        })
    } catch (e) {
        next(e)
    }
}


const postTarjeta = async (req,res,next) => {
    try {
        const tarjeta = await crearTarjeta(req.body)
        return res.status(200).json({
            success:true,
            data:tarjeta
        })
    } catch (e) {
        next(e)
    }
}


const putTarjeta = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const tarjeta = await editarTarjeta(id,req.body)
        return res.status(200).json({
            success:true,
            data:tarjeta
        })
    } catch (e) {
        next(e)
    }
}

const deleteTarjeta = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const tarjeta = await eliminarTarjeta(id)
        return res.status(200).json({
            success:true,
            data:tarjeta
        })
    } catch (e) {
        next(e)
    }
}

export{
    getTarjetaById,
    getTarjetas,
    postTarjeta,
    putTarjeta,
    deleteTarjeta
}