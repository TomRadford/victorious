-- CreateTable
CREATE TABLE "Line" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "baseColour" TEXT NOT NULL,
    "faceplateColour" TEXT NOT NULL,
    "logoTypeLeft" TEXT NOT NULL,
    "logoTypeRight" TEXT NOT NULL,
    "logoColourLeft" TEXT NOT NULL,
    "logoColourRight" TEXT NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerEmail_fkey" FOREIGN KEY ("customerEmail") REFERENCES "Customer"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
