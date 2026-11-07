"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AuthHeading } from "@/components/layout/AuthLayout";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/Input";

interface FormState {
  fullName: string;
  email: string;
  rollNumber: string;
  password: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  email: "",
  rollNumber: "",
  password: "",
};

export function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "University email is required.";
    else if (!form.email.toLowerCase().endsWith("@neduet.edu.pk"))
      next.email = "Use your NED email (@neduet.edu.pk).";
    if (!form.rollNumber.trim()) next.rollNumber = "Roll number is required.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8)
      next.password = "Use at least 8 characters.";
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => router.push("/verify-email"), 700);
    }, 600);
  }

  return (
    <div>
      <AuthHeading
        title="Create Your Account"
        description="Join NED Campus Connect and be part of a smarter, cleaner and more connected campus."
      />

      {status === "success" ? (
        <Alert tone="success" title="Account created" className="mt-6">
          Redirecting you to email verification…
        </Alert>
      ) : null}

      <form onSubmit={onSubmit} noValidate className="mt-12 space-y-6">
        <FormField
          label="Full Name"
          htmlFor="fullName"
          required
          error={errors.fullName}
          labelClassName="text-[#001a14] font-semibold text-[14px]"
        >
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Enter your full name"
            value={form.fullName}
            invalid={Boolean(errors.fullName)}
            onChange={(event) => update("fullName", event.target.value)}
            className="h-14 rounded-[16px] border-[#d0dcd6] bg-white px-5 text-[16px] text-[#001a14] placeholder:text-[#8aab9a]"
          />
        </FormField>

        <FormField
          label="NED Email Address"
          htmlFor="email"
          required
          error={errors.email}
          labelClassName="text-[#001a14] font-semibold text-[14px]"
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@neduet.edu.pk"
            value={form.email}
            invalid={Boolean(errors.email)}
            onChange={(event) => update("email", event.target.value)}
            className="h-14 rounded-[16px] border-[#d0dcd6] bg-white px-5 text-[16px] text-[#001a14] placeholder:text-[#8aab9a]"
          />
        </FormField>

        <FormField
          label="Roll Number"
          htmlFor="rollNumber"
          required
          error={errors.rollNumber}
          labelClassName="text-[#001a14] font-semibold text-[14px]"
        >
          <Input
            id="rollNumber"
            name="rollNumber"
            placeholder="e.g. SE-21-1042"
            value={form.rollNumber}
            invalid={Boolean(errors.rollNumber)}
            onChange={(event) => update("rollNumber", event.target.value)}
            className="h-14 rounded-[16px] border-[#d0dcd6] bg-white px-5 text-[16px] text-[#001a14] placeholder:text-[#8aab9a]"
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          required
          error={errors.password}
          labelClassName="text-[#001a14] font-semibold text-[14px]"
        >
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              className="h-14 pr-12 rounded-[16px] border-[#d0dcd6] bg-white px-5 text-[16px] text-[#001a14] placeholder:text-[#8aab9a]"
              value={form.password}
              invalid={Boolean(errors.password)}
              onChange={(event) => update("password", event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#5a7d6e] hover:text-[#001a14]"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </FormField>

        <Button
          type="submit"
          size="lg"
          className="h-14 w-full rounded-[16px] bg-[#00402F] text-[16px] font-bold text-white shadow-[0_4px_20px_-4px_rgba(0,64,47,0.35)] hover:bg-[#002a20]"
          loading={status === "submitting"}
          disabled={status === "success"}
        >
          Sign Up
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-[#d0dcd6] text-center">
        <p className="text-[15px] text-[#00402F] font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#00402F] hover:text-[#001a14] hover:underline"
          >
            Login
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
