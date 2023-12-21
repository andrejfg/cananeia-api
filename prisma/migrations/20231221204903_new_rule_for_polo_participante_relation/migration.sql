-- DropForeignKey
ALTER TABLE "participantes" DROP CONSTRAINT "participantes_poloId_fkey";

-- AddForeignKey
ALTER TABLE "participantes" ADD CONSTRAINT "participantes_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
