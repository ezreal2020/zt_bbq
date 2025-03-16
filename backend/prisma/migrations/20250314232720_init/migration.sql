-- CreateTable
CREATE TABLE "run_client" (
    "runId" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "run_time_series_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "runId" TEXT NOT NULL,
    "timeStamp" REAL NOT NULL,
    "parameter" TEXT NOT NULL,
    "processValue" REAL NOT NULL,
    "unit" TEXT NOT NULL
);
