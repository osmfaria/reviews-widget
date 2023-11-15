/*
  Warnings:

  - Added the required column `productId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `upvote` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `downvote` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "productId" TEXT NOT NULL,
ALTER COLUMN "upvote" SET NOT NULL,
ALTER COLUMN "upvote" SET DEFAULT 0,
ALTER COLUMN "downvote" SET NOT NULL,
ALTER COLUMN "downvote" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
