"use server";

import { db } from "@/server/db";
import { signIn } from "@/server/auth";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "./schemas";
import { AuthError } from "next-auth";

export type AuthState = {
  error?: string;
} | null;

export async function registerUser(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
    companyName: formData.get("companyName"),
    mcNumber: formData.get("mcNumber"),
  };

  const validated = registerSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { name, email, password, role, companyName, mcNumber } = validated.data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      companyName: companyName || null,
      mcNumber,
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Failed to sign in after registration" };
    }
    throw error;
  }

  return null;
}

export async function loginUser(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }

  return null;
}
