/*
  Warnings:

  - You are about to drop the column `ownerId` on the `businessproducts` table. All the data in the column will be lost.
  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `businessproducts` DROP FOREIGN KEY `BusinessProducts_ownerId_fkey`;

-- AlterTable
ALTER TABLE `business` ADD COLUMN `ownerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `businessproducts` DROP COLUMN `ownerId`;

-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
