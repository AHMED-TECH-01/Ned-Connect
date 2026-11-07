import type { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { VerifyEmailForm } from "@/components/modules/VerifyEmailForm";

export const metadata: Metadata = { title: "Verify Email" };

export default function VerifyEmailPage() {
  return (
    <AuthLayout variant="centered">
      <VerifyEmailForm />
    </AuthLayout>
  );
}
