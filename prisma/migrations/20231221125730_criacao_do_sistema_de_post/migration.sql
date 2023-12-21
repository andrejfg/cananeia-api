-- CreateTable
CREATE TABLE "Publicacao" (
    "id" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "aceito" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "participanteId" TEXT NOT NULL,

    CONSTRAINT "Publicacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "participanteId" TEXT NOT NULL,
    "publicacaoId" TEXT NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publicacao" ADD CONSTRAINT "Publicacao_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_publicacaoId_fkey" FOREIGN KEY ("publicacaoId") REFERENCES "Publicacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
