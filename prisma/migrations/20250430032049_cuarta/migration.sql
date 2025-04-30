/*
  Warnings:

  - You are about to drop the column `equipoId` on the `Gol` table. All the data in the column will be lost.
  - Added the required column `aEquipoId` to the `Gol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deEquipoId` to the `Gol` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gol" DROP CONSTRAINT "Gol_equipoId_fkey";

-- AlterTable
ALTER TABLE "Gol" DROP COLUMN "equipoId",
ADD COLUMN     "aEquipoId" INTEGER NOT NULL,
ADD COLUMN     "deEquipoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Gol" ADD CONSTRAINT "Gol_deEquipoId_fkey" FOREIGN KEY ("deEquipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gol" ADD CONSTRAINT "Gol_aEquipoId_fkey" FOREIGN KEY ("aEquipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
