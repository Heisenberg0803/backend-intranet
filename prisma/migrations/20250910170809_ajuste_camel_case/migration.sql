/*
  Warnings:

  - You are about to drop the column `organizerEmail` on the `Event` table. All the data in the column will be lost.
  - Added the required column `organizer_email` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "organizerEmail",
ADD COLUMN     "organizer_email" TEXT NOT NULL;
