"use client";

import { useEffect, useRef, useState, type ClipboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { AuthHeading } from "@/components/layout/AuthLayout";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CODE_LENGTH = 6;
const DEMO_CODE = "123456";

export function VerifyEmailForm() {
  const router = useRouter();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length: CODE_LENGTH }, () => "")
  );
  const [status, setStatus] = useState<
    "idle" | "verifying" | "invalid" | "verified"
  >("idle");
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => (value <= 1 ? 0 : value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  const code = digits.join("");
  const complete = code.length === CODE_LENGTH && !digits.includes("");

  function setDigit(index: number, value: string) {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((previous) => {
      const next = [...previous];
      next[index] = clean;
      return next;
    });
    setStatus("idle");
    if (clean && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;
    event.preventDefault();
    const next = Array.from(
      { length: CODE_LENGTH },
      (_, index) => pasted[index] ?? ""
    );
    setDigits(next);
    setStatus("idle");
    inputs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  }

  function verify() {
    if (!complete) return;
    setStatus("verifying");
    window.setTimeout(() => {
      if (code === DEMO_CODE) {
        setStatus("verified");
        window.setTimeout(() => router.push("/dashboard"), 700);
      } else {
        setStatus("invalid");
      }
    }, 700);
  }

  return (
    <div className="flex flex-col items-center">
      <AuthHeading
        align="center"
        icon={<Mail className="h-8 w-8" />}
        title="Verify Your Email Address"
        description="We've sent a 6-digit verification code to ahmed@ned.edu.pk"
      />

      {status === "verified" ? (
        <Alert tone="success" title="Email verified" className="mt-6 w-full">
          Taking you to your dashboard…
        </Alert>
      ) : null}

      {status === "invalid" ? (
        <Alert tone="error" title="Invalid code" className="mt-6 w-full">
          Check the digits and try again, or request a new code.
        </Alert>
      ) : null}

      <div className="mt-12 flex justify-center gap-3 sm:gap-4">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={`Digit ${index + 1}`}
            maxLength={1}
            value={digit}
            onChange={(event) => setDigit(index, event.target.value)}
            onPaste={onPaste}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digits[index] && index > 0) {
                inputs.current[index - 1]?.focus();
              }
            }}
            className={cn(
              "h-18 w-14 rounded-[16px] border-2 text-center text-[26px] font-black text-ink transition-all focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 sm:h-20 sm:w-16",
              status === "invalid"
                ? "border-danger bg-danger-soft/10"
                : digit
                  ? "border-brand-500 bg-brand-50/20"
                  : "border-line bg-page"
            )}
          />
        ))}
      </div>

      <Button
        size="lg"
        className="mt-10 h-14 w-full rounded-[16px] bg-brand-700 text-[16px] font-bold shadow-[0_4px_20px_-4px_rgba(0,64,47,0.25)] hover:bg-brand-800"
        onClick={verify}
        disabled={!complete || status === "verified"}
        loading={status === "verifying"}
      >
        Verify
      </Button>

      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="text-[14px] font-medium text-muted">
          {seconds > 0 ? (
            <>
              Resend code in <span className="font-bold text-ink">00:{String(seconds).padStart(2, "0")}</span>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSeconds(45);
                setStatus("idle");
              }}
              className="font-bold text-brand-700 hover:text-brand-800"
            >
              Resend code
            </button>
          )}
        </p>

        <Link
          href="/signup"
          className="text-[14px] font-bold text-brand-700 hover:text-brand-800 hover:underline"
        >
          Change email address
        </Link>
      </div>
    </div>
  );
}
