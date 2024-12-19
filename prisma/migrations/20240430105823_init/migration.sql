/*
  Warnings:

  - The primary key for the `SeoulPlace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seoulPlaceId` on the `SeoulPlace` table. All the data in the column will be lost.
  - Added the required column `seqNo` to the `SeoulPlace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeoulPlace" DROP CONSTRAINT "SeoulPlace_pkey",
DROP COLUMN "seoulPlaceId",
ADD COLUMN     "seqNo" INTEGER NOT NULL,
ADD CONSTRAINT "SeoulPlace_pkey" PRIMARY KEY ("seqNo");
