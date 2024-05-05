-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "round" INTEGER NOT NULL,
    "total_rounds" INTEGER NOT NULL,
    "max_player" INTEGER,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lobby" INTEGER,
    "score" INTEGER,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_lobby_key" ON "player"("lobby");
