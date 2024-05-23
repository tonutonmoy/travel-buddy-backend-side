-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'true';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "age" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "photo" TEXT;
