-- AlterTable
ALTER TABLE "public"."product_colors" ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."size_guides" (
    "id" SERIAL NOT NULL,
    "centimeters" DOUBLE PRECISION NOT NULL,
    "productId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "size_guides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "size_guides_productId_sizeId_key" ON "public"."size_guides"("productId", "sizeId");

-- AddForeignKey
ALTER TABLE "public"."size_guides" ADD CONSTRAINT "size_guides_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."size_guides" ADD CONSTRAINT "size_guides_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
