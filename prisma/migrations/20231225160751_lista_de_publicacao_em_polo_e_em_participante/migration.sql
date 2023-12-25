-- AlterTable
ALTER TABLE "publicacoes" ADD COLUMN     "poloId" TEXT,
ALTER COLUMN "participanteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "publicacoes" ADD CONSTRAINT "publicacoes_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
