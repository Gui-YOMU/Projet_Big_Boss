/*
  Warnings:

  - You are about to drop the column `carId` on the `mission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `Mission_carId_fkey`;

-- DropIndex
DROP INDEX `Mission_carId_key` ON `mission`;

-- AlterTable
ALTER TABLE `car` ADD COLUMN `employeeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `mission` DROP COLUMN `carId`;

-- CreateIndex
CREATE UNIQUE INDEX `Car_employeeId_key` ON `Car`(`employeeId`);

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
