/*
  Warnings:

  - Added the required column `contentType` to the `UserSaveRoute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSaveRoute" ADD COLUMN     "contentType" TEXT NOT NULL,
ADD COLUMN     "routes" TEXT;
