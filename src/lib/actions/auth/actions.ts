"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type userInfo = {
  username: string;
  password: string;
};

type AuthResponse =
  | { success: true; jwtToken: string; userInfo: userInfo }
  | { success: false; message: string };

const testUser: userInfo = {
  username: "admin12345",
  password: "admin12345",
};

function generateToken({
  username,
  password,
}: {
  username: string;
  password: string;
}): AuthResponse {
  if (!username || !password) {
    return {
      success: false,
      message: "Missing username or password",
    };
  }

  if (username === testUser.username && password === testUser.password) {
    return {
      success: true,
      jwtToken:
        "jwtTokeneyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
      userInfo: testUser,
    };
  } else {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Collect all validation errors
  const errors: string[] = [];

  if (!username || !password) {
    errors.push("All fields are required.");
  } else {
    if (username.length < 8) {
      errors.push("Username must be at least 8 characters.");
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
  }

  // If there are validation errors, return them all joined
  if (errors.length > 0) {
    return { success: false, message: errors.join(" ") };
  }

  // Continue with token generation
  const resp = generateToken({ username, password });

  if (resp.success) {
    const cookieStore = cookies();
    (await cookieStore).set("auth_token", resp.jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    redirect("/dashboard");
  } else {
    return {
      success: false,
      message: resp.message,
    };
  }
}
