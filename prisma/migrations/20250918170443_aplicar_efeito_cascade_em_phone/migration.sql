-- DropForeignKey
ALTER TABLE "public"."Phone" DROP CONSTRAINT "Phone_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Phone" ADD CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
