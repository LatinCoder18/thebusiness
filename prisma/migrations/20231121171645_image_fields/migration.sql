/*
  Warnings:

  - You are about to alter the column `image` on the `business` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `image` on the `businessproducts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `business` MODIFY `image` JSON NULL;

-- AlterTable
ALTER TABLE `businessproducts` ADD COLUMN `productCategoriesId` INTEGER NULL,
    MODIFY `image` JSON NULL;

-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar` JSON NULL;

-- CreateTable
CREATE TABLE `ProductCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `image` JSON NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `businessId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BusinessProducts` ADD CONSTRAINT `BusinessProducts_productCategoriesId_fkey` FOREIGN KEY (`productCategoriesId`) REFERENCES `ProductCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategories` ADD CONSTRAINT `ProductCategories_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
