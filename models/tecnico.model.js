import AppError from '../utils/appError.js'
import cliente from '../config/prismaClient.js'

const prisma = cliente

const obtenerTecnicos = async (filtros = {}) => {
    const {id,nombres,apellidos,fechaNacimiento} = filtros
    const where = {}

    if(id !== undefined) where.id = Number(id)

    if(nombres) where.nombres = {contains:nombres,mode:'insensitive'}

    if(apellidos) where.apellidos = {contains:apellidos,mode:'insensitive'}

    if(fechaNacimiento) where.fechaNacimiento = new Date(fechaNacimiento)

    const tecnicos =  await prisma.tecnico.findMany({
        where
    })

    return tecnicos
}


const crearTecnico = async (tecnico) => {
    const nuevoTecnico = await prisma.tecnico.create({
        data:{
            nombres:tecnico.nombres,
            apellidos:tecnico.apellidos,
            fechaNacimiento: tecnico.fechaNacimiento ? new Date(tecnico.fechaNacimiento) : undefined
        }
    })

    return nuevoTecnico
}

const editarTecnico = async (tecnicoId,ediciones) => {
    return prisma.$transaction(async (transaccion) => {
        const existeTecnico = await transaccion.tecnico.findUnique({
            where:{
                id:tecnicoId
            }
        })
        if(!existeTecnico) throw new AppError('Recurso no encontrado',404)

        const tecnicoEditado = await transaccion.tecnico.update({
            where:{
                id:tecnicoId
            },
            data:{
                nombres: ediciones.nombres ?? existeTecnico.nombres,
                apellidos: ediciones.apellidos ?? existeTecnico.apellidos,
                fechaNacimiento: ediciones.fechaNacimiento ? new Date(ediciones.fechaNacimiento) : existeTecnico.fechaNacimiento
            }
        })

        return tecnicoEditado
    })
}


const eliminarTecnico = async (tecnicoId) => {
    return prisma.$transaction(async (transaccion) => {
        const existeTecnico = await transaccion.tecnico.findUnique({
            where:{
                id:tecnicoId
            }
        })
        if(!existeTecnico) throw new AppError('Recurso no encontrado',404)

        const tecnicoEliminado = await transaccion.tecnico.delete({
            where:{
                id:tecnicoId
            }
        })

        return tecnicoEliminado
 
    })
}


export {
    obtenerTecnicos,
    crearTecnico,
    editarTecnico,
    eliminarTecnico
}