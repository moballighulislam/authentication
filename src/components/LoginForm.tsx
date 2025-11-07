"use client";

import { loginAction } from "@/lib/actions/auth/actions";
import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Login from "@/app/(auth)/login/page";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending && <Loader2 className="size-5 animate-spin" aria-hidden />}
        <span>{pending ? "Signing you in..." : "Sign In"}</span>
      </span>
      {/* Glow */}
      <span className="pointer-events-none absolute inset-0 -z-0 opacity-60 [background:radial-gradient(60%_120%_at_50%_-20%,white,transparent)]"></span>
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

      <div className="mx-auto flex max-w-sm items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full rounded-[28px] p-[1px] shadow-[0_20px_80px_-20px_rgba(72,91,255,0.35)]"
          aria-live="polite"
        >
          {/* Gradient border */}
          <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-blue-600/30 via-indigo-400/30 to-purple-600/30 blur-xl" />

          {/* Card */}
          <div className="relative w-full rounded-[26px] border border-white/60 bg-white/90 p-8 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-3xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400"
              >
                Welcome Back
              </motion.h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sign in to continue to your account
              </p>
            </div>

            {/* Form */}
            <form action={formAction} className="mt-6 space-y-5" noValidate>
              {/* Username */}
              <div className="relative group">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600">
                  <Mail className="size-5" aria-hidden />
                </div>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder=" "
                  autoComplete="username"
                  required
                  aria-invalid={Boolean(state?.message) || undefined}
                  aria-describedby={state?.message ? "form-error" : undefined}
                  className="peer w-full rounded-2xl border border-gray-200 bg-gray-50 px-10 pt-5 pb-2 text-[15px] outline-none transition-all placeholder:text-transparent  focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-white/10 white:bg-slate-800/60 text-black"
                />
                <label
                  htmlFor="username"
                  className="pointer-events-none absolute left-10 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 dark:text-gray-400"
                >
                  Username
                </label>
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600">
                  <Lock className="size-5" aria-hidden />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  autoComplete="current-password"
                  required
                  className="peer w-full rounded-2xl border border-gray-200 bg-gray-50 px-10 pt-5 pb-2 text-[15px] outline-none transition-all placeholder:text-transparent  focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-white/10 white:bg-slate-800/60 text-black"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-10 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 dark:text-gray-400"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-700 dark:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>

              {/* Helpers */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-white/20 dark:bg-slate-800"
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="font-medium text-blue-600 transition-colors hover:text-purple-600 dark:text-blue-400"
                >
                  Forgot password?
                </a>
              </div>

              <SubmitButton />

              {state?.message && (
                <div
                  id="form-error"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200"
                >
                  {state.message}
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 transition-colors hover:text-purple-600 dark:text-blue-400"
              >
                Sign up
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
