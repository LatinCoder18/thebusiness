/*
  Warnings:

  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `mobile_uuid` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `mobile_uuid`;

-- CreateTable
CREATE TABLE `Business` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `image` VARCHAR(191) NULL,
    `isPromoted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BusinessProducts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `ownerId` INTEGER NULL,
    `businessId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BusinessProducts` ADD CONSTRAINT `BusinessProducts_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusinessProducts` ADD CONSTRAINT `BusinessProducts_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
