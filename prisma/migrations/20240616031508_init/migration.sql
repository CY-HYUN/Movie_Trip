/*
  Warnings:

  - Added the required column `location` to the `SeoulPlace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeoulPlace" ADD COLUMN     "location" TEXT NOT NULL;
