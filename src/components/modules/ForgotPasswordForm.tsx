"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthHeading } from "@/components/layout/AuthLayout";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/Input";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(undefined);
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <div className="flex flex-col items-center">
      <AuthHeading
        align="center"
        icon={<Mail className="h-8 w-8" />}
        title="Reset Your Password"
        description="Enter your email address and we'll send you a link to reset your password."
      />

      {status === "sent" ? (
        <Alert tone="success" title="Check your inbox" className="mt-6 w-full">
          We sent a password reset link to <span className="font-bold">{email}</span>.
        </Alert>
      ) : null}

      <form onSubmit={onSubmit} noValidate className="mt-10 w-full space-y-5">
        <FormField
          label="Email Address"
          htmlFor="recoveryEmail"
          error={error}
        >
          <Input
            id="recoveryEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@neduet.edu.pk"
            value={email}
            invalid={Boolean(error)}
            onChange={(event) => {
              setEmail(event.target.value);
              setError(undefined);
              setStatus("idle");
            }}
            className="h-14 rounded-[16px] border-line px-5 text-[16px]"
          />
        </FormField>

        <Button
          type="submit"
          size="lg"
          className="h-14 w-full rounded-[16px] bg-brand-700 text-[16px] font-bold shadow-[0_4px_20px_-4px_rgba(0,64,47,0.25)] hover:bg-brand-800"
          loading={status === "sending"}
          disabled={status === "sent"}
        >
          Send Reset Link
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-line w-full text-center">
        <Link
          href="/login"
          className="text-[14px] font-bold text-brand-700 hover:text-brand-800 hover:underline"
        >
          &larr; Back to Login
        </Link>
      </div>
    </div>
  );
}
