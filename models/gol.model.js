import AppError from '../utils/appError.js'
import cliente from '../config/prismaClient.js'

const prisma = cliente

const obtenerGoles = async (filtros = {}) => {
    const {id,partidoId,jugadorId,minuto,deEquipoId,aEquipoId} = filtros
    const where = {}

    if(id !== undefined) where.id= Number(id)
    
    if(partidoId !== undefined) where.partidoId = partidoId

    if(jugadorId) where.jugadorId=jugadorId

    if(minuto !== undefined) where.minuto = minuto

    if(deEquipoId !== undefined) where.deEquipoId = deEquipoId

    if(aEquipoId !== undefined) where.aEquipoId = aEquipoId

    const goles = await prisma.gol.findMany({
        where
    })
    
    return goles
}

const crearGol = async (gol) => {
    return prisma.$transaction(async (transaccion) => {
        if(gol.minuto>125 || gol.minuto<1) throw new AppError('Minuto de partido no valido',400)

        const existePartido = await obtenerPartido(gol.partidoId,transaccion)
        if(!existePartido) throw new AppError('Partido no encontrado',404)

        const existeJugador = await obtenerJugador(gol.jugadorId,transaccion)
        if(!existeJugador) throw new AppError('Jugador no encontrado',404)
        
        const existeDeEquipo = await obtenerEquipo(gol.deEquipoId,transaccion)
        if(!existeDeEquipo) throw new AppError('Equipo que anota gol no encontrado',404)

        const existeAEquipo = await obtenerEquipo(gol.aEquipoId,transaccion)
        if(!existeAEquipo) throw new AppError('Equipo que le anotaron gol no encontrado',404)

        if(existeJugador.equipoId!==gol.deEquipoId) throw new AppError('Este jugador no pertenece al equipo que anoto el gol',404)
        
        const existeEquipoEnPartido = await verificarEquipoPartido(
            gol.deEquipoId,
            gol.partidoId
        )
        if(!existeEquipoEnPartido) throw new AppError('Este equipo no pertenece a este partido',404)
        
        if(gol.aEquipoId === gol.deEquipoId) throw new AppError('El equipo que realizó el gol no puede ser el mismo que lo recibe',409)
        
        const nuevoGol = await transaccion.gol.create({
            data:{
                partidoId:gol.partidoId,
                jugadorId:gol.jugadorId,
                minuto:gol.minuto,
                deEquipoId:gol.deEquipoId,
                aEquipoId:gol.aEquipoId
            }
        })

        return nuevoGol

    })
}

const editarGol = async (golId,ediciones) => {
    return prisma.$transaction(async (transaccion) => {
        
        if(ediciones.minuto  !== undefined && (ediciones.minuto>125 || ediciones.minuto<1)) throw new AppError('Minuto de partido no valido',400)

        const existeGol = await obtenerGol(golId,transaccion)
        if(!existeGol) throw new AppError('Gol no encontrado',404)
            
        if(ediciones.partidoId  !== undefined){
            const existePartido = await obtenerPartido(ediciones.partidoId,transaccion)
            if(!existePartido) throw new AppError('Partido no encontrado',404)
        }
        
        if(ediciones.jugadorId ){
            const existeJugador = await obtenerJugador(ediciones.jugadorId,transaccion)
            if(!existeJugador) throw new AppError('Jugador no encontrado',404)
        }

        if(ediciones.deEquipoId  !== undefined){
            const existeDeEquipo = await obtenerEquipo(ediciones.deEquipoId,transaccion)
            if(!existeDeEquipo) throw new AppError('Equipo que anota gol no encontrado',404)
        }

        if(ediciones.aEquipoId  !== undefined){
            const existeAEquipo = await obtenerEquipo(ediciones.aEquipoId,transaccion)
            if(!existeAEquipo) throw new AppError('Equipo que recibe gol no encontrado',404)
        }

        const deEquipoId = ediciones.deEquipoId ?? existeGol.deEquipoId
        const aEquipoId = ediciones.aEquipoId ?? existeGol.aEquipoId
        if(deEquipoId === aEquipoId) {
            throw new AppError('El equipo que realizó el gol no puede ser el mismo que lo recibe',409)
        }

        const existeEquipoEnPartido = await verificarEquipoPartido(
            ediciones.deEquipoId ?? existeGol.deEquipoId,
            ediciones.partidoId ?? existeGol.partidoId,
            transaccion          
        )
        if(!existeEquipoEnPartido) throw new AppError('Este equipo no pertenece a este partido',404)

        const existeJugadorEnEquipo = await verificarJugadorEquipo(
            ediciones.jugadorId ?? existeGol.jugadorId,
            ediciones.deEquipoId ?? existeGol.deEquipoId,
            transaccion
        )
        if(!existeJugadorEnEquipo) throw new AppError('Este jugador no pertenece al equipo que anoto el gol',404)

        const golEditado = await transaccion.gol.update({
            where:{
                id:golId
            },
            data:{
                partidoId:ediciones.partidoId ?? existeGol.partidoId,
                jugadorId:ediciones.jugadorId ?? existeGol.jugadorId,
                minuto: ediciones.minuto ?? existeGol.minuto,
                deEquipoId: ediciones.deEquipoId ?? existeGol.deEquipoId,
                aEquipoId: ediciones.aEquipoId ?? existeGol.aEquipoId
            }
        })

        return golEditado
    })
}

const eliminarGol = async (golId) => {
    return prisma.$transaction(async (transaccion) => {
        const existeGol = await obtenerGol(golId,transaccion)
        if(!existeGol) throw new AppError('Gol no encontrado',404)
        
        const golEliminado = await transaccion.gol.delete({
            where:{
                id:golId
            }
        })

        return golEliminado
    })   
}


async function obtenerEquipo(equipoId,cliente=prisma) {
    const existeEquipo = await cliente.equipo.findUnique({
        where:{
            id:equipoId
        }
    })
    return existeEquipo
}

async function obtenerPartido(partidoId,cliente=prisma) {
    const existePartido = await cliente.partido.findUnique({
        where:{
            id:partidoId
        }
    })
    return existePartido
}

async function obtenerJugador(jugadorId,cliente=prisma) {
    const existeJugador = await cliente.jugador.findUnique({
        where:{
            id:jugadorId
        }
    })
    return existeJugador
}

async function obtenerGol(golId,cliente=prisma) {
    const existeGol = await cliente.gol.findUnique({
        where:{
            id:golId
        }
    })
    return existeGol
}

async function verificarJugadorEquipo(jugadorId,deEquipoId,cliente=prisma) {
    const existe = await cliente.jugador.findUnique({
        where:{
            id:jugadorId,
            equipoId:deEquipoId
        }
    })
    return existe
}

async function verificarEquipoPartido(deEquipoId,partidoId,cliente=prisma) {
    const existe = await cliente.partido.findUnique({
        where:{
            id:partidoId,
            OR:[
                {equipoLocalId:deEquipoId},
                {equipoVisitanteId:deEquipoId}
            ]
        }
    })
    return existe
}

export{
    obtenerGoles,
    crearGol,
    editarGol,
    eliminarGol
}
