"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ImagePlus, Send, Trash2 } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField, Select, Textarea } from "@/components/ui/Input";
import { campusLocations, issueTypes } from "@/lib/mock-data";

export interface ComplaintFormProps {
  onSubmitted?: (payload: { title: string; location: string }) => void;
  prefillIssue?: string;
}

const priorities = ["Low", "Medium", "High"];

export function ComplaintForm({ onSubmitted, prefillIssue }: ComplaintFormProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [issueType, setIssueType] = useState(issueTypes[0]);
  const [location, setLocation] = useState(campusLocations[0]);
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!prefillIssue) return;
    setIssueType(prefillIssue);
    setSubmitted(false);
  }, [prefillIssue]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { title?: string; description?: string } = {};
    if (!description.trim())
      next.description = "Describe the problem so the team can act on it.";
    else if (description.trim().length < 20)
      next.description = "Add a little more detail (at least 20 characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmitted?.({ title: description.trim().slice(0, 60), location });
    setSubmitted(true);
    setDescription("");
    setFiles([]);
    setPriority("Medium");
  }

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="border-b border-line px-5 py-4 sm:px-6">
        <h2 className="text-[15px] font-bold text-ink">Submit a complaint</h2>
        <p className="mt-0.5 text-xs text-muted">
          Your complaint receives a report ID and appears in My Reports
          immediately.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4 p-5 sm:p-6">
        {submitted ? (
          <Alert tone="success" title="Complaint submitted">
            The maintenance team has been notified. Track progress from My
            Reports. (UI demo — nothing is sent to a server.)
          </Alert>
        ) : null}

        <FormField label="Issue type" htmlFor="issueType" required>
          <Select
            id="issueType"
            value={issueType}
            onChange={(event) => setIssueType(event.target.value)}
          >
            {issueTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Location" htmlFor="issueLocation" required>
            <Select
              id="issueLocation"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {campusLocations.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Priority" htmlFor="issuePriority" required>
            <Select
              id="issuePriority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              {priorities.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField
          label="Description"
          htmlFor="issueDescription"
          required
          hint="Room number, how long it has been like this and any safety risk."
          error={errors.description}
        >
          <Textarea
            id="issueDescription"
            value={description}
            invalid={Boolean(errors.description)}
            placeholder="Describe the issue in detail…"
            onChange={(event) => {
              setDescription(event.target.value);
              setErrors((previous) => ({ ...previous, description: undefined }));
              setSubmitted(false);
            }}
          />
        </FormField>

        <div>
          <p className="text-[13px] font-semibold text-ink">
            Photos <span className="font-normal text-muted">(optional)</span>
          </p>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="mt-1.5 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-brand-300 bg-brand-50/60 px-4 py-7 text-center transition-colors hover:border-brand-500 hover:bg-brand-50"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-brand-600 ring-1 ring-brand-200">
              <ImagePlus className="h-5 w-5" />
            </span>
            <span className="text-[13px] font-semibold text-brand-800">
              Click to attach a photo
            </span>
            <span className="text-[11.5px] text-muted">
              PNG or JPG, up to 5 MB. Photos are not uploaded in this UI demo.
            </span>
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            aria-label="Attach photos"
            onChange={(event) => {
              const names = Array.from(event.target.files ?? []).map(
                (file) => file.name
              );
              setFiles((previous) => [...previous, ...names]);
            }}
          />
          {files.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line bg-page px-3.5 py-2.5 text-[12.5px]"
                >
                  <span className="truncate text-ink">{file}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${file}`}
                    onClick={() =>
                      setFiles((previous) =>
                        previous.filter((_, position) => position !== index)
                      )
                    }
                    className="rounded-md p-1.5 text-muted transition-colors hover:bg-danger-soft hover:text-danger"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <Button type="submit">
            <Send className="h-4 w-4" />
            Submit complaint
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDescription("");
              setFiles([]);
              setErrors({});
              setSubmitted(false);
            }}
          >
            Reset form
          </Button>
        </div>
        <p className="text-[11.5px] text-muted">
          Submitted complaints are visible to campus administration only.
        </p>
      </form>
    </Card>
  );
}
