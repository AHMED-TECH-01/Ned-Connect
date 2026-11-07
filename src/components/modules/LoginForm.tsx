"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AuthHeading } from "@/components/layout/AuthLayout";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Switch";
import { FormField, Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "failed">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Email is required.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => {
      if (password.length < 8) {
        setStatus("failed");
        return;
      }
      router.push("/dashboard");
    }, 700);
  }

  return (
    <div>
      <AuthHeading
        title="Welcome Back"
        description="Login to your account to continue."
      />

      {status === "failed" ? (
        <Alert tone="error" title="Unable to sign you in" className="mt-6">
          The email or password you entered is incorrect. Try again or reset your
          password.
        </Alert>
      ) : null}

      <form onSubmit={onSubmit} noValidate className="mt-12 space-y-6">
        <FormField
          label="Email Address"
          htmlFor="loginEmail"
          required
          error={errors.email}
          labelClassName="text-[#001a14] font-semibold text-[14px]"
        >
          <Input
            id="loginEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@neduet.edu.pk"
            value={email}
            invalid={Boolean(errors.email)}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((previous) => ({ ...previous, email: undefined }));
              setStatus("idle");
            }}
            className="h-14 rounded-[16px] border-[#d0dcd6] bg-white px-5 text-[16px] text-[#001a14] placeholder:text-[#8aab9a]"
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="loginPassword"
          required
          error={errors.password}
          labelClassName="text-[#001a14] font-semibold text-[14px]"
        >
          <div className="relative">
            <Input
              id="loginPassword"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="h-14 pr-12 rounded-[16px] border-[#d0dcd6] bg-white px-5 text-[16px] text-[#001a14] placeholder:text-[#8aab9a]"
              value={password}
              invalid={Boolean(errors.password)}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((previous) => ({ ...previous, password: undefined }));
                setStatus("idle");
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#5a7d6e] hover:text-[#001a14]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </FormField>

        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <label className="flex items-center gap-2.5 text-[14px] font-medium text-[#00402F] cursor-pointer">
            <Checkbox
              id="remember"
              label="Remember me"
              checked={remember}
              onCheckedChange={setRemember}
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-[14px] font-bold text-[#00402F] hover:text-[#001a14] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-14 w-full rounded-[16px] bg-[#00402F] text-[16px] font-bold text-white shadow-[0_4px_20px_-4px_rgba(0,64,47,0.35)] hover:bg-[#002a20]"
          loading={status === "submitting"}
        >
          Login
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-[#d0dcd6] text-center">
        <p className="text-[15px] text-[#00402F] font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#00402F] hover:text-[#001a14] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-[14px] font-bold text-[#5a7d6e] hover:text-[#001a14] transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
