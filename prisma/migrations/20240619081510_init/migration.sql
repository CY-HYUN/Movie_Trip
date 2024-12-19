-- CreateTable
CREATE TABLE "IncheonPlace" (
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

    CONSTRAINT "IncheonPlace_pkey" PRIMARY KEY ("seqNo")
);

-- CreateTable
CREATE TABLE "GyeonggiPlace" (
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

    CONSTRAINT "GyeonggiPlace_pkey" PRIMARY KEY ("seqNo")
);

-- CreateTable
CREATE TABLE "GangwonPlace" (
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

    CONSTRAINT "GangwonPlace_pkey" PRIMARY KEY ("seqNo")
);

-- CreateTable
CREATE TABLE "ChungcheongPlace" (
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

    CONSTRAINT "ChungcheongPlace_pkey" PRIMARY KEY ("seqNo")
);

-- CreateTable
CREATE TABLE "GyeongsangPlace" (
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

    CONSTRAINT "GyeongsangPlace_pkey" PRIMARY KEY ("seqNo")
);
