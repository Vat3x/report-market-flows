"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { findOrCreateDriver } from "@/server/services/driver.service";
import { reportSchema, disputeSchema } from "./schemas";
import { normalizeCdl } from "@/shared/lib/utils";
import { canDispute } from "@/features/rating/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type ReportActionResult = {
  success: boolean;
  error?: string;
};

export async function createReport(formData: FormData): Promise<ReportActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "You must be logged in to file a report" };
  }

  const rawData = {
    cdlNumber: formData.get("cdlNumber"),
    driverFirstName: formData.get("driverFirstName") || undefined,
    driverLastName: formData.get("driverLastName") || undefined,
    driverState: formData.get("driverState") || undefined,
    subcategories: formData.getAll("subcategories"),
    incidentDate: formData.get("incidentDate"),
    description: formData.get("description"),
  };

  const validated = reportSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  const data = validated.data;

  const driver = await findOrCreateDriver({
    cdlNumber: data.cdlNumber,
    firstName: data.driverFirstName,
    lastName: data.driverLastName,
    state: data.driverState,
  });

  await db.report.create({
    data: {
      subcategories: data.subcategories,
      description: data.description,
      incidentDate: new Date(data.incidentDate),
      driverId: driver.id,
      reporterId: session.user.id,
    },
  });

  redirect(`/drivers/${encodeURIComponent(normalizeCdl(data.cdlNumber))}`);
}

export type DisputeActionResult = {
  success: boolean;
  error?: string;
};

export async function disputeReport(formData: FormData): Promise<DisputeActionResult> {
  const rawData = {
    reportId: formData.get("reportId"),
    cdlNumber: formData.get("cdlNumber"),
    reason: formData.get("reason"),
  };

  const validated = disputeSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  const { reportId, cdlNumber, reason } = validated.data;

  const report = await db.report.findUnique({
    where: { id: reportId },
    include: { driver: true },
  });

  if (!report) {
    return { success: false, error: "Report not found" };
  }

  if (report.driver.cdlNumber !== cdlNumber) {
    return { success: false, error: "DL number does not match this report" };
  }

  if (report.status !== "VERIFIED") {
    return { success: false, error: "This report has already been disputed" };
  }

  if (!canDispute(report.createdAt)) {
    return { success: false, error: "The 48-hour dispute window has expired" };
  }

  await db.report.update({
    where: { id: reportId },
    data: {
      status: "DISPUTE_PENDING",
      disputeReason: reason,
      disputedAt: new Date(),
    },
  });

  revalidatePath(`/drivers/${encodeURIComponent(cdlNumber)}`);

  return { success: true };
}

export async function resolveDispute(
  reportId: string,
  action: "accept" | "reject"
): Promise<DisputeActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "You must be logged in" };
  }

  const report = await db.report.findUnique({
    where: { id: reportId },
    include: { driver: true },
  });

  if (!report) {
    return { success: false, error: "Report not found" };
  }

  if (report.reporterId !== session.user.id) {
    return { success: false, error: "You can only resolve disputes on your own reports" };
  }

  if (report.status !== "DISPUTE_PENDING") {
    return { success: false, error: "This report does not have a pending dispute" };
  }

  const newStatus = action === "accept" ? "DISPUTED" : "VERIFIED";

  await db.report.update({
    where: { id: reportId },
    data: {
      status: newStatus,
      ...(action === "reject" && { disputeReason: null, disputedAt: null }),
    },
  });

  revalidatePath(`/drivers/${encodeURIComponent(report.driver.cdlNumber)}`);
  revalidatePath("/dashboard");

  return { success: true };
}
