-- DropIndex
DROP INDEX "public"."Account_userId_idx";

-- DropIndex
DROP INDEX "public"."Session_userId_idx";

-- RenameIndex
ALTER INDEX "public"."user_email_idx" RENAME TO "User_email_key";
