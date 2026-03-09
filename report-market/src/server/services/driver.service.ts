import { db } from "@/server/db";
import { normalizeCdl } from "@/shared/lib/utils";

export async function findOrCreateDriver(data: {
  cdlNumber: string;
  firstName?: string;
  lastName?: string;
  state?: string;
}) {
  const cdl = normalizeCdl(data.cdlNumber);

  let driver = await db.driver.findUnique({
    where: { cdlNumber: cdl },
  });

  if (!driver) {
    driver = await db.driver.create({
      data: {
        cdlNumber: cdl,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        state: data.state || null,
      },
    });
  }

  return driver;
}
