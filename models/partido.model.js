import AppError from "../utils/appError.js"
import cliente from '../config/prismaClient.js'

const prisma = cliente

const obtenerPartidos = async (filtros={}) => {
    const {id,torneoId,equipoLocalId,equipoVisitanteId,golesLocal,golesVisitante,fecha,estado} = filtros
    const where = {}

    if(id) where.id = id

    if(torneoId) where.torneoId = torneoId

    if(equipoLocalId) where.equipoLocalId = equipoLocalId

    if(equipoVisitanteId) where.equipoVisitanteId = equipoVisitanteId

    if(golesLocal) where.golesLocal = golesLocal

    if(golesVisitante) where.golesVisitante = golesVisitante

    if(fecha) where.fecha = new Date(fecha)

    if(estado) where.estado = estado

    const partidos = await prisma.partido.findMany({
        where
    })

    return partidos
}


const crearPartido = async (partido) => {
    
    return prisma.$transaction(async(transaccion)=>{

        const existeTorneo = await obtenerTorneo(partido.torneoId,transaccion)

        if(!existeTorneo) throw new AppError('Torneo no encontrado',404)

        const fechaInicio = new Date(partido.fecha)
        const fechaFin = new Date(partido.fecha)
        fechaInicio.setHours(0, 0, 0, 0)
        fechaFin.setHours(23,59,59,999)

        const Equipos = await obtenerEquipos(partido.equipoLocalId,partido.equipoVisitanteId,fechaInicio,fechaFin,transaccion)
        const equipoLocal = Equipos.find((equipo)=>equipo.id===partido.equipoLocalId)
        const equipoVisitante = Equipos.find((equipo)=>equipo.id===partido.equipoVisitanteId)

        if(!equipoLocal) throw new AppError('Equipo local no encontrado',404)
        if(!equipoVisitante) throw new AppError('Equipo visitante no encontrado',404)
        
        if(partido.equipoLocalId === partido.equipoVisitanteId) throw new AppError('Equipos duplicados',409)
        
        

        if(equipoLocal.partidosLocal.length>0 || equipoLocal.partidosVisitante.length>0){
            throw new AppError('El equipo local ya tiene partidos asignados para esta fecha',409)
        }   
        
        if(equipoVisitante.partidosLocal.length>0 || equipoVisitante.partidosVisitante.length>0){
            throw new AppError('El equipo visitante ya tiene partidos asignados para esta fecha',409)
        }

        if(partido.estado){
            const estados = ['programado', 'curso', 'finalizado', 'suspendido'];
            const estadoValido = estados.includes(partido.estado);
            if(!estadoValido) throw new AppError('Estado de partido no valido',400)

            const fechaActual = new Date(Date.now())
            if(partido.estado==='programado' && fechaInicio<fechaActual) throw new AppError('La fecha debe ser igual o posterior al dia actual para programar un partido',400)

            if(partido.estado==='curso' && fechaActual !== fechaInicio) throw new AppError('La fecha debe ser igual al dia actual para que un partido este en curso',400)

            if(partido.estado==='finalizado' && fechaInicio>fechaActual) throw new AppError('El partido no puede finalizar antes de empezar',400)
                            
        }
        
        const nuevoPartido = await transaccion.partido.create({
            data:{
                torneoId: partido.torneoId,
                equipoLocalId: partido.equipoLocalId,
                equipoVisitanteId: partido.equipoVisitanteId,
                golesLocal: partido.golesLocal ?? 0,
                golesVisitante: partido.golesVisitante ?? 0,
                fecha: new Date(partido.fecha),
                estado: partido.estado
            }
        })

        return nuevoPartido

    })
}

const editarPartido = async (partidoId,ediciones) => {
    return prisma.$transaction(async(transaccion)=>{
        const existePartido = await obtenerPartido(partidoId)

        if(!existePartido) throw new AppError('Partido no encontrado',404)

        const fechaInicio =new Date( ediciones.fecha ?? existePartido.fecha)
        const fechaFin =new Date( ediciones.fecha ?? existePartido.fecha)
        fechaInicio.setHours(0,0,0,0)
        fechaFin.setHours(23,59,59,999)
        
        
        const existeTorneo = await obtenerTorneo(ediciones.torneoId ?? existePartido.torneoId)

        if(!existeTorneo) throw new AppError('Torneo no encontrado',404)
    
        const equipos = await obtenerEquipos(
            ediciones.equipoLocalId ?? existePartido.equipoLocalId,
            ediciones.equipoVisitanteId ?? existePartido.equipoVisitanteId,
            fechaInicio,
            fechaFin,
            transaccion
        )

        const equipoLocalId = ediciones.equipoLocalId ?? existePartido.equipoLocalId

        const existeEquipoLocal = equipos.find((equipo)=>equipo.id === equipoLocalId)
        if(!existeEquipoLocal) throw new AppError('Equipo local no encontrado',404)
            
        if((existeEquipoLocal.partidosLocal.length>0 || existeEquipoLocal.partidosVisitante.length>0) && ediciones.fecha){
            throw new AppError('El equipo local ya tiene partidos asignados para esta fecha',409)
        }

        const equipoVisitanteId = ediciones.equipoVisitanteId ?? existePartido.equipoVisitanteId

        const existeEquipoVisitante = equipos.find((equipo)=>equipo.id === equipoVisitanteId)
        if(!existeEquipoVisitante) throw new AppError('Equipo visitante no encontrado',404)
            
        if((existeEquipoVisitante.partidosLocal.length>0 || existeEquipoVisitante.partidosVisitante.length>0) && ediciones.fecha){
            throw new AppError('El equipo visitante ya tiene partidos asignados para esta fecha',409)
        }

        const nuevoEquipoLocalId = ediciones.equipoLocalId !== undefined ? ediciones.equipoLocalId : existePartido.equipoLocalId;
        const nuevoEquipoVisitanteId = ediciones.equipoVisitanteId !== undefined ? ediciones.equipoVisitanteId : existePartido.equipoVisitanteId;


        if (nuevoEquipoLocalId === nuevoEquipoVisitanteId) {
            throw new AppError('Equipos duplicados', 409);
        }

        if(ediciones.estado){
            const estados = ['programado', 'curso', 'finalizado', 'suspendido'];
            const estadoValido = estados.includes(ediciones.estado);
            if(!estadoValido) throw new AppError('Estado de partido no valido',400)

            const fechaActual = new Date(Date.now())
            if(ediciones.estado==='programado' && fechaInicio<fechaActual) throw new AppError('La fecha debe ser igual o posterior al dia actual para programar un partido',400)

            if(ediciones.estado==='curso' && fechaActual !== fechaInicio) throw new AppError('La fecha debe ser igual al dia actual para que un partido este en curso',400)

            if(ediciones.estado==='finalizado' && fechaInicio>fechaActual) throw new AppError('El partido no puede finalizar antes de empezar',400)
                            
        }

        const partidoEditado = await transaccion.partido.update({
            where:{
                id:partidoId
            },
            data:{
                torneoId: ediciones.torneoId ?? existePartido.torneoId,
                equipoLocalId: ediciones.equipoLocalId ?? existePartido.equipoLocalId,
                equipoVisitanteId: ediciones.equipoVisitanteId ?? existePartido.equipoVisitanteId,
                golesLocal: ediciones.golesLocal ?? existePartido.golesLocal,
                golesVisitante: ediciones.golesVisitante ?? existePartido.golesVisitante,
                fecha: ediciones.fecha ? new Date(ediciones.fecha) : existePartido.fecha,
                estado: ediciones.estado ?? existePartido.estado
            }
        })

        return partidoEditado
        
    })
}

const eliminarPartido = async (partidoId) => {
    return prisma.$transaction(async(transaccion)=>{
        const existePartido = await obtenerPartido(partidoId)
        if(!existePartido) throw new AppError('Partido no encontrado',404)

        const partidoEliminado = await transaccion.partido.delete({
            where:{
                id:partidoId
            }
        })

        return partidoEliminado
    })
}


async function obtenerTorneo(torneoId,cliente=prisma) {
    const existeTorneo = await cliente.torneo.findUnique({
            where:{
                id:torneoId
            },
            include:{
                partidos:true
            }
            
        })
    return existeTorneo
}

async function obtenerEquipos(equipoLocalId,equipoVisitanteId,fechaInicio,fechaFin,cliente=prisma) {
    const equipos = await cliente.equipo.findMany({
        where:{
            OR:[
                {id:equipoLocalId},
                {id:equipoVisitanteId}
            ]
        },
            include:{
                partidosLocal:{
                    where:{
                        fecha:{
                            gte:fechaInicio,
                            lte:fechaFin
                        }
                    }
                },
                partidosVisitante:{
                    where:{
                        fecha:{
                            gte:fechaInicio,
                            lte:fechaFin
                        }
                    }
                }
            }
    })
    return equipos
}


async function obtenerPartido(partidoId,cliente=prisma) {
    const existePartido = await cliente.partido.findUnique({
        where:{
            id:partidoId
        }
    })

    return existePartido
}


export {
    obtenerPartidos,
    crearPartido,
    editarPartido,
    eliminarPartido
}