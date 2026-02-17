-- CreateTable
CREATE TABLE "Cause" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "imgUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cause_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cause_category_idx" ON "Cause"("category");

-- CreateIndex
CREATE INDEX "Cause_isActive_idx" ON "Cause"("isActive");
