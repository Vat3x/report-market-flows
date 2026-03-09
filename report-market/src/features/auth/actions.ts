"use server";

import { db } from "@/server/db";
import { signIn } from "@/server/auth";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "./schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type ActionResult = {
  success: boolean;
  error?: string;
};

export async function registerUser(formData: FormData): Promise<ActionResult> {
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
    return { success: false, error: validated.error.issues[0].message };
  }

  const { name, email, password, role, companyName, mcNumber } = validated.data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { success: false, error: "Email already registered" };
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
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Failed to sign in after registration" };
    }
    return { success: false, error: "Something went wrong" };
  }

  redirect("/dashboard");
}

export async function loginUser(formData: FormData): Promise<ActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Invalid email or password" };
    }
    return { success: false, error: "Something went wrong" };
  }

  redirect("/dashboard");
}
