/*
  Warnings:

  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `businessproducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `businessproducts` DROP FOREIGN KEY `BusinessProducts_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `businessproducts` DROP FOREIGN KEY `BusinessProducts_productCategoriesId_fkey`;

-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;

-- DropTable
DROP TABLE `businessproducts`;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `image` JSON NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `businessId` INTEGER NULL,
    `productCategoriesId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_productCategoriesId_fkey` FOREIGN KEY (`productCategoriesId`) REFERENCES `ProductCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
