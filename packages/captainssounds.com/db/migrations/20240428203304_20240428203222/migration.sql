/*
  Warnings:

  - You are about to drop the column `category` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "donationware" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeId" TEXT;

-- DropEnum
DROP TYPE "Category";
