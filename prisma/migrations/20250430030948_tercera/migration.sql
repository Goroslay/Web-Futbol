/*
  Warnings:

  - You are about to drop the column `estadioId` on the `Partido` table. All the data in the column will be lost.
  - You are about to drop the `Estadio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Partido" DROP CONSTRAINT "Partido_estadioId_fkey";

-- AlterTable
ALTER TABLE "Equipo" ADD COLUMN     "puntos" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Partido" DROP COLUMN "estadioId";

-- DropTable
DROP TABLE "Estadio";
