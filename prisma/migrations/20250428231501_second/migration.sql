/*
  Warnings:

  - You are about to drop the column `ligaId` on the `Equipo` table. All the data in the column will be lost.
  - You are about to drop the `Liga` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipo" DROP CONSTRAINT "Equipo_ligaId_fkey";

-- AlterTable
ALTER TABLE "Equipo" DROP COLUMN "ligaId";

-- DropTable
DROP TABLE "Liga";
