/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `commentNumber` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `newsId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_newsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_commentId_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "id",
ADD COLUMN     "commentNumber" INTEGER NOT NULL,
ALTER COLUMN "newsId" SET NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("newsId", "commentNumber");

-- AlterTable
ALTER TABLE "public"."Like" DROP COLUMN "commentId",
ADD COLUMN     "commentNewsId" INTEGER,
ADD COLUMN     "commentNumber" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "public"."News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_commentNewsId_commentNumber_fkey" FOREIGN KEY ("commentNewsId", "commentNumber") REFERENCES "public"."Comment"("newsId", "commentNumber") ON DELETE SET NULL ON UPDATE CASCADE;
