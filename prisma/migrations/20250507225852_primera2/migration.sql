/*
  Warnings:

  - A unique constraint covering the columns `[nombre,temporada]` on the table `Torneo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Torneo_nombre_key";

-- CreateIndex
CREATE UNIQUE INDEX "Torneo_nombre_temporada_key" ON "Torneo"("nombre", "temporada");
