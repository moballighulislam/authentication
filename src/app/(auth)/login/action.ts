"use server";
import { createSession, deleteSession } from "@/lib/actions/auth/session";
import { redirect } from "next/navigation";
import z from "zod";

const testUser = {
  id: "1",
  email: "contact@gmail.com",
  password: "12345678",
};

const staticToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0dXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTcwMDAwMDAwMH0.s6Zlkm4N0K9Gf295xTIm1lx66e-11QlWMUOQYIhDZgI";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(staticToken);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
