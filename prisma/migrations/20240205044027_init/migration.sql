/*
  Warnings:

  - You are about to drop the column `movieId` on the `MovieReview` table. All the data in the column will be lost.
  - Added the required column `movieTitle` to the `MovieReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieReview" DROP COLUMN "movieId",
ADD COLUMN     "movieTitle" TEXT NOT NULL;
