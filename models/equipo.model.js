import cliente from "../config/prismaClient.js";
import AppError from "../utils/appError.js";

const prisma = cliente;

const obtenerEquipos = async (filtros = {}) => {
  const {
    id,
    nombre,
    fechaFundacion,
    ciudad,
    estadio,
    torneoId,
    tecnicoId,
    puntos,
  } = filtros;
  const where = {};

  if (id !== undefined) where.id = id;

  if (nombre) where.nombre = { contains: nombre, mode: "insensitive" };

  if (fechaFundacion) where.fechaFundacion = new Date(fechaFundacion);

  if (ciudad) where.ciudad = { contains: ciudad, mode: "insensitive" };

  if (estadio) where.estadio = { contains: estadio, mode: "insensitive" };

  if (torneoId !== undefined) where.torneoId = torneoId;

  if (tecnicoId !== undefined) where.tecnicoId = tecnicoId;

  if (puntos !== undefined) where.puntos = puntos;

  const equipos = await prisma.equipo.findMany({
    where,
    orderBy: {
      nombre: "desc",
    },
  });

  return equipos;
};

const crearEquipo = async (nuevoEquipo) => {
  return prisma.$transaction(async (transaccion) => {
    const {
      nombre,
      fechaFundacion,
      ciudad,
      estadio,
      torneoId,
      tecnicoId,
      puntos,
      logo,
    } = nuevoEquipo;

    const equipos = await obtenerEquipos();

    const existeNombre = equipos.some(
      (equipo) =>
        equipo.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase()
    );

    if (existeNombre) throw new AppError("Equipo con nombre duplicado", 409);

    if (tecnicoId !== undefined) {
      const existeTecnico = await validarTecnico(tecnicoId, transaccion);
      if (!existeTecnico) {
        throw new AppError("Tecnico no encontrado", 404);
      }
      const existeEquipoConTecnico = equipos.some(
        (equipo) => equipo.tecnicoId === tecnicoId
      );
      if (existeEquipoConTecnico) {
        throw new AppError("Tecnico duplicado con otro equipo", 409);
      }
    }
    if (torneoId !== undefined) {
      const existeTorneo = validarTorneo(torneoId, transaccion);
      if (!existeTorneo) {
        throw new AppError("Torneo no encontrado", 404);
      }
    }
    if (fechaFundacion) {
      const fecha = new Date(fechaFundacion);
      const hoy = new Date(Date.now());
      if (fecha > hoy)
        throw new AppError(
          "La fecha de fundacion no puede ser mayor al dia actual",
          400
        );
    }

    if (puntos !== undefined && puntos < 0)
      throw new AppError("Los puntos no pueden ser menores que 0", 400);

    const equipo = await transaccion.equipo.create({
      data: {
        nombre: nombre,
        logo: logo || "default.png",
        fechaFundacion: fechaFundacion
          ? new Date(fechaFundacion)
          : fechaFundacion,
        ciudad: ciudad,
        estadio: estadio,
        torneoId: torneoId,
        tecnicoId: tecnicoId,
        puntos: puntos || 0,
      },
    });

    return equipo;
  });
};

const editarEquipo = async (equipoId, ediciones) => {
  return prisma.$transaction(async (transaccion) => {
    const existeEquipo = await obtenerEquipo(equipoId, transaccion);
    if (!existeEquipo) {
      throw new AppError("Equipo no encontrado", 404);
    }

    const {
      nombre,
      fechaFundacion,
      ciudad,
      estadio,
      torneoId,
      tecnicoId,
      puntos,
      logo,
    } = ediciones;

    const equipos = await obtenerEquipos();

    if (nombre) {
      const existeNombre = equipos.some(
        (equipo) => nombre.toLowerCase() === equipo.nombre.toLocaleLowerCase()
      );
      if (existeNombre) throw new AppError("Equipo con nombre duplicado", 409);
    }

    if (tecnicoId !== undefined) {
      const existeTecnico = await validarTecnico(tecnicoId);
      if (!existeTecnico) throw new AppError("Tecnico no encontrado", 404);
      const existeEquipoConTecnico = equipos.some(
        (equipo) => equipo.tecnicoId === tecnicoId
      );
      if (existeEquipoConTecnico)
        throw new AppError("Tecnico duplicado con otro equipo", 409);
    }

    if (fechaFundacion) {
      const fecha = new Date(fechaFundacion);
      const hoy = new Date(Date.now());
      if (fecha > hoy)
        throw new AppError(
          "La fecha de fundacion no puede ser mayor al dia actual",
          400
        );
    }

    if (torneoId !== undefined) {
      const existeTorneo = await validarTorneo(torneoId, transaccion);
      if (!existeTorneo) throw new AppError("No se encontro el torneo", 404);
    }

    if (puntos !== undefined && puntos < 0)
      throw new AppError("Los puntos no pueden ser menores que 0", 400);

    const equipoEditado = prisma.equipo.update({
      where: {
        id: equipoId,
      },
      data: {
        nombre: nombre ?? existeEquipo.nombre,
        logo: logo ?? existeEquipo.logo,
        fechaFundacion: fechaFundacion
          ? new Date(fechaFundacion)
          : existeEquipo.fechaFundacion,
        ciudad: ciudad ?? existeEquipo.ciudad,
        estadio: estadio ?? existeEquipo.estadio,
        torneoId: torneoId ?? existeEquipo.torneoId,
        tecnicoId: tecnicoId ?? existeEquipo.tecnicoId,
        puntos: puntos ?? existeEquipo.puntos,
      },
    });

    return equipoEditado;
  });
};

const eliminarEquipo = async (equipoId) => {
  return prisma.$transaction(async (transaccion) => {
    const existe = await obtenerEquipo(equipoId, transaccion);

    if (!existe) throw new AppError("Equipo no encontrado", 404);

    const equipoEliminado = await transaccion.equipo.delete({
      where: {
        id: equipoId,
      },
    });

    return equipoEliminado;
  });
};

const agregarEquipoATorneo = async (equipoId, torneoId) => {
  return prisma.$transaction(async (transaccion) => {
    const existeEquipo = await obtenerEquipo(equipoId, transaccion);

    if (!existeEquipo) throw new AppError("Equipo no encontrado", 404);

    const existeTorneo = await validarTorneo(torneoId, transaccion);

    if (!existeTorneo) throw new AppError("Torneo no encontrado", 404);

    const nuevoEquipoEnTorneo = await transaccion.equipo.update({
      where: {
        id: equipoId,
      },
      data: {
        torneoId: torneoId,
      },
    });

    return nuevoEquipoEnTorneo;
  });
};

const eliminarEquipoDeTorneo = async (equipoId, torneoId) => {
  return prisma.$transaction(async (transaccion) => {
    const equipos = await obtenerEquipos();

    const existeEquipo = equipos.some((equipo) => equipo.id === equipoId);

    if (!existeEquipo) throw new AppError("Equipo no encontrado", 404);

    const existeTorneo = await validarTorneo(torneoId, transaccion);

    if (!existeTorneo) throw new AppError("Torneo no encontrado", 404);

    const existeEquipoEnTorneo = equipos.some(
      (equipo) => equipo.id === equipoId && equipo.torneoId === torneoId
    );
    if (!existeEquipoEnTorneo)
      throw new AppError("Equipo no encontrado en torneo", 404);

    const equipoEliminadoDeTorneo = await transaccion.equipo.update({
      where: {
        id: equipoId,
      },
      data: {
        torneoId: null,
      },
    });

    return equipoEliminadoDeTorneo;
  });
};

async function obtenerEquipo(equipoId, cliente = prisma) {
  const existeEquipo = await cliente.equipo.findUnique({
    where: {
      id: equipoId,
    },
  });
  return existeEquipo;
}

async function validarTorneo(torneoId, cliente = prisma) {
  const existeTorneo = await cliente.torneo.findUnique({
    where: {
      id: torneoId,
    },
    select: {
      id: true,
    },
  });
  return existeTorneo;
}

async function validarTecnico(tecnicoId, cliente = prisma) {
  const existeTecnico = await cliente.tecnico.findUnique({
    where: {
      id: tecnicoId,
    },
    select: {
      id: true,
    },
  });
  return existeTecnico;
}

export {
  obtenerEquipos,
  crearEquipo,
  editarEquipo,
  eliminarEquipo,
  agregarEquipoATorneo,
  eliminarEquipoDeTorneo,
};
