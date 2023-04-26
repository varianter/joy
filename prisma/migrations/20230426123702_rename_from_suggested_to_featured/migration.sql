/*
  Warnings:

  - You are about to drop the column `suggested` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "suggested";
ALTER TABLE "Content" ADD COLUMN     "featured" BOOL NOT NULL DEFAULT false;
