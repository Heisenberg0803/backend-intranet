/*
  Warnings:

  - You are about to drop the column `organizerId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerEmail` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_organizerId_fkey";

-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "organizerId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "organizerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
