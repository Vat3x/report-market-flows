import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Create test user if not exists
    const testEmail = "testuser@reportmarket.com";
    const testPassword = "Test1234!";
    let testUser = await db.user.findUnique({ where: { email: testEmail } });

    if (!testUser) {
      const hashed = await bcrypt.hash(testPassword, 10);
      testUser = await db.user.create({
        data: {
          name: "Test User",
          email: testEmail,
          password: hashed,
          role: "CARRIER",
          mcNumber: "MC-TEST123",
        },
      });
    }

    // Verify the test user's password works
    const compareResult = await bcrypt.compare(testPassword, testUser.password!);

    const userCount = await db.user.count();
    const users = await db.user.findMany({
      select: { email: true, name: true },
      take: 10,
    });

    return NextResponse.json({
      dbConnected: true,
      userCount,
      users,
      testUser: {
        email: testEmail,
        password: testPassword,
        passwordVerified: compareResult,
      },
      env: {
        hasAuthSecret: !!process.env.AUTH_SECRET,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, password: true },
    });

    if (!user) {
      return NextResponse.json({ step: "findUser", result: "NOT_FOUND", email });
    }

    if (!user.password) {
      return NextResponse.json({ step: "checkPassword", result: "NO_PASSWORD" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    return NextResponse.json({
      step: "compare",
      userFound: true,
      email: user.email,
      passwordValid: isValid,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
