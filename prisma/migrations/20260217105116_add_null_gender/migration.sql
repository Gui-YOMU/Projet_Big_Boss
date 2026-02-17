/*
  Warnings:

  - Made the column `gender` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `employee` MODIFY `gender` ENUM('male', 'female', 'other', 'null') NOT NULL;
