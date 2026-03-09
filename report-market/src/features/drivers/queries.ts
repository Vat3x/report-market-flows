import { db } from "@/server/db";
import { normalizeCdl } from "@/shared/lib/utils";

export async function getDriverByCdl(cdl: string) {
  const normalizedCdl = normalizeCdl(cdl);

  const driver = await db.driver.findUnique({
    where: { cdlNumber: normalizedCdl },
    include: {
      reports: {
        orderBy: { createdAt: "desc" },
        include: {
          reporter: {
            select: { companyName: true },
          },
        },
      },
    },
  });

  return driver;
}

export async function searchDrivers(query: string) {
  const normalized = normalizeCdl(query);

  const drivers = await db.driver.findMany({
    where: {
      OR: [
        { cdlNumber: { contains: normalized } },
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      reports: {
        select: { subcategories: true, status: true },
      },
    },
    take: 10,
  });

  return drivers;
}
