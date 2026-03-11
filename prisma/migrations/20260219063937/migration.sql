/*
  Warnings:

  - You are about to drop the column `status` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the `BlogCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogPostToBlogTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "BlogStatus" ADD VALUE 'ARCHIVED';

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_BlogPostToBlogTag" DROP CONSTRAINT "_BlogPostToBlogTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogPostToBlogTag" DROP CONSTRAINT "_BlogPostToBlogTag_B_fkey";

-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "status";

-- DropTable
DROP TABLE "BlogCategory";

-- DropTable
DROP TABLE "BlogPost";

-- DropTable
DROP TABLE "BlogTag";

-- DropTable
DROP TABLE "_BlogPostToBlogTag";

-- DropEnum
DROP TYPE "ContactStatus";

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "coverImage" TEXT,
    "status" "BlogStatus" NOT NULL DEFAULT 'DRAFT',
    "tags" TEXT[],
    "author" TEXT NOT NULL,
    "isExternal" BOOLEAN NOT NULL DEFAULT false,
    "sourceUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs"("slug");

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
