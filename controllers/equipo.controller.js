import { crearEquipo,obtenerEquipos,editarEquipo,eliminarEquipo,agregarEquipoATorneo,eliminarEquipoDeTorneo } from "../models/equipo.model.js";


export const getEquipos = async (req,res,next) => {
    try {
        const equipos = await obtenerEquipos(req.body)
        return res.status(200).json({
            success:true,
            data:equipos
        })
    } catch (e) {
        next(e)
    }
}


export const getEquipoById = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const equipo = await obtenerEquipos({id})
        return res.status(200).json({
            success:true,
            data:equipo[0]
        })
    } catch (e) {
        next(e)
    }
}

export const postEquipo = async (req,res,next) => {
    try {
        const equipo = await crearEquipo(req.body)
        return res.status(201).json({
            success:true,
            data:equipo
        })
    } catch (e) {
        next(e)
    }
}


export const putEquipo = async (req,res,next) => {
    try {
        const id=Number(req.params.id)
        const equipo = await editarEquipo(id,req.body)
        return res.status(200).json({
            success:true,
            data:equipo
        })
    } catch (e) {
        next(e)
    }
}


export const deleteEquipo = async (req,res,next) => {
    try {
        const id = Number(req.params.id)
        const equipo = await eliminarEquipo(id)
        return res.status(200).json({
            success:true,
            data:equipo
        })
    } catch (e) {
        next(e)
    }
}


export const postEquipoATorneo = async (req,res,next) => {
    try {
        const equipoId = Number(req.params.equipoId)
        const torneoId = Number(req.params.torneoId)
        const equipo = await agregarEquipoATorneo(equipoId,torneoId)
        return res.status(200).json({
            success:true,
            data:equipo
        })
    } catch (e) {
        next(e)
    }
}


export const deleteEquipoAtorneo = async (req,res,next) => {
    try {
        const equipoId = Number(req.params.equipoId)
        const torneoId = Number(req.params.torneoId)
        const equipo = await eliminarEquipoDeTorneo(equipoId,torneoId)
        return res.status(200).json({
            success:true,
            data:equipo
        })
    } catch (e) {
        next(e)
    }
}