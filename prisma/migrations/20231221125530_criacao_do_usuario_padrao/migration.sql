-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfilUrl" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);
