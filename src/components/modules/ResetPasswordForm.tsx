"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { AuthHeading } from "@/components/layout/AuthLayout";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/Input";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirm?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { password?: string; confirm?: string } = {};
    if (password.length < 8)
      next.password = "Password must be at least 8 characters.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("saving");
    window.setTimeout(() => setStatus("done"), 700);
  }

  return (
    <div className="flex flex-col items-center">
      <AuthHeading
        align="center"
        icon={<Lock className="h-8 w-8" />}
        title="Create New Password"
        description="Your new password must be at least 8 characters and include a number."
      />

      {status === "done" ? (
        <Alert tone="success" title="Password reset successful" className="mt-6 w-full">
          Your password has been updated. You can now log in with your new password.
        </Alert>
      ) : null}

      <form onSubmit={onSubmit} noValidate className="mt-10 w-full space-y-5">
        <FormField
          label="New Password"
          htmlFor="newPassword"
          error={errors.password}
        >
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password"
            value={password}
            invalid={Boolean(errors.password)}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrors((previous) => ({ ...previous, password: undefined }));
              setStatus("idle");
            }}
            className="h-14 rounded-[16px] border-line px-5 text-[16px]"
          />
        </FormField>

        <FormField
          label="Confirm Password"
          htmlFor="confirmNewPassword"
          error={errors.confirm}
        >
          <Input
            id="confirmNewPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm new password"
            value={confirm}
            invalid={Boolean(errors.confirm)}
            onChange={(event) => {
              setConfirm(event.target.value);
              setErrors((previous) => ({ ...previous, confirm: undefined }));
              setStatus("idle");
            }}
            className="h-14 rounded-[16px] border-line px-5 text-[16px]"
          />
        </FormField>

        <Button
          type="submit"
          size="lg"
          className="h-14 w-full rounded-[16px] bg-brand-700 text-[16px] font-bold shadow-[0_4px_20px_-4px_rgba(0,64,47,0.25)] hover:bg-brand-800"
          loading={status === "saving"}
          disabled={status === "done"}
        >
          Reset Password
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
