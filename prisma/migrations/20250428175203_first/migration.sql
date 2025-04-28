-- CreateEnum
CREATE TYPE "posiciones" AS ENUM ('PO', 'LD', 'DF', 'LI', 'MCD', 'MC', 'MCO', 'MI', 'MD', 'EI', 'ED', 'DC');

-- CreateEnum
CREATE TYPE "estadoPartido" AS ENUM ('programado', 'curso', 'finalizado', 'suspendido');

-- CreateEnum
CREATE TYPE "tipoTarjeta" AS ENUM ('amarilla', 'roja');

-- CreateEnum
CREATE TYPE "tipoTransferencia" AS ENUM ('traspaso', 'prestamo', 'libre');

-- CreateTable
CREATE TABLE "Torneo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "temporada" TEXT,
    "fechaInicio" TIMESTAMP(3),
    "fechaFin" TIMESTAMP(3),
    "descripcion" TEXT,

    CONSTRAINT "Torneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liga" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "temporada" TEXT,
    "logo" TEXT,

    CONSTRAINT "Liga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "logo" TEXT,
    "fechaFundacion" TIMESTAMP(3),
    "ciudad" TEXT NOT NULL,
    "estadio" TEXT,
    "torneoId" INTEGER,
    "ligaId" INTEGER,
    "tecnicoId" INTEGER,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tecnico" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3),

    CONSTRAINT "Tecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jugador" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3),
    "nacionalidad" TEXT NOT NULL,
    "posicion" TEXT NOT NULL,
    "dorsal" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,

    CONSTRAINT "Jugador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estadio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "capacidad" BIGINT NOT NULL,

    CONSTRAINT "Estadio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partido" (
    "id" SERIAL NOT NULL,
    "torneoId" INTEGER NOT NULL,
    "equipoLocalId" INTEGER NOT NULL,
    "equipoVisitanteId" INTEGER NOT NULL,
    "golesLocal" INTEGER NOT NULL DEFAULT 0,
    "golesVisitante" INTEGER NOT NULL DEFAULT 0,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estadioId" INTEGER NOT NULL,
    "estado" "estadoPartido" NOT NULL DEFAULT 'programado',

    CONSTRAINT "Partido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gol" (
    "id" SERIAL NOT NULL,
    "partidoId" INTEGER NOT NULL,
    "jugadorId" TEXT NOT NULL,
    "minuto" TIMESTAMP(3) NOT NULL,
    "equipoId" INTEGER NOT NULL,

    CONSTRAINT "Gol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarjeta" (
    "id" SERIAL NOT NULL,
    "partidoId" INTEGER NOT NULL,
    "jugadorId" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,
    "tipo" "tipoTarjeta" NOT NULL,

    CONSTRAINT "Tarjeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadisticaJugador" (
    "id" SERIAL NOT NULL,
    "jugadorId" TEXT NOT NULL,
    "torneoId" INTEGER NOT NULL,
    "partidosJugados" INTEGER NOT NULL DEFAULT 0,
    "goles" INTEGER NOT NULL DEFAULT 0,
    "asistencias" INTEGER NOT NULL DEFAULT 0,
    "tarjetasAmarillas" INTEGER NOT NULL DEFAULT 0,
    "tarjetasRojas" INTEGER NOT NULL DEFAULT 0,
    "minutosJugados" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EstadisticaJugador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transferencia" (
    "id" SERIAL NOT NULL,
    "jugadorId" TEXT NOT NULL,
    "equipoOrigenId" INTEGER NOT NULL,
    "equipoDestinoId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "monto" DECIMAL(10,2),
    "tipo" "tipoTransferencia" NOT NULL,

    CONSTRAINT "Transferencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Torneo_nombre_key" ON "Torneo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Liga_nombre_key" ON "Liga"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_nombre_key" ON "Equipo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_tecnicoId_key" ON "Equipo"("tecnicoId");

-- CreateIndex
CREATE UNIQUE INDEX "Jugador_dorsal_equipoId_key" ON "Jugador"("dorsal", "equipoId");

-- CreateIndex
CREATE UNIQUE INDEX "Estadio_nombre_key" ON "Estadio"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "EstadisticaJugador_jugadorId_torneoId_key" ON "EstadisticaJugador"("jugadorId", "torneoId");

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_ligaId_fkey" FOREIGN KEY ("ligaId") REFERENCES "Liga"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "Tecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jugador" ADD CONSTRAINT "Jugador_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_equipoLocalId_fkey" FOREIGN KEY ("equipoLocalId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_equipoVisitanteId_fkey" FOREIGN KEY ("equipoVisitanteId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_estadioId_fkey" FOREIGN KEY ("estadioId") REFERENCES "Estadio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gol" ADD CONSTRAINT "Gol_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gol" ADD CONSTRAINT "Gol_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gol" ADD CONSTRAINT "Gol_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarjeta" ADD CONSTRAINT "Tarjeta_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarjeta" ADD CONSTRAINT "Tarjeta_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaJugador" ADD CONSTRAINT "EstadisticaJugador_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadisticaJugador" ADD CONSTRAINT "EstadisticaJugador_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_equipoOrigenId_fkey" FOREIGN KEY ("equipoOrigenId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_equipoDestinoId_fkey" FOREIGN KEY ("equipoDestinoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
