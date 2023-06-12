/*
  Warnings:

  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating_cxb" INTEGER NOT NULL,
    "rating_quality" INTEGER NOT NULL,
    "rating_price" INTEGER NOT NULL,
    "rating_overall" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("description", "id", "productId", "rating_cxb", "rating_overall", "rating_price", "rating_quality", "timestamp", "title", "userId") SELECT "description", "id", "productId", "rating_cxb", "rating_overall", "rating_price", "rating_quality", "timestamp", "title", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
