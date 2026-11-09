-- CreateTable
CREATE TABLE IF NOT EXISTS "SpecialDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL DEFAULT '臨時休業',
    "isClosed" BOOLEAN NOT NULL DEFAULT true,
    "hours" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecialDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '一般',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "SpecialDay_date_key" ON "SpecialDay"("date");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SpecialDay_date_idx" ON "SpecialDay"("date");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Faq_isPublished_category_sortOrder_idx" ON "Faq"("isPublished", "category", "sortOrder");
