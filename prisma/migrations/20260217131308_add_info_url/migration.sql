/*
  Warnings:

  - You are about to drop the column `info` on the `Cause` table. All the data in the column will be lost.
  - Added the required column `description` to the `Cause` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infoUrl` to the `Cause` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cause" DROP COLUMN "info",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "infoUrl" TEXT NOT NULL;
