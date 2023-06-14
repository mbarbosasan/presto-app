-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating_cxb" TEXT NOT NULL,
    "rating_quality" TEXT NOT NULL,
    "rating_price" TEXT NOT NULL,
    "rating_overall" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "product_image" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Review_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("categoryId", "description", "id", "product_image", "product_name", "product_price", "rating_cxb", "rating_overall", "rating_price", "rating_quality", "timestamp", "title", "userId") SELECT "categoryId", "description", "id", "product_image", "product_name", "product_price", "rating_cxb", "rating_overall", "rating_price", "rating_quality", "timestamp", "title", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
