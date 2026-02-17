/*
  Warnings:

  - Added the required column `city` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `employeeId` INTEGER NULL,
    ADD COLUMN `firstName` VARCHAR(60) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(70) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL,
    ADD COLUMN `streetNumber` INTEGER NOT NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
