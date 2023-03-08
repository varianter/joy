-- CreateTable
CREATE TABLE "Videos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "youtubeid" STRING NOT NULL,
    "suggested" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);
