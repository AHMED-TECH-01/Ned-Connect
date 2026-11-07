import type { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ResetPasswordForm } from "@/components/modules/ResetPasswordForm";

export const metadata: Metadata = { title: "Reset Password" };

export default function ResetPasswordPage() {
  return (
    <AuthLayout variant="centered">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
