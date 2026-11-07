"use client";

import { useState, type FormEvent } from "react";
import {
  BadgeCheck,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, SectionCard } from "@/components/ui/Card";
import { FormField, Input, Select } from "@/components/ui/Input";
import { ConfirmationDialog } from "@/components/ui/Modal";
import { Switch } from "@/components/ui/Switch";
import { currentStudent, departmentOptions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "account", label: "Account", icon: KeyRound },
  { id: "notifications", label: "Notifications", icon: Mail },
  { id: "privacy", label: "Privacy", icon: Lock },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProfileWorkspace() {
  const [tab, setTab] = useState<TabId>("profile");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: currentStudent.name,
    email: currentStudent.email,
    studentId: currentStudent.studentId,
    department: currentStudent.department,
    phone: currentStudent.phone,
    bio: "Final-year Software Engineering student. Interested in campus sustainability and open-source tooling.",
  });

  const [prefs, setPrefs] = useState({
    reportUpdates: true,
    lostFoundMatches: true,
    newListings: false,
    weeklyDigest: true,
    profileVisibility: true,
    showContact: false,
    twoFactor: false,
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  function toggle(key: keyof typeof prefs) {
    setPrefs((previous) => ({ ...previous, [key]: !previous[key] }));
  }

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Avatar initials={currentStudent.initials} size="xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[19px] font-extrabold tracking-tight text-ink">
              {profile.name}
            </h2>
            <Badge tone="success" icon={<BadgeCheck className="h-3.5 w-3.5" />}>
              Verified student
            </Badge>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            {profile.department} · {profile.studentId}
          </p>
          <p className="mt-0.5 text-[12.5px] text-muted">{profile.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Change photo
          </Button>
          <Button variant="ghost" size="sm">
            Preview public profile
          </Button>
        </div>
      </Card>

      <div
        role="tablist"
        aria-label="Profile sections"
        className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1"
      >
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = id === tab;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-colors",
                isActive
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-line bg-surface text-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.85} />
              {label}
            </button>
          );
        })}
      </div>

      {tab === "profile" ? (
        <Card padded={false} className="overflow-hidden">
          <div className="border-b border-line px-5 py-4 sm:px-6">
            <h2 className="text-[15px] font-bold text-ink">Profile information</h2>
            <p className="mt-0.5 text-xs text-muted">
              Your name and department are shown alongside your reports and
              listings.
            </p>
          </div>
          <form onSubmit={saveProfile} className="space-y-4 p-5 sm:p-6">
            {saved ? (
              <Alert tone="success" title="Profile saved">
                Your profile details were updated. (UI demo — changes are not
                persisted.)
              </Alert>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full name" htmlFor="pf-name" required>
                <Input
                  id="pf-name"
                  value={profile.name}
                  onChange={(event) => {
                    setProfile({ ...profile, name: event.target.value });
                    setSaved(false);
                  }}
                />
              </FormField>
              <FormField label="Student ID" htmlFor="pf-student-id">
                <Input id="pf-student-id" value={profile.studentId} readOnly />
              </FormField>
              <FormField
                label="University email"
                htmlFor="pf-email"
                hint="University email addresses cannot be changed here."
              >
                <Input id="pf-email" value={profile.email} readOnly />
              </FormField>
              <FormField label="Phone number" htmlFor="pf-phone">
                <Input
                  id="pf-phone"
                  value={profile.phone}
                  onChange={(event) => {
                    setProfile({ ...profile, phone: event.target.value });
                    setSaved(false);
                  }}
                />
              </FormField>
              <FormField
                label="Department"
                htmlFor="pf-department"
                className="sm:col-span-2"
              >
                <Select
                  id="pf-department"
                  value={profile.department}
                  onChange={(event) => {
                    setProfile({ ...profile, department: event.target.value });
                    setSaved(false);
                  }}
                >
                  {departmentOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </Select>
              </FormField>
            </div>
            <FormField label="Short bio" htmlFor="pf-bio">
              <textarea
                id="pf-bio"
                value={profile.bio}
                rows={3}
                onChange={(event) => {
                  setProfile({ ...profile, bio: event.target.value });
                  setSaved(false);
                }}
                className="w-full resize-y rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink transition-colors hover:border-brand-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/12"
              />
            </FormField>
            <div className="flex flex-wrap gap-2 border-t border-line pt-4">
              <Button type="submit">Save changes</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setProfile({
                    name: currentStudent.name,
                    email: currentStudent.email,
                    studentId: currentStudent.studentId,
                    department: currentStudent.department,
                    phone: currentStudent.phone,
                    bio: "Final-year Software Engineering student. Interested in campus sustainability and open-source tooling.",
                  });
                  setSaved(false);
                }}
              >
                Discard
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      {tab === "account" ? (
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <SectionCard
            title="Change password"
            description="Use at least 8 characters with a number and a symbol"
          >
            <form
              onSubmit={(event) => event.preventDefault()}
              className="space-y-4"
            >
              <FormField label="Current password" htmlFor="ac-current">
                <Input id="ac-current" type="password" placeholder="••••••••" />
              </FormField>
              <FormField label="New password" htmlFor="ac-new">
                <Input id="ac-new" type="password" placeholder="••••••••" />
              </FormField>
              <FormField label="Confirm new password" htmlFor="ac-confirm">
                <Input id="ac-confirm" type="password" placeholder="••••••••" />
              </FormField>
              <Button type="submit">Update password</Button>
            </form>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard
              title="Security"
              description="Extra protection for your student account"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-ink">
                    Two-factor authentication
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted">
                    Require a one-time code from your phone at every sign-in.
                  </p>
                </div>
                <Switch
                  checked={prefs.twoFactor}
                  onCheckedChange={() => toggle("twoFactor")}
                  label="Enable two-factor authentication"
                />
              </div>
            </SectionCard>

            <Card>
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info-soft text-[#0369a1]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[13.5px] font-bold text-ink">
                    Last sign-in
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-muted">
                    29 October 2026 at 9:14 AM · Karachi, PK
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      {tab === "notifications" ? (
        <SectionCard
          title="Notification preferences"
          description="Choose which campus updates reach you"
        >
          <ul className="divide-y divide-line">
            {(
              [
                {
                  key: "reportUpdates" as const,
                  title: "Report status updates",
                  description:
                    "When a complaint or report you filed changes status.",
                },
                {
                  key: "lostFoundMatches" as const,
                  title: "Lost & found matches",
                  description:
                    "When an item similar to your report is handed in.",
                },
                {
                  key: "newListings" as const,
                  title: "New study material listings",
                  description:
                    "When materials for your courses are listed nearby.",
                },
                {
                  key: "weeklyDigest" as const,
                  title: "Weekly campus digest",
                  description:
                    "A Monday summary of campus activity and recycling stats.",
                },
              ] as const
            ).map((row) => (
              <li
                key={row.key}
                className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-ink">
                    {row.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted">
                    {row.description}
                  </p>
                </div>
                <Switch
                  checked={prefs[row.key]}
                  onCheckedChange={() => toggle(row.key)}
                  label={row.title}
                />
              </li>
            ))}
          </ul>
        </SectionCard>
      ) : null}

      {tab === "privacy" ? (
        <div className="space-y-6">
          <SectionCard
            title="Privacy settings"
            description="Control what other students can see"
          >
            <ul className="divide-y divide-line">
              {(
                [
                  {
                    key: "profileVisibility" as const,
                    title: "Show my profile on the campus directory",
                    description:
                      "Name and department become visible to other students.",
                  },
                  {
                    key: "showContact" as const,
                    title: "Show my contact details on my listings",
                    description:
                      "Phone number appears on lost & found and material listings.",
                  },
                ] as const
              ).map((row) => (
                <li
                  key={row.key}
                  className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-ink">
                      {row.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted">
                      {row.description}
                    </p>
                  </div>
                  <Switch
                    checked={prefs[row.key]}
                    onCheckedChange={() => toggle(row.key)}
                    label={row.title}
                  />
                </li>
              ))}
            </ul>
          </SectionCard>

          <Card className="border-[#fecaca] bg-danger-soft/40">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="flex items-center gap-2 text-[15px] font-bold text-danger">
                  <Trash2 className="h-4 w-4" />
                  Danger zone
                </h2>
                <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-muted">
                  Deleting your account removes your reports, listings and
                  notification history from NED Campus Connect. This action
                  cannot be undone.
                </p>
              </div>
              <Button variant="danger" onClick={() => setDeleteOpen(true)}>
                Delete account
              </Button>
            </div>
          </Card>
        </div>
      ) : null}

      <ConfirmationDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleting(true);
          window.setTimeout(() => {
            setDeleting(false);
            setDeleteOpen(false);
          }, 700);
        }}
        title="Delete your account?"
        description="This permanently removes your profile, reports and listings. This is a UI demonstration — no data is actually deleted."
        confirmLabel="Yes, delete account"
        loading={deleting}
      />
    </div>
  );
}
