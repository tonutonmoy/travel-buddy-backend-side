/*
  Warnings:

  - Added the required column `city` to the `travelBuddys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `travelBuddys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `travelBuddys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `travelBuddys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `travelBuddys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "travelBuddys" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;
