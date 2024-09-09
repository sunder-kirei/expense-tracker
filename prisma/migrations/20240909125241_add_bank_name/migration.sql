/*
  Warnings:

  - You are about to drop the column `title` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountNumber]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bankName` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "bankName" TEXT NOT NULL,
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "title";

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountNumber_key" ON "BankAccount"("accountNumber");
