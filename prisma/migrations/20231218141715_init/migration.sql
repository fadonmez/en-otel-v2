-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "roomType" VARCHAR(255) NOT NULL,
    "roomDescription" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "availableCount" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);
