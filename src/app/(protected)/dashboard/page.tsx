"use client";
import { logout } from "@/app/(auth)/login/action";

export default function Dashboard() {
  return (
    <div className="">
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}
