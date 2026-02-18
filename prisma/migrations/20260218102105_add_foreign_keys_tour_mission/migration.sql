/*
  Warnings:

  - Added the required column `companyId` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mission` ADD COLUMN `companyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tour` ADD COLUMN `companyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tour` ADD CONSTRAINT `Tour_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
