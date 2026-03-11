/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `CompanyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CompanyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `CompanyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `foundedYear` on the `CompanyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `CompanyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `mission` on the `CompanyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CompanyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `CompanyInfo` table. All the data in the column will be lost.
  - Added the required column `aboutContent` to the `CompanyInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aboutTitle` to the `CompanyInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroDescription` to the `CompanyInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroTitle` to the `CompanyInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CompanyInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyInfo" DROP COLUMN "coverImageUrl",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "foundedYear",
DROP COLUMN "logoUrl",
DROP COLUMN "mission",
DROP COLUMN "title",
DROP COLUMN "vision",
ADD COLUMN     "aboutContent" TEXT NOT NULL,
ADD COLUMN     "aboutTitle" TEXT NOT NULL,
ADD COLUMN     "heroDescription" TEXT NOT NULL,
ADD COLUMN     "heroTitle" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "projectsCount" INTEGER NOT NULL DEFAULT 800,
ADD COLUMN     "yearsExperience" INTEGER NOT NULL DEFAULT 20;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "companyInfoId" TEXT;

-- CreateTable
CREATE TABLE "Value" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalDocument" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "introText" TEXT NOT NULL,
    "effectiveDate" TEXT,
    "lastUpdated" TIMESTAMP(3),

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalSection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "heading" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "LegalSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_slug_key" ON "LegalDocument"("slug");

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_companyInfoId_fkey" FOREIGN KEY ("companyInfoId") REFERENCES "CompanyInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalSection" ADD CONSTRAINT "LegalSection_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
