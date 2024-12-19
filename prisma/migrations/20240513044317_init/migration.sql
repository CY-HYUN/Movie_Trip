/*
  Warnings:

  - Added the required column `successRoute` to the `UserSaveRoute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSaveRoute" ADD COLUMN     "successRoute" TEXT NOT NULL;
