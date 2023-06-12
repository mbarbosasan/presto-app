/*
  Warnings:

  - You are about to drop the column `body` on the `Review` table. All the data in the column will be lost.
  - Added the required column `description` to the `Review` table without a default value. This is not possible if the table is not empty.

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
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("id", "productId", "rating_cxb", "rating_overall", "rating_price", "rating_quality", "timestamp", "title", "userId") SELECT "id", "productId", "rating_cxb", "rating_overall", "rating_price", "rating_quality", "timestamp", "title", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
