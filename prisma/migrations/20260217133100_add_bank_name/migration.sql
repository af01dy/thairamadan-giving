/*
  Warnings:

  - Added the required column `bankName` to the `Cause` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cause" ADD COLUMN     "bankName" TEXT NOT NULL;
