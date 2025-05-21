import { crearTransferencia,obtenerTransferencias,editarTransferencia,eliminarTransferencia } from "../models/transferencia.model.js";

const getTransferencias = async (req,res,next) => {
    try {
        const transferencias = await obtenerTransferencias(req.query)
        return res.status(200).json({
            success:true,
            data:transferencias
        })
    } catch (e) {
        next(e)
    }
}

const getTransferenciaById= async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const transferencia = await obtenerTransferencias({id})
        return res.status(200).json({
            success:true,
            data:transferencia[0]
        })
    } catch (e) {
        next(e)
    }
}


const postTransferencia = async (req,res,next) => {
    try {
        const transferencia = await crearTransferencia(req.body)
        return res.status(201).json({
            success:true,
            data:transferencia
        })
    } catch (e) {
        next(e)
    }
}


const putTransferencia = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const transferencia = await editarTransferencia(id,req.body)
        return res.status(200).json({
            success:true,
            data:transferencia
        })
    } catch (e) {
        next(e)
    }
}


const deleteTransferencia = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const transferencia = await eliminarTransferencia(id)
        return res.status(200).json({
            success:true,
            data:transferencia
        })
    } catch (e) {
        next(e)
    }
}


export {
    getTransferenciaById,
    getTransferencias,
    postTransferencia,
    putTransferencia,
    deleteTransferencia
}