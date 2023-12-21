-- CreateTable
CREATE TABLE "ParticipantePolo" (
    "id" TEXT NOT NULL,
    "comissao" BOOLEAN NOT NULL DEFAULT false,
    "poloId" TEXT NOT NULL,
    "participanteId" TEXT NOT NULL,

    CONSTRAINT "ParticipantePolo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantePolo_participanteId_key" ON "ParticipantePolo"("participanteId");

-- AddForeignKey
ALTER TABLE "ParticipantePolo" ADD CONSTRAINT "ParticipantePolo_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "Polo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantePolo" ADD CONSTRAINT "ParticipantePolo_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
