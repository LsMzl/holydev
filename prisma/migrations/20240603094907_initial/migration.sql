-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `profilePicture` VARCHAR(191) NULL,
    `coverPicture` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isEmailConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `handle` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `Session_handle_key`(`handle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `House` (
    `id` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `available` BOOLEAN NOT NULL DEFAULT true,
    `title` TEXT NULL,
    `image` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NULL,
    `ownerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opinion` (
    `id` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `houseId` VARCHAR(191) NOT NULL,

    INDEX `Opinion_authorId_idx`(`authorId`),
    INDEX `Opinion_houseId_idx`(`houseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bgColor` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `houseId` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `houseOwnerId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'Français',
    `totalPrice` INTEGER NOT NULL,
    `paymentStatus` BOOLEAN NOT NULL DEFAULT false,
    `paymentIntentId` VARCHAR(191) NOT NULL,
    `bookedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Booking_paymentIntentId_key`(`paymentIntentId`),
    INDEX `Booking_houseId_idx`(`houseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerificationToken` ADD CONSTRAINT `VerificationToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Opinion` ADD CONSTRAINT `Opinion_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Opinion` ADD CONSTRAINT `Opinion_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
