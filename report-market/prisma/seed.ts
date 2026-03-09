import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.report.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 10);

  // Create users
  const carrier1 = await prisma.user.create({
    data: {
      name: "Mike Johnson",
      email: "mike@abctrucking.com",
      password,
      role: "CARRIER",
      companyName: "ABC Trucking LLC",
    },
  });

  const carrier2 = await prisma.user.create({
    data: {
      name: "Sarah Williams",
      email: "sarah@fastfreight.com",
      password,
      role: "CARRIER",
      companyName: "Fast Freight Inc",
    },
  });

  const dispatcher1 = await prisma.user.create({
    data: {
      name: "Alex Rodriguez",
      email: "alex@dispatch.com",
      password,
      role: "DISPATCHER",
      companyName: "National Dispatch Co",
    },
  });

  // Create drivers
  const driver1 = await prisma.driver.create({
    data: {
      cdlNumber: "TX12345678",
      firstName: "James",
      lastName: "Smith",
      state: "TX",
    },
  });

  const driver2 = await prisma.driver.create({
    data: {
      cdlNumber: "CA98765432",
      firstName: "Robert",
      lastName: "Brown",
      state: "CA",
    },
  });

  const driver3 = await prisma.driver.create({
    data: {
      cdlNumber: "FL55667788",
      firstName: "David",
      lastName: "Wilson",
      state: "FL",
    },
  });

  const driver4 = await prisma.driver.create({
    data: {
      cdlNumber: "IL11223344",
      firstName: "Carlos",
      lastName: "Garcia",
      state: "IL",
    },
  });

  const driver5 = await prisma.driver.create({
    data: {
      cdlNumber: "OH99887766",
      firstName: "Kevin",
      lastName: "Taylor",
      state: "OH",
    },
  });

  // Create reports
  const reports = [
    // Driver 1 - James Smith (3 reports, moderate rating)
    {
      category: "TRANSPORT" as const,
      subcategory: "LATE_DELIVERY" as const,
      description: "Driver arrived 4 hours late to pickup location. No prior communication about delay.",
      incidentDate: new Date("2026-02-15"),
      driverId: driver1.id,
      reporterId: carrier1.id,
    },
    {
      category: "PROFESSIONAL" as const,
      subcategory: "COMMUNICATION" as const,
      description: "Driver was unreachable for 6 hours during transit. Did not respond to calls or texts.",
      incidentDate: new Date("2026-02-20"),
      driverId: driver1.id,
      reporterId: dispatcher1.id,
    },
    {
      category: "PROFESSIONAL" as const,
      subcategory: "DOCUMENTATION" as const,
      description: "BOL was incorrectly filled out. Missing signatures and wrong delivery address listed.",
      incidentDate: new Date("2026-03-01"),
      driverId: driver1.id,
      reporterId: carrier2.id,
    },
    // Driver 2 - Robert Brown (2 reports, good rating)
    {
      category: "PROFESSIONAL" as const,
      subcategory: "PUNCTUALITY" as const,
      description: "Showed up 2 hours late to loading dock. Caused delays in warehouse schedule.",
      incidentDate: new Date("2026-01-10"),
      driverId: driver2.id,
      reporterId: carrier1.id,
    },
    {
      category: "PROFESSIONAL" as const,
      subcategory: "COMMUNICATION" as const,
      description: "Failed to update dispatcher on delivery status for 8 hours.",
      incidentDate: new Date("2026-02-05"),
      driverId: driver2.id,
      reporterId: dispatcher1.id,
    },
    // Driver 3 - David Wilson (5 reports, low rating)
    {
      category: "TRANSPORT" as const,
      subcategory: "CARGO_DAMAGE" as const,
      description: "Significant water damage to electronics shipment. Trailer seal was broken on arrival.",
      incidentDate: new Date("2026-01-15"),
      driverId: driver3.id,
      reporterId: carrier1.id,
    },
    {
      category: "TRANSPORT" as const,
      subcategory: "ACCIDENT" as const,
      description: "Minor fender bender at distribution center. Damaged loading dock door.",
      incidentDate: new Date("2026-01-25"),
      driverId: driver3.id,
      reporterId: carrier2.id,
    },
    {
      category: "TRANSPORT" as const,
      subcategory: "DOT_INSPECTION_ISSUE" as const,
      description: "Failed DOT roadside inspection due to brake violations. Caused 12-hour shipment delay.",
      incidentDate: new Date("2026-02-10"),
      driverId: driver3.id,
      reporterId: dispatcher1.id,
    },
    {
      category: "PROFESSIONAL" as const,
      subcategory: "IRRESPONSIBILITY" as const,
      description: "Left trailer unattended at rest stop overnight without authorization.",
      incidentDate: new Date("2026-02-18"),
      driverId: driver3.id,
      reporterId: carrier1.id,
    },
    {
      category: "TRANSPORT" as const,
      subcategory: "LATE_DELIVERY" as const,
      description: "Delivery was 2 days late. Driver took unauthorized detour.",
      incidentDate: new Date("2026-03-02"),
      driverId: driver3.id,
      reporterId: carrier2.id,
    },
    // Driver 4 - Carlos Garcia (1 report, excellent rating)
    {
      category: "PROFESSIONAL" as const,
      subcategory: "PUNCTUALITY" as const,
      description: "Arrived 1 hour late to scheduled pickup. Minor delay.",
      incidentDate: new Date("2026-02-28"),
      driverId: driver4.id,
      reporterId: dispatcher1.id,
    },
    // Driver 5 - Kevin Taylor (no reports, perfect rating)
  ];

  for (const report of reports) {
    await prisma.report.create({ data: report });
  }

  console.log("Seed data created successfully!");
  console.log("Test credentials: any email above with password 'password123'");
  console.log("\nDrivers:");
  console.log("  TX12345678 - James Smith (3 reports, score: 87%)");
  console.log("  CA98765432 - Robert Brown (2 reports, score: 93%)");
  console.log("  FL55667788 - David Wilson (5 reports, score: 42%)");
  console.log("  IL11223344 - Carlos Garcia (1 report, score: 96%)");
  console.log("  OH99887766 - Kevin Taylor (0 reports, score: 100%)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
