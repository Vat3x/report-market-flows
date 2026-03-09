import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const userCount = await db.user.count();
    const users = await db.user.findMany({
      select: { email: true, name: true },
      take: 5,
    });

    return NextResponse.json({
      dbConnected: true,
      userCount,
      users,
      env: {
        hasAuthSecret: !!process.env.AUTH_SECRET,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasDbUrl: !!process.env.DATABASE_URL,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Test login flow: POST /api/debug-auth with { email, password }
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
      passwordInputLength: password?.length,
      storedHashPrefix: user.password.substring(0, 7),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
