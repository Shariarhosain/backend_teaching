-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "bank_account_number" TEXT,
    "card_number" TEXT,
    "card_expiry_date" TEXT,
    "card_cvv" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
