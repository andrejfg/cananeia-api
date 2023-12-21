/*
  Warnings:

  - You are about to drop the column `perfilUrl` on the `participantes` table. All the data in the column will be lost.
  - You are about to drop the column `perfilUrl` on the `polos` table. All the data in the column will be lost.
  - You are about to drop the column `imagemUrl` on the `publicacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "participantes" DROP COLUMN "perfilUrl";

-- AlterTable
ALTER TABLE "polos" DROP COLUMN "perfilUrl";

-- AlterTable
ALTER TABLE "publicacoes" DROP COLUMN "imagemUrl";

-- CreateTable
CREATE TABLE "Imagem" (
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "proporcao" TEXT NOT NULL DEFAULT '1:1',
    "poloId" TEXT,
    "participanteId" TEXT,
    "publicacaoId" TEXT,

    CONSTRAINT "Imagem_pkey" PRIMARY KEY ("url")
);

-- CreateIndex
CREATE UNIQUE INDEX "Imagem_poloId_key" ON "Imagem"("poloId");

-- CreateIndex
CREATE UNIQUE INDEX "Imagem_participanteId_key" ON "Imagem"("participanteId");

-- CreateIndex
CREATE UNIQUE INDEX "Imagem_publicacaoId_key" ON "Imagem"("publicacaoId");

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "publicacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
