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

        const nuevoTorneo = await transaccion.torneo.create({
            data:{
                nombre:torneo.nombre,
                temporada:torneo.temporada,
                fechaInicio:torneo.inicio,
                fechaFin:torneo.fin,
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

/*  const obtenerTablaPosiciones = async (torneoId) => {
    const torneo = await verificarTorneoPorID(torneoId);
    
    if (!torneo) {
      throw new AppError('Este torneo no se encuentra registrado', 404);
    }
    
    // Convertir objeto de equipos a array para ordenar
    const tablaPosiciones = Object.values(torneo.equipos || {})
      .sort((a, b) => {
        // Ordenar por puntos (descendente)
        if (a.puntos !== b.puntos) {
          return b.puntos - a.puntos;
        }
        
        // Desempate: diferencia de goles
        const difGolA = a.golesAFavor - a.golesEnContra;
        const difGolB = b.golesAFavor - b.golesEnContra;
        
        if (difGolA !== difGolB) {
          return difGolB - difGolA;
        }
        
        // Desempate: goles a favor
        if (a.golesAFavor !== b.golesAFavor) {
          return b.golesAFavor - a.golesAFavor;
        }
        
        // Desempate alfabético por nombre
        return a.nombre.localeCompare(b.nombre);
      })
      .map((equipo, index) => ({
        ...equipo,
        posicion: index + 1,
        diferenciaGoles: equipo.golesAFavor - equipo.golesEnContra
      }));
    
    return tablaPosiciones;
  };
*/