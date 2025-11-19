"server-only";
import { cookies } from "next/headers";

export async function createSession(token: string) {
  const store = await cookies();

  store.set({
    name: "jwt_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}

export async function getSession() {
  const store = await cookies();
  return store.get("jwt_token")?.value;
}

export async function deleteSession() {
  const store = await cookies();
  store.delete("jwt_token");
}
