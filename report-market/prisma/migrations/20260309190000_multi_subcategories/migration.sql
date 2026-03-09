-- Add subcategories array column
ALTER TABLE "Report" ADD COLUMN "subcategories" "ReportSubcategory"[];

-- Migrate existing data: copy single subcategory into array
UPDATE "Report" SET "subcategories" = ARRAY["subcategory"];

-- Drop old columns
ALTER TABLE "Report" DROP COLUMN "subcategory";
ALTER TABLE "Report" DROP COLUMN "category";
