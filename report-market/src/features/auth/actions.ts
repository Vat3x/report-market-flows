"use server";

import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "./schemas";

export type AuthState = {
  error?: string;
  success?: boolean;
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

  return { success: true };
}

export async function validateLogin(
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

  return { success: true };
}
