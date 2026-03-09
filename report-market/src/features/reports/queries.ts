import { db } from "@/server/db";

export async function getReportsByReporter(userId: string) {
  return db.report.findMany({
    where: { reporterId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      driver: {
        select: { cdlNumber: true, firstName: true, lastName: true },
      },
    },
    take: 10,
  });
}

export async function getReporterStats(userId: string) {
  const totalReports = await db.report.count({
    where: { reporterId: userId },
  });

  return { totalReports };
}

export async function getPendingDisputes(userId: string) {
  return db.report.findMany({
    where: {
      reporterId: userId,
      status: "DISPUTE_PENDING",
    },
    orderBy: { disputedAt: "desc" },
    include: {
      driver: {
        select: { cdlNumber: true, firstName: true, lastName: true },
      },
    },
  });
}
