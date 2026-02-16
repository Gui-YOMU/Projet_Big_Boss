/*
  Warnings:

  - You are about to drop the column `genre` on the `employee` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `genre`,
    ADD COLUMN `gender` ENUM('male', 'female', 'other') NOT NULL;
