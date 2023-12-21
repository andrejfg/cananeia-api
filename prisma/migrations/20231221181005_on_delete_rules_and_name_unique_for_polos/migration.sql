/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `polos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_publicacaoId_fkey";

-- DropForeignKey
ALTER TABLE "participantes" DROP CONSTRAINT "participantes_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "participantes_polo" DROP CONSTRAINT "participantes_polo_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "participantes_polo" DROP CONSTRAINT "participantes_polo_poloId_fkey";

-- DropForeignKey
ALTER TABLE "polos" DROP CONSTRAINT "polos_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "publicacoes" DROP CONSTRAINT "publicacoes_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "reacoes" DROP CONSTRAINT "reacoes_comentarioId_fkey";

-- DropForeignKey
ALTER TABLE "reacoes" DROP CONSTRAINT "reacoes_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "reacoes" DROP CONSTRAINT "reacoes_publicacaoId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "polos_nome_key" ON "polos"("nome");

-- AddForeignKey
ALTER TABLE "participantes" ADD CONSTRAINT "participantes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "polos" ADD CONSTRAINT "polos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantes_polo" ADD CONSTRAINT "participantes_polo_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantes_polo" ADD CONSTRAINT "participantes_polo_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacoes" ADD CONSTRAINT "publicacoes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "publicacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "publicacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "comentarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
