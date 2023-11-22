/*
  Warnings:

  - You are about to alter the column `time` on the `error` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookingscontacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suscribers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Bookings_flightIn_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Bookings_flightOut_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Bookings_paymentsId_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Bookings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `bookingscontacts` DROP FOREIGN KEY `BookingsContacts_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `bookingscontacts` DROP FOREIGN KEY `BookingsContacts_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `contacts` DROP FOREIGN KEY `Contacts_usersId_fkey`;

-- AlterTable
ALTER TABLE `error` MODIFY `time` DATETIME NULL;

-- DropTable
DROP TABLE `bookings`;

-- DropTable
DROP TABLE `bookingscontacts`;

-- DropTable
DROP TABLE `cards`;

-- DropTable
DROP TABLE `contacts`;

-- DropTable
DROP TABLE `flights`;

-- DropTable
DROP TABLE `locations`;

-- DropTable
DROP TABLE `payments`;

-- DropTable
DROP TABLE `suscribers`;
