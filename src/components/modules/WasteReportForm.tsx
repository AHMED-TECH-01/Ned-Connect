"use client";

import { useRef, useState, type FormEvent } from "react";
import { ImagePlus, Recycle, Trash2 } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField, Select, Textarea } from "@/components/ui/Input";
import { binTypeMeta, campusLocations } from "@/lib/mock-data";
import type { BinType } from "@/lib/types";
import { cn } from "@/lib/utils";

const binEntries = Object.entries(binTypeMeta) as [BinType, { label: string; color: string }][];

export function WasteReportForm() {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [location, setLocation] = useState(campusLocations[0]);
  const [binType, setBinType] = useState<BinType>("plastic");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!description.trim()) {
      setError("Tell us what needs to be collected or reported.");
      return;
    }
    if (description.trim().length < 15) {
      setError("Add a little more detail (at least 15 characters).");
      return;
    }
    setError(undefined);
    setSubmitted(true);
    setDescription("");
    setFiles([]);
  }

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="border-b border-line px-5 py-4 sm:px-6">
        <h2 className="text-[15px] font-bold text-ink">Report waste or a full bin</h2>
        <p className="mt-0.5 text-xs text-muted">
          Flag an overflowing bin or request a recycling pickup anywhere on campus.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4 p-5 sm:p-6">
        {submitted ? (
          <Alert tone="success" title="Waste report submitted">
            The campus housekeeping team has been notified. (UI demo — nothing is
            sent to a server.)
          </Alert>
        ) : null}

        <FormField label="Location" htmlFor="waste-location" required>
          <Select
            id="waste-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            {campusLocations.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </FormField>

        <fieldset>
          <legend className="text-[13px] font-semibold text-ink">
            Bin type <span className="text-danger">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {binEntries.map(([key, meta]) => {
              const active = key === binType;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setBinType(key)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors",
                    active
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-line bg-surface text-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                  )}
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full ring-1 ring-white/40"
                    style={{ backgroundColor: meta.color }}
                  />
                  {meta.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <FormField
          label="Details"
          htmlFor="waste-description"
          required
          hint="How full is the bin and how long has it been like this?"
          error={error}
        >
          <Textarea
            id="waste-description"
            value={description}
            invalid={Boolean(error)}
            placeholder="Describe the waste issue…"
            onChange={(event) => {
              setDescription(event.target.value);
              setError(undefined);
              setSubmitted(false);
            }}
          />
        </FormField>

        <div>
          <p className="text-[13px] font-semibold text-ink">
            Photo <span className="font-normal text-muted">(optional)</span>
          </p>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="mt-1.5 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-brand-300 bg-brand-50/60 px-4 py-6 text-center transition-colors hover:border-brand-500 hover:bg-brand-50"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-brand-600 ring-1 ring-brand-200">
              <ImagePlus className="h-5 w-5" />
            </span>
            <span className="text-[13px] font-semibold text-brand-800">
              Click to attach a photo
            </span>
            <span className="text-[11.5px] text-muted">
              PNG or JPG, up to 5 MB. Not uploaded in this UI demo.
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
            <Recycle className="h-4 w-4" />
            Submit waste report
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDescription("");
              setFiles([]);
              setError(undefined);
              setSubmitted(false);
            }}
          >
            Reset form
          </Button>
        </div>
      </form>
    </Card>
  );
}
