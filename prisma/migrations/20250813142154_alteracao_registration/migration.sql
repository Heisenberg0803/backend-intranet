/*
  Warnings:

  - The primary key for the `Registration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Registration` table. All the data in the column will be lost.
  - Added the required column `registrationId` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Registration" DROP CONSTRAINT "Registration_pkey",
DROP COLUMN "id",
ADD COLUMN     "registrationId" INTEGER NOT NULL,
ADD CONSTRAINT "Registration_pkey" PRIMARY KEY ("eventId", "registrationId");
