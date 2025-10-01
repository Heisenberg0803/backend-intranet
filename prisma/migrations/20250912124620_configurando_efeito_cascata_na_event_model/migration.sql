-- DropForeignKey
ALTER TABLE "public"."Registration" DROP CONSTRAINT "Registration_eventId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
