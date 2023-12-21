/*
  Warnings:

  - You are about to drop the `Comentario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantePolo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Polo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Publicacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ReationENUM" AS ENUM ('LOVE');

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_publicacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Participante" DROP CONSTRAINT "Participante_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantePolo" DROP CONSTRAINT "ParticipantePolo_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantePolo" DROP CONSTRAINT "ParticipantePolo_poloId_fkey";

-- DropForeignKey
ALTER TABLE "Polo" DROP CONSTRAINT "Polo_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Publicacao" DROP CONSTRAINT "Publicacao_participanteId_fkey";

-- DropTable
DROP TABLE "Comentario";

-- DropTable
DROP TABLE "Participante";

-- DropTable
DROP TABLE "ParticipantePolo";

-- DropTable
DROP TABLE "Polo";

-- DropTable
DROP TABLE "Publicacao";

-- CreateTable
CREATE TABLE "participantes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "participantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "polos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "polos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participantes_polo" (
    "id" TEXT NOT NULL,
    "comissao" BOOLEAN NOT NULL DEFAULT false,
    "poloId" TEXT NOT NULL,
    "participanteId" TEXT NOT NULL,

    CONSTRAINT "participantes_polo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicacoes" (
    "id" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "aceito" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "participanteId" TEXT NOT NULL,

    CONSTRAINT "publicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "participanteId" TEXT NOT NULL,
    "publicacaoId" TEXT NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reacoes" (
    "id" TEXT NOT NULL,
    "tipo" "ReationENUM" NOT NULL DEFAULT 'LOVE',
    "publicacaoId" TEXT,
    "comentarioId" TEXT,
    "participanteId" TEXT NOT NULL,

    CONSTRAINT "reacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participantes_usuarioId_key" ON "participantes"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "polos_usuarioId_key" ON "polos"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "participantes_polo_participanteId_key" ON "participantes_polo"("participanteId");

-- AddForeignKey
ALTER TABLE "participantes" ADD CONSTRAINT "participantes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "polos" ADD CONSTRAINT "polos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantes_polo" ADD CONSTRAINT "participantes_polo_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantes_polo" ADD CONSTRAINT "participantes_polo_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacoes" ADD CONSTRAINT "publicacoes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "publicacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "publicacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "comentarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
