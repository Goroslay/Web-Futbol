import AppError from '../utils/appError.js'
import cliente from '../config/prismaClient.js'

const prisma = cliente

const obtenerTarjetas = async (filtros = {}) => {
    const {id,partidoId,jugadorId,minuto,tipo} = filtros
    const where = {}

    if(id) where.id=id

    if(partidoId) where.partidoId = partidoId

    if(jugadorId) where.jugadorId = jugadorId

    if(minuto) where.minuto = minuto

    if(tipo) where.tipo = tipo

    const tarjetas = await prisma.tarjeta.findMany({
        where
    })
    
    return tarjetas
}


const crearTarjeta = async (tarjeta) => {
    return prisma.$transaction(async(transaccion)=>{
        const existePartido = await obtenerPartido(tarjeta.partidoId,transaccion)
        if(!existePartido) throw new AppError('El partido no se encuentra registrado',404)

        const existeJugador = await obtenerJugador(tarjeta.jugadorId,transaccion)
        if(!existeJugador) throw new AppError('El jugador no se encuentra registrado',404)

        if(tarjeta.minuto<1 || tarjeta.minuto>125) throw new AppError('Minuto de partido no valido',400)

        const existeJugadorEnPartido = existeJugador.equipoId === existePartido.equipoLocalId || existeJugador.equipoId === existePartido.equipoVisitanteId
        if(!existeJugadorEnPartido) throw new AppError('Este jugador no se encuentra en este partido',404)

        const tipos=['amarilla','roja']
        if(!tipos.includes(tarjeta.tipo)) throw new AppError('Tipo de tarjeta no valido',400)
        
        const existeRoja = await validadorRoja(tarjeta.partidoId,tarjeta.jugadorId,transaccion)
        if(existeRoja) throw new AppError('Este jugador ya cuenta con tarjeta roja en este partido',409)
        
        if(tarjeta.tipo==='amarilla'){
            const existeDobleAmarilla = await validadorDobleAmarilla(tarjeta.partidoId,tarjeta.jugadorId,transaccion)
            if(existeDobleAmarilla >1){
                 throw new AppError('Este jugador ya cuenta con doble amarilla en este partido',409)
            }else if(existeDobleAmarilla===1){
                await transaccion.tarjeta.create({
                    data:{
                        partidoId:tarjeta.partidoId,
                        jugadorId:tarjeta.jugadorId,
                        minuto:tarjeta.minuto,
                        tipo:tarjeta.tipo
                    }
                })

                return await transaccion.tarjeta.create({
                    data:{
                        partidoId:tarjeta.partidoId,
                        jugadorId:tarjeta.jugadorId,
                        minuto:tarjeta.minuto,
                        tipo:'roja'
                    }
                })
            }
        }
            

        const nuevaTarjeta = await transaccion.tarjeta.create({
            data:{
                partidoId:tarjeta.partidoId,
                jugadorId:tarjeta.jugadorId,
                minuto:tarjeta.minuto,
                tipo:tarjeta.tipo
            }
        })
        
        return nuevaTarjeta
    })
}


const editarTarjeta = async (tarjetaId,ediciones) => {
    return prisma.$transaction(async(transaccion)=>{
        const existetarjeta = await obtenerTarjeta(tarjetaId,transaccion)
        if(!existetarjeta) throw new AppError('Tarjeta no encontrada',404)

        if(ediciones.partidoId){
            const existePartido = await obtenerPartido(ediciones.partidoId,transaccion)
            if(!existePartido) throw new AppError('Partido no encontrado',404)
        }

        if(ediciones.jugadorId){
            const existeJugador = await obtenerJugador(ediciones.jugadorId,transaccion)
            if(!existeJugador) throw new AppError('Jugador no encontrado',404)
            const partidoId = ediciones.partidoId ?? existetarjeta.partidoId
            const existePartido = await obtenerPartido(partidoId ,transaccion) 
            const existeJugadorEnPartido = existeJugador.equipoId === existePartido.equipoLocalId || existeJugador.equipoId === existePartido.equipoVisitanteId
            if(!existeJugadorEnPartido) throw new AppError('Este jugador no se encuentra en este partido',404)
        }

        if(ediciones.minuto && (ediciones.minuto<1 || ediciones.minuto>125)) throw new AppError('Minuto de partido no valido',400)
        
        if(ediciones.tipo){
            const tipos=['amarilla','roja']
            if(!tipos.includes(ediciones.tipo)) throw new AppError('Tipo de tarjeta no valido',400)
            
            if(ediciones.tipo==='amarilla'){
                const existeDobleAmarilla = await validadorDobleAmarilla(
                    ediciones.partidoId ?? existetarjeta.partidoId,
                    ediciones.jugadorId ?? existetarjeta.jugadorId,
                    transaccion)
                if(existeDobleAmarilla > 1) throw new AppError('Este jugador ya cuenta con doble amarilla en este partido',409)    
            }

            if(ediciones.tipo==='roja'){
                const existeRoja = await validadorRoja(
                    ediciones.partidoId ?? existetarjeta.partidoId,
                    ediciones.jugadorId ?? existetarjeta.jugadorId,
                    transaccion
                )
                if(existeRoja) throw new AppError('Este jugador ya cuenta con tarjeta roja en este partido',409)
            }
        }

        const tarjetaEditada = await transaccion.tarjeta.update({
            where:{
                id:tarjetaId
            },
            data:{
                partidoId: ediciones.partidoId ?? existetarjeta.partidoId,
                jugadorId: ediciones.jugadorId ?? existetarjeta.jugadorId,
                minuto: ediciones.minuto ?? existetarjeta.minuto,
                tipo: ediciones.tipo ?? existetarjeta.tipo
            }
        })

        return tarjetaEditada
    })
}


const eliminarTarjeta = async (tarjetaId) => {
    return prisma.$transaction(async (transaccion) => {
        const existetarjeta = await obtenerTarjeta(tarjetaId,transaccion)
        if(!existetarjeta) throw new AppError('Tarjeta no encontrada',404)

        const tarjetaEliminada = await prisma.tarjeta.delete({
            where:{
                id:tarjetaId
            }
        })

        return tarjetaEliminada
    })
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
    const existeJugador= await cliente.jugador.findUnique({
        where:{
            id:jugadorId
        }
    })
    return existeJugador
}

async function obtenerTarjeta(tarjetaId,cliente=prisma){
    const existetarjeta = await cliente.tarjeta.findUnique({
        where:{
            id:tarjetaId
        }
    })
    return existetarjeta
}

async function validadorDobleAmarilla(partidoId,jugadorId,cliente=prisma) {
    const existetarjeta = await cliente.tarjeta.findMany({
        where:{
            jugadorId:jugadorId,
            partidoId:partidoId,
            tipo:'amarilla'
        }
    })

    return existetarjeta.length
}

async function validadorRoja(partidoId,jugadorId,cliente=prisma) {
    const existetarjeta = await cliente.tarjeta.findFirst({
        where:{
            jugadorId:jugadorId,
            partidoId:partidoId,
            tipo:'roja'
        }
    })

    return existetarjeta
}

export {
    obtenerTarjetas,
    crearTarjeta,
    editarTarjeta,
    eliminarTarjeta
}