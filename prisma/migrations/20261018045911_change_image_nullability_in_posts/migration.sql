/*
  Warnings:

  - Made the column `image_path` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "image_path" SET NOT NULL;
