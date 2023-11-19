/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Galery` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "coverImage";

-- CreateTable
CREATE TABLE "CoverImage" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "CoverImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoverImage_productId_key" ON "CoverImage"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Galery_productId_key" ON "Galery"("productId");

-- AddForeignKey
ALTER TABLE "CoverImage" ADD CONSTRAINT "CoverImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
