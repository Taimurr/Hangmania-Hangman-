/*
  Warnings:

  - Added the required column `host` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "player_lobby_key";

-- AlterTable
ALTER TABLE "game" ADD COLUMN     "host" TEXT NOT NULL;
