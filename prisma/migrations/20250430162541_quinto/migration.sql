/*
  Warnings:

  - Changed the type of `minuto` on the `Gol` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `posicion` on the `Jugador` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Gol" DROP COLUMN "minuto",
ADD COLUMN     "minuto" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Jugador" DROP COLUMN "posicion",
ADD COLUMN     "posicion" "posiciones" NOT NULL;
