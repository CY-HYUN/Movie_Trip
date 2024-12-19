/*
  Warnings:

  - You are about to drop the column `closedDay` on the `SeoulPlace` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SeoulPlace` table. All the data in the column will be lost.
  - You are about to drop the column `operTime` on the `SeoulPlace` table. All the data in the column will be lost.
  - You are about to drop the column `restTime` on the `SeoulPlace` table. All the data in the column will be lost.
  - Added the required column `category` to the `SeoulPlace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeDesc` to the `SeoulPlace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titmeName` to the `SeoulPlace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeoulPlace" DROP COLUMN "closedDay",
DROP COLUMN "description",
DROP COLUMN "operTime",
DROP COLUMN "restTime",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "placeDesc" TEXT NOT NULL,
ADD COLUMN     "titmeName" TEXT NOT NULL;
