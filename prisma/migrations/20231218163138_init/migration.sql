/*
  Warnings:

  - A unique constraint covering the columns `[roomType]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_roomType_key" ON "Room"("roomType");
