-- CreateTable
CREATE TABLE "JeollaPlace" (
    "seqNo" INTEGER NOT NULL,
    "placeName" TEXT NOT NULL,
    "placeType" TEXT NOT NULL,
    "placeDesc" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "titmeName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,

    CONSTRAINT "JeollaPlace_pkey" PRIMARY KEY ("seqNo")
);
