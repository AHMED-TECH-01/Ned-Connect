"use client";

import { useMemo, useState, type FormEvent } from "react";
import { PackagePlus, SearchX } from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { LostFoundCard } from "@/components/modules/LostFoundCard";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { FormField, Input, Select, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { SearchBar } from "@/components/ui/SearchBar";
import { SkeletonCardGrid } from "@/components/ui/Skeleton";
import { campusLocations, lostFoundCategories, lostFoundItems } from "@/lib/mock-data";
import type { LostFoundItem } from "@/lib/types";

const kindOptions = ["All items", "Lost", "Found"];

export function LostFoundBoard() {
  const loading = useMockLoading();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [kind, setKind] = useState("All items");
  const [items, setItems] = useState<LostFoundItem[]>(lostFoundItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [posted, setPosted] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    category: "Electronics",
    location: campusLocations[0],
    description: "",
  });
  const [formError, setFormError] = useState<string | undefined>();

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.location.toLowerCase().includes(search);
      const matchesCategory =
        category === "All" || item.category === category;
      const matchesKind =
        kind === "All items" || item.kind === kind.toLowerCase();
      return matchesQuery && matchesCategory && matchesKind;
    });
  }, [items, query, category, kind]);

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setKind("All items");
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newItem.title.trim() || !newItem.description.trim()) {
      setFormError("A title and description are required.");
      return;
    }
    setFormError(undefined);
    const created: LostFoundItem = {
      id: `LF-${Math.floor(Math.random() * 400 + 320)}`,
      title: newItem.title,
      category: newItem.category,
      kind: "lost",
      location: newItem.location,
      date: "2026-10-29",
      description: newItem.description,
      image: lostFoundItems[0].image,
      contact: "Ahmed Raza",
    };
    setItems((previous) => [created, ...previous]);
    setDialogOpen(false);
    setPosted(true);
    setNewItem({
      title: "",
      category: "Electronics",
      location: campusLocations[0],
      description: "",
    });
  }

  return (
    <div className="space-y-5">
      {posted ? (
        <Alert tone="success" title="Lost item reported">
          Your item was added to the board as a new reported item. You can track it
          from My Reports.
        </Alert>
      ) : null}

      <div className="rounded-card border border-line bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar
            label="Search lost and found items"
            value={query}
            onChange={setQuery}
            placeholder="Search by item, location or description…"
            className="lg:max-w-md"
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterChips
              label="Filter by item status"
              options={kindOptions}
              value={kind}
              onChange={setKind}
            />
            <Button onClick={() => setDialogOpen(true)}>
              <PackagePlus className="h-4 w-4" />
              Report item
            </Button>
          </div>
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <FilterChips
            label="Filter by category"
            options={lostFoundCategories}
            value={category}
            onChange={setCategory}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] text-muted">
          Showing{" "}
          <span className="font-semibold text-ink">{filtered.length}</span> of{" "}
          {items.length} items
        </p>
        {query || category !== "All" || kind !== "All items" ? (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Clear filters
          </Button>
        ) : null}
      </div>

      {loading ? (
        <SkeletonCardGrid count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<SearchX className="h-6 w-6" />}
          title="No items match your search"
          description="Try a different keyword, or clear the filters to see every item currently on the board."
          action={<Button onClick={resetFilters}>Clear filters</Button>}
          secondaryAction={
            <Button variant="outline" onClick={() => setDialogOpen(true)}>
              Report an item
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <LostFoundCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <Modal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Report a lost item"
        description="Give as much detail as possible so the finder can identify it."
        footer={
          <>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="lost-found-form">
              Submit report
            </Button>
          </>
        }
      >
        <form id="lost-found-form" onSubmit={submitReport} className="space-y-4">
          {formError ? <Alert tone="error">{formError}</Alert> : null}
          <FormField label="Item title" htmlFor="lf-title" required>
            <Input
              id="lf-title"
              value={newItem.title}
              placeholder="e.g. Black backpack with laptop sleeve"
              onChange={(event) =>
                setNewItem({ ...newItem, title: event.target.value })
              }
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Category" htmlFor="lf-category">
              <Select
                id="lf-category"
                value={newItem.category}
                onChange={(event) =>
                  setNewItem({ ...newItem, category: event.target.value })
                }
              >
                {lostFoundCategories
                  .filter((option) => option !== "All")
                  .map((option) => (
                    <option key={option}>{option}</option>
                  ))}
              </Select>
            </FormField>
            <FormField label="Last seen at" htmlFor="lf-location">
              <Select
                id="lf-location"
                value={newItem.location}
                onChange={(event) =>
                  setNewItem({ ...newItem, location: event.target.value })
                }
              >
                {campusLocations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </Select>
            </FormField>
          </div>
          <FormField
            label="Description"
            htmlFor="lf-description"
            required
            hint="Colour, brand, distinguishing marks and when you last had it."
          >
            <Textarea
              id="lf-description"
              value={newItem.description}
              placeholder="Describe the item…"
              onChange={(event) =>
                setNewItem({ ...newItem, description: event.target.value })
              }
            />
          </FormField>
        </form>
      </Modal>
    </div>
  );
}
