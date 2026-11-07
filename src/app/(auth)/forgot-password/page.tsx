import type { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ForgotPasswordForm } from "@/components/modules/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <AuthLayout variant="centered">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
