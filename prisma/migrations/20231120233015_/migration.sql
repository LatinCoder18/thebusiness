/*
  Warnings:

  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `business` ADD COLUMN `category` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;
