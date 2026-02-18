/*
  Warnings:

  - You are about to drop the column `employeeId` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `patient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_employeeId_fkey`;

-- DropIndex
DROP INDEX `Car_employeeId_key` ON `car`;

-- DropIndex
DROP INDEX `Patient_employeeId_fkey` ON `patient`;

-- AlterTable
ALTER TABLE `car` DROP COLUMN `employeeId`;

-- AlterTable
ALTER TABLE `patient` DROP COLUMN `employeeId`,
    ADD COLUMN `tourId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `tourId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `carId` INTEGER NULL,

    UNIQUE INDEX `Mission_carId_key`(`carId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_tourId_fkey` FOREIGN KEY (`tourId`) REFERENCES `Tour`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_tourId_fkey` FOREIGN KEY (`tourId`) REFERENCES `Tour`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
