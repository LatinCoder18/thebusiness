/*
  Warnings:

  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `createdAt` on the `productcategories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `productcategories` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `productcategories` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `productcategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;

-- AlterTable
ALTER TABLE `productcategories` DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `isDeleted`;
