import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { searchDrivers } from "@/features/drivers/queries";
import { calculateRating } from "@/features/rating/utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = request.nextUrl.searchParams.get("q");
  if (!query || query.length < 1) {
    return NextResponse.json({ drivers: [] });
  }

  const drivers = await searchDrivers(query);

  const results = drivers.map((driver) => ({
    id: driver.id,
    cdlNumber: driver.cdlNumber,
    firstName: driver.firstName,
    lastName: driver.lastName,
    rating: calculateRating(driver.reports),
  }));

  return NextResponse.json({ drivers: results });
}
