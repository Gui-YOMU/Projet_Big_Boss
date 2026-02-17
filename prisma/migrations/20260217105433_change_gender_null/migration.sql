/*
  Warnings:

  - You are about to alter the column `gender` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `employee` MODIFY `gender` ENUM('male', 'female', 'other') NULL;
