import AppErrror from "../utils/appError.js"
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

        const existeTorneo = await transaccion.torneo.findUnique({
            where:{
                id:partido.torneoId
            }
        })

        if(!existeTorneo) throw new AppErrror('Recurso no encontrado',404)

        const fechaInicio = new Date(partido.fecha)
        const fechaFin = new Date(partido.fecha)
        fechaInicio.setHours(0, 0, 0, 0)
        fechaFin.setHours(23,59,59,999)


        const existeEquipoLocal = await transaccion.equipo.findUnique({
            where:{
                id:partido.equipoLocalId
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

        if(!existeEquipoLocal) throw new AppErrror('Recurso no encontrado',404)
    
        const existeEquipoVisitante = await transaccion.equipo.findUnique({
            where:{
                id:partido.equipoVisitanteId
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

        if(!existeEquipoVisitante) throw new AppErrror('Recurso no encontrado',404)

        if(partido.equipoLocalId === partido.equipoVisitanteId) throw new AppErrror('Recurso equipos duplicados',409)

        if(existeEquipoLocal.partidosLocal.length>0 || existeEquipoLocal.partidosVisitante.length>0){
            throw new AppErrror('El equipo local ya tiene partidos asignados para esta fecha',409)
        }   
        
        if(existeEquipoVisitante.partidosLocal.length>0 || existeEquipoVisitante.partidosVisitante.length>0){
            throw new AppErrror('El equipo visitante ya tiene partidos asignados para esta fecha',409)
        }

        const estados = ['programado', 'curso', 'finalizado', 'suspendido'];
        const estadoValido = estados.includes(partido.estado);

        if(!estadoValido) throw new AppErrror('Estado de partido no valido',400)

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
        const existePartido = await transaccion.partido.findUnique({
            where:{
                id:partidoId
            }
        })

        if(!existePartido) throw new AppErrror('Recurso no encontrado',404)

        const fechaInicio =new Date( ediciones.fecha ?? existePartido.fecha)
        const fechaFin =new Date( ediciones.fecha ?? existePartido.fecha)
        fechaInicio.setHours(0,0,0,0)
        fechaFin.setHours(23,59,59,999)
        
        if(ediciones.torneoId){
            const existeTorneo = await transaccion.torneo.findUnique({
                where:{
                    id:ediciones.torneoId
                }
            })
    
            if(!existeTorneo) throw new AppErrror('Recurso no encontrado',404)
        }

        if(ediciones.equipoLocalId){
            
            const existeEquipoLocal = await transaccion.equipo.findUnique({
                where:{
                    id:ediciones.equipoLocalId
                },
                include:{
                    partidosLocal:{
                        where:{
                            fecha:{
                                gte:fechaInicio,
                                lte:fechaFin
                            },
                            NOT:{
                                id:partidoId
                            }
                        }
                    },
                    partidosVisitante:{
                        where:{
                            fecha:{
                                gte:fechaInicio,
                                lte:fechaFin
                            },
                            NOT:{
                                id:partidoId
                            }
                        }
                    }
                }
            })
    
            if(!existeEquipoLocal) throw new AppErrror('Recurso no encontrado',404)
                
            if(existeEquipoLocal.partidosLocal.length>0 || existeEquipoLocal.partidosVisitante.length>0){
                throw new AppErrror('El equipo local ya tiene partidos asignados para esta fecha',409)
            }
        }

        if(ediciones.equipoVisitanteId){
            const existeEquipoVisitante = await transaccion.equipo.findUnique({
                where:{
                    id:ediciones.equipoVisitanteId
                },
                include:{
                    partidosLocal:{
                        where:{
                            fecha:{
                                gte:fechaInicio,
                                lte:fechaFin
                            },
                            NOT:{
                                id:partidoId
                            }
                        }
                    },
                    partidosVisitante:{
                        where:{
                            fecha:{
                                gte:fechaInicio,
                                lte:fechaFin
                            },
                            NOT:{
                                id:partidoId
                            }
                        }
                    }
                }
            })
    
            if(!existeEquipoVisitante) throw new AppErrror('Recurso no encontrado',404)
            
            if(existeEquipoVisitante.partidosLocal.length>0 || existeEquipoVisitante.partidosVisitante.length>0){
                throw new AppErrror('El equipo visitante ya tiene partidos asignados para esta fecha',409)
            }
        }

        const nuevoEquipoLocalId = ediciones.equipoLocalId !== undefined ? ediciones.equipoLocalId : existePartido.equipoLocalId;
        const nuevoEquipoVisitanteId = ediciones.equipoVisitanteId !== undefined ? ediciones.equipoVisitanteId : existePartido.equipoVisitanteId;


        if (nuevoEquipoLocalId === nuevoEquipoVisitanteId) {
            throw new AppErrror('Recurso equipos duplicados', 409);
        }

        if(ediciones.estado){
            const estados = ['programado', 'curso', 'finalizado', 'suspendido'];
            const estadoValido = estados.includes(ediciones.estado);
            if(!estadoValido) throw new AppErrror('Estado de partido no valido',400)
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
        const existePartido = await transaccion.partido.findUnique({
            where:{
                id:partidoId
            }
        })
        if(!existePartido) throw new AppErrror('Recurso no encontrado',404)

        const partidoEliminado = await transaccion.partido.delete({
            where:{
                id:partidoId
            }
        })

        return partidoEliminado
    })
}

export {
    obtenerPartidos,
    crearPartido,
    editarPartido,
    eliminarPartido
}