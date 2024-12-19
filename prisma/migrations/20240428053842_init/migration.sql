-- CreateTable
CREATE TABLE "SeoulPlace" (
    "seoulPlaceId" SERIAL NOT NULL,
    "placeName" TEXT NOT NULL,
    "placeType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "operTime" TEXT NOT NULL,
    "restTime" TEXT NOT NULL,
    "closedDay" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,

    CONSTRAINT "SeoulPlace_pkey" PRIMARY KEY ("seoulPlaceId")
);
