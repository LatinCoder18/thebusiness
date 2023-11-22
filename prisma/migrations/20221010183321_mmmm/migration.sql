-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `mobile_uuid` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isVerified` BOOLEAN NULL DEFAULT false,
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `rolesId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flights` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `charter` VARCHAR(191) NOT NULL,
    `flightNumber` VARCHAR(191) NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `checkIn` VARCHAR(191) NOT NULL,
    `departure` VARCHAR(191) NOT NULL,
    `arrival` VARCHAR(191) NOT NULL,
    `gate` VARCHAR(191) NOT NULL,
    `reservedSeats` VARCHAR(191) NOT NULL,
    `openSeats` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `adultPrice` DOUBLE NULL,
    `childPrice` DOUBLE NULL,
    `boysPrice` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `paymentsId` INTEGER NULL,
    `flightOut` INTEGER NULL,
    `flightIn` INTEGER NULL,
    `isDeleted` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `subtotal` DOUBLE NOT NULL DEFAULT 0,
    `total` DOUBLE NOT NULL DEFAULT 0,
    `fees` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `Bookings_id_key`(`id`),
    UNIQUE INDEX `Bookings_paymentsId_key`(`paymentsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingsContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingId` INTEGER NOT NULL,
    `contactId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPayment` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `amountMoney` DOUBLE NULL,
    `totalMoney` DOUBLE NULL,
    `appFeeMoney` DOUBLE NULL,
    `approvedMoney` DOUBLE NULL,
    `sourceType` VARCHAR(191) NULL,
    `cardDetails` JSON NULL,
    `note` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Payments_idPayment_key`(`idPayment`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Suscribers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Error` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(2500) NULL,
    `stack` VARCHAR(5000) NULL,
    `url` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `error_status` INTEGER NULL,
    `request_body` VARCHAR(2500) NULL,
    `request_query` VARCHAR(2500) NULL,
    `request_params` VARCHAR(2500) NULL,
    `time` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NULL,
    `key` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(2500) NULL,
    `description` VARCHAR(2500) NULL,
    `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `passengerType` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gender` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `cyti` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `ofacCode` VARCHAR(191) NOT NULL,
    `mothersMaiden` VARCHAR(191) NOT NULL,
    `foreignAddress` VARCHAR(191) NOT NULL,
    `foreignCity` VARCHAR(191) NOT NULL,
    `foreignProvince` VARCHAR(191) NOT NULL,
    `foreignZip` VARCHAR(191) NULL,
    `emergencyName` VARCHAR(191) NULL,
    `emergencyPhone` VARCHAR(191) NOT NULL,
    `cubanFirstName` VARCHAR(191) NULL,
    `cubanLastName` VARCHAR(191) NULL,
    `arrivalDoc` VARCHAR(191) NOT NULL,
    `countryOfIssue` VARCHAR(191) NOT NULL,
    `arrivalDocNo` VARCHAR(191) NOT NULL,
    `expDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `arrivalDocSec` VARCHAR(191) NOT NULL,
    `countryOfIssueSec` VARCHAR(191) NOT NULL,
    `arrivalDocNoSec` VARCHAR(191) NOT NULL,
    `expDateSec` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usersId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_paymentsId_fkey` FOREIGN KEY (`paymentsId`) REFERENCES `Payments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_flightOut_fkey` FOREIGN KEY (`flightOut`) REFERENCES `Flights`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_flightIn_fkey` FOREIGN KEY (`flightIn`) REFERENCES `Flights`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingsContacts` ADD CONSTRAINT `BookingsContacts_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Bookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingsContacts` ADD CONSTRAINT `BookingsContacts_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
