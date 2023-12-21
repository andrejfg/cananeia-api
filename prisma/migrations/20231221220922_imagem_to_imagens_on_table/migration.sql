/*
  Warnings:

  - You are about to drop the `Imagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Imagem" DROP CONSTRAINT "Imagem_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Imagem" DROP CONSTRAINT "Imagem_poloId_fkey";

-- DropForeignKey
ALTER TABLE "Imagem" DROP CONSTRAINT "Imagem_publicacaoId_fkey";

-- DropTable
DROP TABLE "Imagem";

-- CreateTable
CREATE TABLE "imagens" (
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "proporcao" TEXT NOT NULL DEFAULT '1:1',
    "poloId" TEXT,
    "participanteId" TEXT,
    "publicacaoId" TEXT,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("url")
);

-- CreateIndex
CREATE UNIQUE INDEX "imagens_poloId_key" ON "imagens"("poloId");

-- CreateIndex
CREATE UNIQUE INDEX "imagens_participanteId_key" ON "imagens"("participanteId");

-- CreateIndex
CREATE UNIQUE INDEX "imagens_publicacaoId_key" ON "imagens"("publicacaoId");

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "publicacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
