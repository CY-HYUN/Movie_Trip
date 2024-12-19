/*
  Warnings:

  - Made the column `routes` on table `UserSaveRoute` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserSaveRoute" ALTER COLUMN "routes" SET NOT NULL;
