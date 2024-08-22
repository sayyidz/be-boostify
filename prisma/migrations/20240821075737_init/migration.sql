-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "assisstant_code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "time" TIMESTAMP NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assisstant" (
    "id" SERIAL NOT NULL,
    "assisstant_code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Assisstant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlacklistedToken" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlacklistedToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "assisstant_code" ON "Assisstant"("assisstant_code");

-- CreateIndex
CREATE UNIQUE INDEX "Assisstant_name_key" ON "Assisstant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "token" ON "BlacklistedToken"("token");
