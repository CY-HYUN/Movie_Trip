-- CreateTable
CREATE TABLE "UserSaveRoute" (
    "userSaveRouteId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserSaveRoute_pkey" PRIMARY KEY ("userSaveRouteId")
);
