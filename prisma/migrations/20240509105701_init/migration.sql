/*
  Warnings:

  - You are about to drop the column `routes` on the `UserSaveRoute` table. All the data in the column will be lost.
  - Added the required column `selectRoute` to the `UserSaveRoute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSaveRoute" DROP COLUMN "routes",
ADD COLUMN     "selectRoute" TEXT NOT NULL;
