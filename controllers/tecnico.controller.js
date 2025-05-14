import { crearTecnico,obtenerTecnicos,editarTecnico,eliminarTecnico } from "../models/tecnico.model.js";

const getTecnicos = async (req,res,next) => {
    try {
        const tecnicos = await obtenerTecnicos(req.body)
        return res.status(200).json({
            success:true,
            data:tecnicos
        })
    } catch (e) {
        next(e)
    }
}

const getTecnicosById = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const tecnicos = await obtenerTecnicos({id})
        return res.status(200).json({
            success:true,
            data:tecnicos[0]
        })
    } catch (e) {
        next(e)
    }
}


const postTecnicos = async (req,res,next) => {
    try {
        const tecnicos = await crearTecnico(req.body)
        return res.status(201).json({
            success:true,
            data:tecnicos
        })
    } catch (e) {
        next(e)
    }
}

const putTecnicos = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const tecnicos = await editarTecnico(id,req.body)
        return res.status(200).json({
            success:true,
            data:tecnicos
        })
    } catch (e) {
        next(e)
    }
}

const deleteTecnicos = async (req,res,next) => {
    try {
        const id=Number(req.params.id)
        const tecnicos = await obtenerTecnicos(id)
        return res.status(200).json({
            success:true,
            data:tecnicos
        })
    } catch (e) {
        next(e)
    }
}

export{
    getTecnicos,
    getTecnicosById,
    postTecnicos,
    putTecnicos,
    deleteTecnicos
}