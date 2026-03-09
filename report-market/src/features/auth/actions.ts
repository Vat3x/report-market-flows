"use server";

import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { registerSchema } from "./schemas";

export type RegisterResult = {
  error?: string;
  success?: boolean;
};

export async function registerUser(formData: FormData): Promise<RegisterResult> {
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

  const { name, password, role, companyName, mcNumber } = validated.data;
  const email = validated.data.email.trim().toLowerCase();

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
