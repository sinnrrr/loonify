/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[phone]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User.phone_unique" ON "User"("phone");
