-- DropForeignKey
ALTER TABLE "Jugador" DROP CONSTRAINT "Jugador_equipoId_fkey";

-- AlterTable
ALTER TABLE "Jugador" ALTER COLUMN "equipoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Jugador" ADD CONSTRAINT "Jugador_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
