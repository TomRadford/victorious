-- AlterTable
ALTER TABLE "Discount" ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "discountAmount" SET DATA TYPE DOUBLE PRECISION;
