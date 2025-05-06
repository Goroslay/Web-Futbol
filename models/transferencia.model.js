import AppError from "../utils/appError.js";
import cliente from "../config/prismaClient.js";

const prisma = cliente

const obtenerTransferencias = async (filtros = {}) => {
    const {id,jugadorId,equipoOrigenId,equipoDestinoId,fecha,monto,tipo} = filtros
    const where = {}

    if(id) where.id = id

    if(jugadorId) where.jugadorId = jugadorId

    if(equipoOrigenId) where.equipoOrigenId = equipoOrigenId

    if(equipoDestinoId) where.equipoDestinoId = equipoDestinoId

    if(fecha) where.fecha = new Date(fecha)

    if(monto) where.monto = monto

    if(tipo) where.tipo = tipo

    const transferencias = await prisma.transferencia.findMany({
        where
    })

    return transferencias
}


const crearTransferencia = async (transferencia) => {
    return prisma.$transaction(async(transaccion)=>{
        const {jugadorId,equipoOrigenId,equipoDestinoId,fecha,monto,tipo} = transferencia
        const existeJugador = await obtenerJugador(jugadorId,transaccion)
        if(!existeJugador) throw new AppError('Este jugador no se encuentra registrado',404)
        
        const existeEquipoOrigen = await obtenerEquipo(equipoOrigenId,transaccion)
        if(!existeEquipoOrigen) throw new AppError('El equipo de origen no se encuentra',404)

        const existeEquipoDestino = await obtenerEquipo(equipoDestinoId,transaccion)
        if(!existeEquipoDestino) throw new AppError('El equipo de destino no se encuentra',404)
        
        const existeJugadorEnEquipoOrigen = existeJugador.equipoId === equipoOrigenId
        if(!existeJugadorEnEquipoOrigen) throw new AppError('Este jugador no se encuentra vinculado al equipo de origen',404);

        if(monto<0) throw new AppError('El monto ingresado no es un numero valido',400)
        
        const tiposValidos = ['traspaso','prestamo','libre']
        if(!tiposValidos.includes(tipo)) throw new AppError('El tipo de transferencia no es valido',400)

        const nuevaTransferencia = await transaccion.transferencia.create({
            data:{
                jugadorId,
                equipoDestinoId,
                equipoOrigenId,
                monto,
                fecha:new Date(fecha),
                tipo
            }
        })

        return nuevaTransferencia
        
        
    })
}


const editarTransferencia = async (transferenciaId,ediciones) => {
    return prisma.$transaction(async(transaccion)=>{
        const existeTransaccion = await obtenerTransferencia(transferenciaId,transaccion)
        if(!existeTransaccion) throw new AppError('Esta transaccion no se encuentra registrada',404)
        
        const {jugadorId,equipoOrigenId,equipoDestinoId,fecha,monto,tipo} = ediciones

        const existeEquipoOrigen = await obtenerEquipo(equipoOrigenId ?? existeTransaccion.equipoOrigenId,transaccion)
         if(!existeEquipoOrigen) throw new AppError('El equipo de origen no se encuentra',404)
        

        if(equipoDestinoId){
            const existeEquipoDestino = await obtenerEquipo(equipoDestinoId,transaccion)
            if(!existeEquipoDestino) throw new AppError('El equipo de destino no se encuentra',404)
        }

        if(jugadorId){
            const existeJugador = await obtenerJugador(jugadorId,transaccion)
            if(!existeJugador) throw new AppError('Este jugador no se encuentra registrado',404)
        }

        const existeJugadorEnEquipoOrigen = existeEquipoOrigen.jugadores.some((jugador)=>jugador.id===jugadorId ?? existeTransaccion.jugadorId)
        if(!existeJugadorEnEquipoOrigen) throw new AppError('El jugador no se encuentra vinculado al equipo de origen',404)
        
        if(monto<0) throw new AppError('El monto ingresado no es un numero valido',400)
        
        const tiposValidos = ['traspaso','prestamo','libre']
        if(!tiposValidos.includes(tipo)) throw new AppError('El tipo de transferencia no es valido',400)

        const transferenciaEditada = await transaccion.transferencia.update({
            where:{
                id:transferenciaId
            },
            data:{
                jugadorId:jugadorId ?? existeTransaccion.jugadorId,
                equipoOrigenId:equipoOrigenId ?? existeTransaccion.equipoOrigenId,
                equipoDestinoId:equipoDestinoId ?? existeTransaccion.equipoDestinoId,
                monto: monto ?? existeTransaccion.monto,
                fecha: fecha ? new Date(fecha) : existeTransaccion.fecha,
                tipo: tipo ?? existeTransaccion.tipo
            }
        })

        return transferenciaEditada

    })
}


const eliminarTransferencia = async (transferenciaId) => {
    return prisma.$transaction(async (transaccion) => {
        const existeTransaccion = await obtenerTransferencia(transferenciaId,transaccion)
        if(!existeTransaccion) throw new AppError('Esta transaccion no se encuentra registrada',404)
        
        const transferenciaEliminada = await transaccion.transferencia.delete({
            where:{
                id:transferenciaId
            }
        })

        return transferenciaEliminada
    })
}

async function obtenerTransferencia(transferenciaId,cliente=prisma) {
    const transferencia = await cliente.transferencia.findUnique({
        where:{
            id:transferenciaId
        }
    })
    return transferencia
}

async function obtenerJugador(jugadorId,cliente=prisma) {
    const jugador = await cliente.jugador.findUnique({
        where:{
            id:jugadorId
        }
    })
    return jugador
}

async function obtenerEquipo(equipoId,cliente=prisma) {
    const equipo = await cliente.equipo.findUnique({
        where:{
            id:equipoId
        },
        include:{
            jugadores:true
        }
    })
    return equipo
}