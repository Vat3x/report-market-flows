-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ReportCategory" ADD VALUE 'COMMUNICATION';
ALTER TYPE "ReportCategory" ADD VALUE 'COMPLIANCE';
ALTER TYPE "ReportCategory" ADD VALUE 'SAFETY';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ReportSubcategory" ADD VALUE 'LOAD_CANCELLATION';
ALTER TYPE "ReportSubcategory" ADD VALUE 'POOR_SCHEDULE';
ALTER TYPE "ReportSubcategory" ADD VALUE 'NO_GOOD_TO_GO';
ALTER TYPE "ReportSubcategory" ADD VALUE 'REFUSES_DETENTION';
ALTER TYPE "ReportSubcategory" ADD VALUE 'FAILS_TO_REPORT';
ALTER TYPE "ReportSubcategory" ADD VALUE 'NOT_CHECKING_LOAD';
ALTER TYPE "ReportSubcategory" ADD VALUE 'RUDE_BEHAVIOR';
ALTER TYPE "ReportSubcategory" ADD VALUE 'HIGH_RATES';
ALTER TYPE "ReportSubcategory" ADD VALUE 'DIRECT_CONTACT';
ALTER TYPE "ReportSubcategory" ADD VALUE 'THREATENS_DELIVERY';
ALTER TYPE "ReportSubcategory" ADD VALUE 'IGNORING_INSTRUCTIONS';
ALTER TYPE "ReportSubcategory" ADD VALUE 'POOR_COMMUNICATION';
ALTER TYPE "ReportSubcategory" ADD VALUE 'LACK_OF_UNDERSTANDING';
ALTER TYPE "ReportSubcategory" ADD VALUE 'LANGUAGE_BARRIER';
ALTER TYPE "ReportSubcategory" ADD VALUE 'INVALID_DOCUMENTS';
ALTER TYPE "ReportSubcategory" ADD VALUE 'NO_TRACKING';
ALTER TYPE "ReportSubcategory" ADD VALUE 'GPS_OFF';
ALTER TYPE "ReportSubcategory" ADD VALUE 'REFUSES_SEAL';
ALTER TYPE "ReportSubcategory" ADD VALUE 'UNSAFE_DRIVING';
ALTER TYPE "ReportSubcategory" ADD VALUE 'POOR_EQUIPMENT';
