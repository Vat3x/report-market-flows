import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check DB connection
    const userCount = await db.user.count();

    // Get first user (just email, no sensitive data)
    const users = await db.user.findMany({
      select: { email: true, name: true, password: true },
      take: 5,
    });

    // Test bcrypt
    const testHash = await bcrypt.hash("password123", 10);
    const testCompare = await bcrypt.compare("password123", testHash);

    // Test compare with actual user if exists
    let realCompare = null;
    if (users.length > 0 && users[0].password) {
      realCompare = await bcrypt.compare("password123", users[0].password);
    }

    return NextResponse.json({
      dbConnected: true,
      userCount,
      users: users.map((u) => ({
        email: u.email,
        name: u.name,
        hasPassword: !!u.password,
        passwordPrefix: u.password?.substring(0, 10),
      })),
      bcryptWorks: testCompare,
      realPasswordCompare: realCompare,
      env: {
        hasAuthSecret: !!process.env.AUTH_SECRET,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasDbUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        dbConnected: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
