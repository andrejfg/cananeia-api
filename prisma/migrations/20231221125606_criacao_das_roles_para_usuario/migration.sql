-- CreateTable
CREATE TABLE "Participante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Polo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participante_usuarioId_key" ON "Participante"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Polo_usuarioId_key" ON "Polo"("usuarioId");

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polo" ADD CONSTRAINT "Polo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
