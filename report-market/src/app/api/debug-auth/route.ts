import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Delete old test user and create fresh one with simple password
    const testEmail = "demo@test.com";
    const testPassword = "demo123456";

    await db.user.deleteMany({ where: { email: testEmail } });

    const hashed = await bcrypt.hash(testPassword, 10);
    await db.user.create({
      data: {
        name: "Demo User",
        email: testEmail,
        password: hashed,
        role: "CARRIER",
        mcNumber: "MC-DEMO",
      },
    });

    // Verify
    const user = await db.user.findUnique({ where: { email: testEmail } });
    const verified = user?.password
      ? await bcrypt.compare(testPassword, user.password)
      : false;

    const allUsers = await db.user.findMany({
      select: { email: true, name: true },
    });

    return NextResponse.json({
      testCredentials: { email: testEmail, password: testPassword },
      passwordVerified: verified,
      allUsers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
