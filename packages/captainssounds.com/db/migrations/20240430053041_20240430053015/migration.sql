-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('Text', 'Image', 'List', 'Youtube');

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "className" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
