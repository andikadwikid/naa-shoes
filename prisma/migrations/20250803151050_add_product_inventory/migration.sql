/*
  Warnings:

  - You are about to drop the `product_colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_sizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."product_colors" DROP CONSTRAINT "product_colors_colorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_colors" DROP CONSTRAINT "product_colors_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_sizes" DROP CONSTRAINT "product_sizes_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_sizes" DROP CONSTRAINT "product_sizes_sizeId_fkey";

-- DropTable
DROP TABLE "public"."product_colors";

-- DropTable
DROP TABLE "public"."product_sizes";

-- CreateTable
CREATE TABLE "public"."product_inventories" (
    "id" SERIAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "product_inventories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_inventories_productId_colorId_sizeId_key" ON "public"."product_inventories"("productId", "colorId", "sizeId");

-- AddForeignKey
ALTER TABLE "public"."product_inventories" ADD CONSTRAINT "product_inventories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_inventories" ADD CONSTRAINT "product_inventories_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_inventories" ADD CONSTRAINT "product_inventories_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
