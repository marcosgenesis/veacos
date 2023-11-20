-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('GENERAL', 'PERSONAL');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_billId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "source" "CategoryEnum" NOT NULL DEFAULT 'GENERAL',
ALTER COLUMN "billId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BillToCategory" (
    "billId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "BillToCategory_pkey" PRIMARY KEY ("billId","categoryId")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillToCategory" ADD CONSTRAINT "BillToCategory_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillToCategory" ADD CONSTRAINT "BillToCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
