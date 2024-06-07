/*
  Warnings:

  - Added the required column `userId` to the `scheme_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scheme_transaction" ADD COLUMN     "userId" TEXT NOT NULL;
