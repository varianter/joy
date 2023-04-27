/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Content` table. All the data in the column will be lost.
  - Added the required column `category` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "categoryId";
ALTER TABLE "Content" ADD COLUMN     "category" STRING NOT NULL;
