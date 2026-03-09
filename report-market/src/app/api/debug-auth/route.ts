import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

    const token = await getToken({ req: request, secret });

    const cookies = request.cookies
      .getAll()
      .map((c) => ({ name: c.name, len: c.value.length }));

    return NextResponse.json({
      hasSecret: !!secret,
      secretPrefix: secret?.substring(0, 4),
      token,
      cookies,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
