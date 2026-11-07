import type { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/components/modules/LoginForm";

export const metadata: Metadata = { title: "Log In" };

export default function LoginPage() {
  return (
    <AuthLayout variant="split">
      <LoginForm />
    </AuthLayout>
  );
}
