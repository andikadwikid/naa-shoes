-- CreateTable
CREATE TABLE "public"."size_templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "size_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."size_template_items" (
    "id" SERIAL NOT NULL,
    "centimeters" DOUBLE PRECISION NOT NULL,
    "sizeTemplateId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "size_template_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "size_templates_name_key" ON "public"."size_templates"("name");

-- CreateIndex
CREATE UNIQUE INDEX "size_template_items_sizeTemplateId_sizeId_key" ON "public"."size_template_items"("sizeTemplateId", "sizeId");

-- AddForeignKey
ALTER TABLE "public"."size_template_items" ADD CONSTRAINT "size_template_items_sizeTemplateId_fkey" FOREIGN KEY ("sizeTemplateId") REFERENCES "public"."size_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."size_template_items" ADD CONSTRAINT "size_template_items_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
