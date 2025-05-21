import cliente from '../config/prismaClient.js'
import AppError from '../utils/appError.js'

const prisma = cliente

const obtenerJugador = async (filtros = {}) => {
    const {id,nombres,apellidos,fechaNacimiento,nacionalidad,posicion,dorsal,equipoId} = filtros
    const where = {}

    if(id !==undefined) where.id=id

    if(nombres) where.nombres = {contains:nombres,mode:'insensitive'}

    if(apellidos) where.apellidos = {contains:apellidos,mode:'insensitive'}

    if(fechaNacimiento) where.fechaNacimiento = new Date(fechaNacimiento)

    if(nacionalidad) where.nacionalidad = {contains:nacionalidad,mode:'insensitive'}

    if(posicion) where.posicion = {contains:posicion,mode:'insensitive'}

    if(dorsal !==undefined) where.dorsal = Number(dorsal)

    if(equipoId !==undefined) where.equipoId = Number(equipoId)

    const jugadores =await prisma.jugador.findMany({
        where,
        orderBy: [
            { apellidos: 'desc' },
            { nombres: 'desc' }
        ]
    })

    return jugadores
}

const crearJugador = async (jugador) => {
    return prisma.$transaction(async(transaccion)=>{

        const existeJugador = await transaccion.jugador.findFirst({
            where:{
                id:jugador.id
            }
        })

        if(existeJugador) throw new AppError('El jugador ya se encuentra registrado',409)

        if(jugador.equipoId){
            const existeEquipo = await transaccion.equipo.findFirst({
                where:{
                    id:jugador.equipoId
                }
            })

            if(!existeEquipo) throw new AppError('El equipo no se encuentra registrado',404)

            const existeDorsalEquipo = await transaccion.jugador.findFirst({
                where:{
                    dorsal:jugador.dorsal,
                    equipoId:jugador.equipoId,
                    NOT: { id: jugador.id }
                }
            })

            if(existeDorsalEquipo) throw new AppError('El dorsal ya está en uso en este equipo',409)
        }
        const nuevoJugador = await transaccion.jugador.create({
            data:{
                id:jugador.id,
                nombres:jugador.nombres,
                apellidos:jugador.apellidos,
                fechaNacimiento: new Date(jugador.fechaNacimiento),
                nacionalidad:jugador.nacionalidad,
                posicion:jugador.posicion,
                dorsal:jugador.dorsal,
                equipoId:jugador.equipoId
            }
        })
        
        return nuevoJugador

    })
}

const editarJugador = async (jugadorId,ediciones) => {
    return prisma.$transaction(async (transaccion) => {
        const existeJugador = await transaccion.jugador.findFirst({
            where:{
                id:jugadorId
            }
        })

        if(!existeJugador) throw new AppError('El jugador no se encuentra registrado',404)
        
        if(ediciones.equipoId && !ediciones.dorsal){
            const existeEquipo = await transaccion.equipo.findFirst({
                where:{
                    id:ediciones.equipoId
                }
            })
            if(!existeEquipo) throw new AppError('El equipo no se encuentra registrado',404)
        }

        if(ediciones.dorsal && !ediciones.equipoId){
            const existeDorsalEquipo = await transaccion.jugador.findFirst({
                where:{
                    equipoId:existeJugador.equipoId,
                    dorsal:ediciones.dorsal,
                    NOT:[
                            { id: jugadorId },
                            {equipoId:null}
                    ]
                }
            })
            if(existeDorsalEquipo) throw new AppError('El dorsal ya está en uso en este equipo',409)
        }

        if(ediciones.dorsal && ediciones.equipoId){
            const existeDorsalEquipo = await transaccion.jugador.findFirst({
                where:{
                    equipoId:ediciones.equipoId,
                    dorsal:ediciones.dorsal,
                     NOT:[
                            { id: jugadorId },
                            {equipoId:null}
                    ]
                }
            })
            if(existeDorsalEquipo) throw new AppError('El dorsal ya está en uso en este equipo',409)
        }

        const jugadorEditado = await transaccion.jugador.update({
            where:{
                id:jugadorId
            },
            data:{
                nombres:ediciones.nombres ?? existeJugador.nombres,
                apellidos:ediciones.apellidos ?? existeJugador.apellidos,
                fechaNacimiento: ediciones.fechaNacimiento ? new Date(ediciones.fechaNacimiento) : existeJugador.fechaNacimiento,
                nacionalidad:ediciones.nacionalidad ?? existeJugador.nacionalidad,
                dorsal:ediciones.dorsal ?? existeJugador.dorsal,
                equipoId:ediciones.equipoId ?? existeJugador.equipoId
            }
        })

        return jugadorEditado
        
    })
}

const eliminarJugador = async (jugadorId) => {
    return prisma.$transaction(async(transaccion)=>{
        const existeJugador = await transaccion.jugador.findFirst({
            where:{
                id:jugadorId
            }
        })
        if(!existeJugador) throw new AppError('El jugador no se encuentra registrado',404)
        
        const jugadorEliminado = await transaccion.jugador.delete({
            where:{
                id:jugadorId
            }
        })

        return jugadorEliminado
    })
    
}

const añadirJugadorAEquipo = async (jugadorId,equipoId,dorsal) => {

    return prisma.$transaction(async(transaccion)=>{
        const existeJugador= await transaccion.jugador.findFirst({
            where:{
                id:jugadorId
            }
        })
        if(!existeJugador) throw new AppError('El jugador no se encuentra registrado',404)
        
        const existeEquipo = await transaccion.equipo.findFirst({
            where:{
                id:equipoId
            }
        })
        if(!existeEquipo) throw new AppError('El equipo no se encuentra registrado',404)

        const existeDorsalEquipo = await transaccion.jugador.findFirst({
            where:{
                equipoId:equipoId,
                dorsal:dorsal || existeJugador.dorsal,
                NOT: { id: jugadorId }
            }
        })
        if(existeDorsalEquipo) throw new AppError('El dorsal ya está en uso en este equipo',409)
        
        const jugadorAñadido = await transaccion.jugador.update({
            where:{
                id:jugadorId
            },
            data:{
                equipoId:equipoId,
                dorsal:dorsal || existeJugador.dorsal
            }
        })

        return jugadorAñadido
    })
}

const eliminarJugadorDeEquipo = async (jugadorId,equipoId) => {
    return prisma.$transaction(async(transaccion)=>{
        const existeJugador= await transaccion.jugador.findFirst({
            where:{
                id:jugadorId
            }
        })
        if(!existeJugador) throw new AppError('El jugador no se encuentra registrado',404)
        
        const existeEquipo = await transaccion.equipo.findFirst({
            where:{
                id:equipoId
            }
        })
        if(!existeEquipo) throw new AppError('El equipo no se encuentra registrado',404)

        if(existeJugador.equipoId!==equipoId) throw new AppError('El jugador no pertenece a este equipo',400)
        
        const jugadorEliminado = await transaccion.jugador.update({
            where:{
                id:jugadorId
            },
            data:{
                equipoId:null
            }
        })

        return jugadorEliminado
    })
}

export {
    crearJugador,
    obtenerJugador,
    editarJugador,
    eliminarJugador,
    añadirJugadorAEquipo,
    eliminarJugadorDeEquipo
}