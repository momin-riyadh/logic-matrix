/*
  Warnings:

  - You are about to drop the column `location` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `role` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Made the column `bio` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "location",
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PortfolioStat" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "designation",
DROP COLUMN "github",
DROP COLUMN "isActive",
DROP COLUMN "sortOrder",
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT,
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "AboutUsHero" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "buttonLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutUsHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutUsMetric" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutUsMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhyChooseUsReason" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhyChooseUsReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutUsSection" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutUsSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AboutUsSection_key_key" ON "AboutUsSection"("key");
