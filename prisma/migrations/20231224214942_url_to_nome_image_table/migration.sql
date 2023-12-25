/*
  Warnings:

  - The primary key for the `imagens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `url` on the `imagens` table. All the data in the column will be lost.
  - The required column `nome` was added to the `imagens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "imagens" DROP CONSTRAINT "imagens_pkey",
DROP COLUMN "url",
ADD COLUMN     "nome" TEXT NOT NULL,
ADD CONSTRAINT "imagens_pkey" PRIMARY KEY ("nome");
