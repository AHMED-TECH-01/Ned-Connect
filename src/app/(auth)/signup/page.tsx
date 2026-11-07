import type { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { SignUpForm } from "@/components/modules/SignUpForm";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignUpPage() {
  return (
    <AuthLayout variant="split">
      <SignUpForm />
    </AuthLayout>
  );
}
