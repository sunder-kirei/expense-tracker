/*
  Warnings:

  - You are about to drop the column `accountLogo` on the `BankAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "accountLogo",
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false;
