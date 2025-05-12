import cliente from '../config/prismaClient.js'
import AppError from '../utils/appError.js'

const prisma = cliente


const obtenerTorneo= async (filtros={}) => {

    const {id,nombre,temporada,fechaInicio,fechaFin} = filtros

    const where = {}

    if(id){
        where.id=id
    }

    if(nombre){
        where.nombre={contains:nombre,mode:'insensitive'}
    }

    if(temporada){
        where.temporada=temporada
    }

    if(fechaInicio){
        where.fechaInicio=new Date(fechaInicio)
    }

    if(fechaFin){
        where.fechaFin=new Date(fechaFin)
    }

    const torneos = await prisma.torneo.findMany({
        where,
        orderBy:{
            fechaInicio:'desc'
        },
        include:{
            equipos:true
        }
    })
    
    return torneos
}

const crearTorneo= async (torneo)=>{

    return prisma.$transaction(async(transaccion)=>{

        const existe = await verificarTorneoPorNombre(torneo.nombre,transaccion)
        if(existe && existe.temporada===torneo.temporada){
            throw new AppError('Este torneo ya se encuentra registrado',409)
        }

        const fechaInicio = new Date(torneo.fechaInicio)
        const fechaFin = new Date(torneo.fechaFin)

        if(fechaFin < fechaInicio) throw new AppError('La fecha de final del torneo no puede ser antes de la fecha de inicio')

        console.log()

        const nuevoTorneo = await transaccion.torneo.create({
            data:{
                nombre:torneo.nombre,
                temporada:torneo.temporada,
                fechaInicio:torneo.fechaInicio,
                fechaFin:torneo.fechaFin,
                descripcion:torneo.descripcion
            }
        })
        return nuevoTorneo

    })

}

const editarTorneo = async (torneoId,ediciones) => {

    return prisma.$transaction(async(transaccion)=>{

        const existe = await verificarTorneoPorID(torneoId,transaccion)

        if(!existe){
            throw new AppError('Este torneo no se encuentra registrado',404)
        }
    
        if(ediciones.nombre){
            const existeTorneoConTemporada = await verificarTorneoPorNombre(ediciones.nombre,transaccion)
            if(existeTorneoConTemporada && existeTorneoConTemporada.temporada===ediciones.temporada){
                throw new AppError('Este torneo ya se encuentra registrado',409)
            }
        }

        const fechaInicio = ediciones.fechaInicio ? new Date(ediciones.fechaInicio) : existe.fechaInicio
        const fechaFin = ediciones.fechaFin ? new Date(ediciones.fechaFin) : existe.fechaFin

        if(fechaFin < fechaInicio) throw new AppError('La fecha de final del torneo no puede ser antes de la fecha de inicio')
    
        const torneoEditado = await transaccion.torneo.update({
            where:{
                id:torneoId
            },
            data:{
                nombre:ediciones.nombre ?? existe.nombre,
                temporada:ediciones.temporada ?? existe.temporada,
                fechaInicio:ediciones.fechaInicio ? new Date(ediciones.fechaInicio) : existe.fechaInicio,
                fechaFin:ediciones.fechaFin ? new Date(ediciones.fechaFin) : existe.fechaFin,
                descripcion:ediciones.descripcion ?? existe.descripcion
            }
        })
    
        return torneoEditado
    

    })

    
}


const eliminarTorneo = async (torneoId) => {

    return prisma.$transaction(async(transaccion)=>{

        const existe = await verificarTorneoPorID(torneoId,transaccion)

        if(!existe){
            throw new AppError('Este torneo no se encuentra registrado',404)
        }
    
        const torneoEliminado = await transaccion.torneo.delete({
            where:{
                id:torneoId
            }
        })
        return torneoEliminado

    })
}

async function verificarTorneoPorID(torneoId,cliente=prisma) {
    const existe = await cliente.torneo.findUnique({
        where:{
            id:torneoId
        }
    })
    return existe
}

async function verificarTorneoPorNombre(torneoNombre,cliente=prisma) {
    const existe = await cliente.torneo.findFirst({
        where:{
            nombre:torneoNombre
        }
    })
    return existe
}

export {
    obtenerTorneo,
    crearTorneo,
    editarTorneo,
    eliminarTorneo
}