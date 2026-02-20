/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,date]` on the table `Mission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Mission_employeeId_date_key` ON `Mission`(`employeeId`, `date`);
