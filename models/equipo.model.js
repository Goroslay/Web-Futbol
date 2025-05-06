import cliente from '../config/prismaClient.js'
import AppError from '../utils/appError.js'

const prisma = cliente

const obtenerEquipo = async (filtros={}) => {
    const {id,nombre,fechaFundacion,ciudad,estadio,torneoId,tecnicoId} = filtros
    const where = {}

    if(id) where.id = id

    if(nombre) where.nombre = {contains:nombre,mode:'insensitive'}

    if(fechaFundacion) where.fechaFundacion = new Date(fechaFundacion)

    if(ciudad) where.ciudad = {contains:ciudad,mode:'insensitive'}

    if(estadio) where.estadio = {contains:estadio,mode:'insensitive'}

    if(torneoId) where.torneoId=torneoId

    if(tecnicoId) where.tecnicoId=tecnicoId

    const equipos = await prisma.equipo.findMany({
        where,
        orderBy:{
            nombre:'desc'
        }
    })

    return equipos

}

const agregarEquipo = async (nuevoEquipo) => {

    return prisma.$transaction(async(transaccion)=>{

        const existeNombre = await transaccion.equipo.findFirst({
            where:{
                nombre:{contains:nuevoEquipo.nombre,mode:'insensitive'}
            }
        })

        if(existeNombre){
            throw new AppError('Recurso con nombre duplicado',409)
        }
        
        const existeTecnico = await transaccion.tecnico.findFirst({
            where:{
                tecnicoId:nuevoEquipo.tecnicoId
            }
        })

        if(!existeTecnico){
            throw new AppError('Recurso tecnico no encontrado',404)
        }

        const existeEquipoConTecnico = await transaccion.equipo.findFirst({
            where:{
                tecnicoId:nuevoEquipo.tecnicoId
            }
        })

        if(existeEquipoConTecnico){
            throw new AppError('Recurso con tecnico duplicado',409)
        }

        const existeTorneo = await transaccion.torneo.findFirst({
            where:{
                id:nuevoEquipo.torneoId
            }
        })

        if(!existeTorneo){
            throw new AppError('Recurso torneo no encontrado',404)
        }

        const equipo = await transaccion.equipo.create({
            data:{
                nombre:nuevoEquipo.nombre,
                logo:nuevoEquipo.logo || 'default.png',
                fechaFundacion:nuevoEquipo.fechaFundacion,
                ciudad:nuevoEquipo.ciudad,
                estadio:nuevoEquipo.estadio,
                torneoId:nuevoEquipo.torneoId,
                tecnicoId:nuevoEquipo.tecnicoId,
                puntos:nuevoEquipo.puntos || 0
            }
        })

        return equipo
    })
    
}

const editarEquipo = async (equipoId,ediciones) => {
    return prisma.$transaction(async (transaccion) => {
        const existe = await transaccion.equipo.findFirst({
            where:{
                id:equipoId
            }
        })
        
        if(!existe){
            throw new AppError('Recurso no encontrado',404)
        }
        if(ediciones.nombre){
            const existeNombre = await transaccion.equipo.findFirst({
                where:{
                    nombre:{contains:ediciones.nombre,mode:'insensitive'}
                }
            })
            if(existeNombre) throw new AppError('Recurso con nombre duplicado',409)
        }

        if(ediciones.tecnicoId){
            const existeTecnico = await transaccion.tecnico.findFirst({
                where:{
                    id:ediciones.tecnicoId
                }
            })

            if(!existeTecnico) throw new AppError('Recurso tecnico no encontrado',404)
            
            const existeEquipoConTecnico = await transaccion.equipo.findFirst({
                where:{
                    tecnicoId:ediciones.tecnicoId
                }
            })

            if(existeEquipoConTecnico) throw new AppError('Recurso con tecnico duplicado',409)
        }

        const equipoEditado = prisma.equipo.update({
            where:{
                id:equipoId
            },
            data:{
                nombre: ediciones.nombre ?? existe.nombre,
                logo: ediciones.logo ?? existe.logo,
                fechaFundacion: ediciones.fechaFundacion ? new Date(ediciones.fechaFundacion) : existe.fechaFundacion,
                ciudad: ediciones.ciudad ?? existe.ciudad,
                estadio: ediciones.estadio ?? existe.estadio,
                torneoId: ediciones.torneoId ?? existe.torneoId,
                tecnicoId: ediciones.tecnicoId ?? existe.tecnicoId,
                puntos: ediciones.puntos ?? existe.puntos
            }
        })

        return equipoEditado

    })
    
}

const eliminarEquipo = async (equipoId) => {
    return prisma.$transaction(async (transaccion) => {
        const existe = await transaccion.equipo.findFirst({
            where:{
                id:equipoId
            }
        })

        if(!existe) throw new AppError('Recurso no encontrado',404)

        const equipoEliminado = await transaccion.equipo.delete({
            where:{
                id:equipoId
            }
        })

        return equipoEliminado
    })
    
}

const agregarEquipoATorneo = async (equipoId,torneoId) => {
    return prisma.$transaction(async (transaccion) => {
        const existeEquipo = await transaccion.equipo.findFirst({
            where:{
                id:equipoId
            }
        })

        if(!existeEquipo) throw new AppError('Recurso equipo no encontrado',404)

        const existeTorneo = await transaccion.torneo.findFirst({
            where:{
                id:torneoId
            }
        })

        if(!existeTorneo) throw new AppError('Recurso torneo no encontrado',404)
         
        const nuevoEquipoEnTorneo = await transaccion.equipo.update({
            where:{
                id:equipoId
            },
            data:{
                torneoId:torneoId
            }
        })

        return nuevoEquipoEnTorneo
    })
}

const eliminarEquipoDeTorneo = async (equipoId,torneoId) => {
    return prisma.$transaction(async (transaccion) => {
        const existeEquipo = await transaccion.equipo.findFirst({
            where:{
                id:equipoId
            }
        })

        if(!existeEquipo) throw new AppError('Recurso equipo no encontrado',404)

        const existeTorneo = await transaccion.torneo.findFirst({
            where:{
                id:torneoId
            }
        })

        if(!existeTorneo) throw new AppError('Recurso torneo no encontrado',404)
    
        const existeEquipoEnTorneo = await transaccion.equipo.findFirst({
            where:{
                id:equipoId,
                torneoId:torneoId
            }
        })
        if(!existeEquipoEnTorneo) throw new AppError('Recurso no encontrado',404)
        
        const equipoEliminadoDeTorneo = await transaccion.equipo.update({
            where:{
                id:equipoId
            },
            data:{
                torneoId:null
            }
        })

        return equipoEliminadoDeTorneo
    })
}

export {
    obtenerEquipo,
    agregarEquipo,
    editarEquipo,
    eliminarEquipo,
    agregarEquipoATorneo,
    eliminarEquipoDeTorneo
}