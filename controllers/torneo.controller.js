import { obtenerTorneo,crearTorneo,editarTorneo,eliminarTorneo } from "../models/torneo.model.js";


const getTorneos = async (req,res,next) => {
    try {
        const torneos = await obtenerTorneo(req.body)
        return res.status(200).json({
            success:true,
            data:torneos
        })
    } catch (e) {
        next(e)
    }
}


const getTorneoById = async (req,res,next) => {
    try {
        const id=Number(req.params.id)
        const torneo = await obtenerTorneo({id})
        return res.status(200).json({
            success:true,
            data:torneo[0]
        })
    } catch (e) {
        next(e)
    }
}


const postTorneo = async (req,res,next) => {
    try {
        const torneo = await crearTorneo(req.body)
        return res.status(201).json({
            success:true,
            data:torneo
        })
    } catch (e) {
        next(e)
    }
}

const putTorneo = async (req,res,next) => {
    try {
        const id=Number(req.params.id)
        const torneo = await editarTorneo(id,req.body)
        return res.status(200).json({
            success:true,
            data:torneo
        })
    } catch (e) {
        next(e)
    }
}

const deleteTorneo = async (req,res,next) => {
    try {
        const id=Number(req.params.id)
        const torneo = await eliminarTorneo(id)
        return res.status(200).json({
            success:true,
            data:torneo
        })
    } catch (e) {
        next(e)
    }
}


const positionsTorneo = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        
        // Obtener resultado (que viene como array)
        const torneos = await obtenerTorneo({id});
        
        // Verificar que hay resultados
        if (!torneos || torneos.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Torneo no encontrado"
            });
        }
        
        // Acceder al primer elemento del array
        const torneo = torneos[0];
        
        // Verificar que equipos existe y tiene elementos
        if (!torneo.equipos || Object.keys(torneo.equipos).length === 0) {
            return res.status(200).json({
                success: true,
                data: [] // Devolver array vacío si no hay equipos
            });
        }
        
        // Resto del código igual
        const tablaPosiciones = Object.values(torneo.equipos)
            .map(equipo => ({
                ...equipo,
                golesAFavor: equipo.golesAFavor || 0,
                golesEnContra: equipo.golesEnContra || 0,
                puntos: equipo.puntos || 0
            }))
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
                return a.nombre?.localeCompare(b.nombre) || 0;
            })
            .map((equipo, index) => ({
                id:equipo.id,
                nombre:equipo.nombre,
                puntos:equipo.puntos,
                golesAFavor:equipo.golesAFavor,
                golesEnContra:equipo.golesEnContra,
                posicion: index + 1,
                diferenciaGoles: equipo.golesAFavor - equipo.golesEnContra
            }));
      
        return res.status(200).json({
            success: true,
            data: tablaPosiciones
        });
    } catch (e) {
        console.error("Error en positionsTorneo:", e);
        next(e);
    }
};

export {
    getTorneos,
    getTorneoById,
    postTorneo,
    putTorneo,
    deleteTorneo,
    positionsTorneo
}