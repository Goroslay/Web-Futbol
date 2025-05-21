import AppError from '../utils/appError.js'
import cliente from '../config/prismaClient.js'

const prisma = cliente

const obtenerEstadisticas = async (filtros = {}) => {
    const {id,jugadorId,torneoId,partidosJugados,goles,asistencias,tarjetasAmarillas,tarjetasRojas,minutosJugados} = filtros
    const where = {}

    if(id !== undefined) where.id = id

    if(jugadorId) where.jugadorId = jugadorId

    if(torneoId !== undefined) where.torneoId = torneoId

    if(partidosJugados !== undefined) where.partidosJugados = partidosJugados

    if(goles !== undefined) where.goles = goles

    if(asistencias !== undefined) where.asistencias = asistencias

    if(tarjetasAmarillas !== undefined) where.tarjetasAmarillas = tarjetasAmarillas

    if(tarjetasRojas !== undefined) where.tarjetasRojas = tarjetasRojas

    if(minutosJugados !== undefined) where.minutosJugados = minutosJugados

    const estadisticas = await prisma.estadisticaJugador.findMany({
        where
    })

    return estadisticas
}


const crearEstadistica = async (estadistica) => {
    return prisma.$transaction(async(transaccion)=>{
        const existeJugador = await obtenerJugador(estadistica.jugadorId,transaccion)
        if(!existeJugador) throw new AppError('Este jugador no se encuentra registrado',404)

        const existeTorneo = await obtenerTorneo(estadistica.torneoId,transaccion)
        if(!existeTorneo) throw new AppError('Este torneo no se encuentra registrado',404)

        const existeJugadorEnTorneo = existeTorneo.equipos.some((equipo)=>equipo.id===existeJugador.equipoId)
        console.log(existeJugadorEnTorneo)
        if(!existeJugadorEnTorneo) throw new AppError('Este jugador no participa en este torneo',404)
        
        if(estadistica.partidosJugados < 0 ) throw new AppError('Numero no valido para partidos jugados',400)

        if(estadistica.goles < 0 ) throw new AppError('Numero no valido para goles',400)

        if(estadistica.asistencias < 0 ) throw new AppError('Numero no valido para asistencias',400)
    
        if(estadistica.tarjetasAmarillas < 0 ) throw new AppError('Numero no valido para tarjetas amarillas',400)

        if(estadistica.tarjetasRojas < 0 ) throw new AppError('Numero no valido para tarjetas rojas',400)

        const nuevaEstadistica = await transaccion.estadisticaJugador.create({
            data:{
                jugadorId: estadistica.jugadorId,
                torneoId: estadistica.torneoId,
                partidosJugados: estadistica.partidosJugados ?? 0,
                goles: estadistica.goles ?? 0,
                asistencias: estadistica.asistencias ?? 0,
                tarjetasAmarillas: estadistica.tarjetasAmarillas ?? 0,
                tarjetasRojas: estadistica.tarjetasRojas ?? 0,
                minutosJugados: estadistica.minutosJugados ?? 0
            }
        })

        return nuevaEstadistica
    })
}


const editarEstadistica = async (estadisticaId,ediciones) => {
    return prisma.$transaction(async (transaccion) => {
        const existeEstadistica = await obtenerEstadistica(estadisticaId,transaccion)
        if(!existeEstadistica) throw new AppError('No se encontró estadistica',404)

        const existeTorneo = await obtenerTorneo(ediciones.torneoId ?? existeEstadistica.torneoId,transaccion)
        if(!existeTorneo) throw new AppError('Este torneo no se encuentra registrado',404)
        
        if(ediciones.jugadorId){
            const existeJugador = await obtenerJugador(ediciones.jugadorId,transaccion)
            if(!existeJugador) throw new AppError('Este jugador no se encuentra registrado',404)
            const existeJugadorEnTorneo = existeTorneo.equipos.some((equipo)=>equipo.id===existeJugador.equipoId)
            if(!existeJugadorEnTorneo) throw new AppError('Este jugador no participa en este torneo',404)
        }

        if(ediciones.partidosJugados < 0 ) throw new AppError('Numero no valido para partidos jugados',400)

        if(ediciones.goles < 0 ) throw new AppError('Numero no valido para goles',400)

        if(ediciones.asistencias < 0 ) throw new AppError('Numero no valido para asistencias',400)
    
        if(ediciones.tarjetasAmarillas < 0 ) throw new AppError('Numero no valido para tarjetas amarillas',400)

        if(ediciones.tarjetasRojas < 0 ) throw new AppError('Numero no valido para tarjetas rojas',400)
        
        const estadisticaEditada = await transaccion.estadisticaJugador.update({
            where:{
                id:estadisticaId
            },
            data:{
                jugadorId: ediciones.jugadorId ?? existeEstadistica.jugadorId,
                torneoId: ediciones.torneoId ?? existeEstadistica.torneoId,
                partidosJugados: ediciones.partidosJugados ?? existeEstadistica.partidosJugados,
                goles: ediciones.goles ?? existeEstadistica.goles,
                asistencias: ediciones.asistencias ?? existeEstadistica.asistencias,
                tarjetasAmarillas: ediciones.tarjetasAmarillas ?? existeEstadistica.tarjetasAmarillas,
                tarjetasRojas: ediciones.tarjetasRojas ?? existeEstadistica.tarjetasRojas,
                minutosJugados: ediciones.minutosJugados ?? existeEstadistica.minutosJugados
            }
        })

        return estadisticaEditada
    })
}


const eliminarEstadistica = async (estadisticaId) => {
    return prisma.$transaction(async(transaccion)=>{
        const existeEstadistica = await obtenerEstadistica(estadisticaId,transaccion)
        if(!existeEstadistica) throw new AppError('No se encontró estadistica',404)
        
        const estadisticaEliminada = await transaccion.estadisticaJugador.delete({
            where:{
                id:estadisticaId
            }
        })

        return estadisticaEliminada
    })
}


async function obtenerEstadistica(estadisticaId,cliente=prisma) {
    const estadistica = await cliente.estadisticaJugador.findUnique({

        where:{
            id:estadisticaId
        }
    })

    return estadistica
}


async function obtenerJugador(jugadorId,cliente=prisma) {
    const jugador = await cliente.jugador.findUnique({
        where:{
            id:jugadorId
        }
    })

    return jugador
}

async function obtenerTorneo(torneoId,cliente=prisma) {
    const torneo = await cliente.torneo.findUnique({
        where:{
            id:torneoId
        },
        include:{
            equipos:true
        }
    })

    return torneo
}


export {
    obtenerEstadisticas,
    crearEstadistica,
    editarEstadistica,
    eliminarEstadistica
}