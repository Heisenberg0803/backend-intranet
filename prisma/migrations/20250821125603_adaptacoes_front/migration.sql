/*
  Warnings:

  - You are about to drop the column `status` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `importance` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `FavoriteLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Announcement" ADD COLUMN     "importance" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "end_date" TIMESTAMPTZ,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "start_date" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "public"."FavoriteLink" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."News" DROP COLUMN "status",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "password",
ADD COLUMN     "company_history" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profile_image" TEXT;
