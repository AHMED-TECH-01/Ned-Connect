"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { StudyMaterialCard } from "@/components/modules/StudyMaterialCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { SearchBar, SortControl } from "@/components/ui/SearchBar";
import { SkeletonCardGrid } from "@/components/ui/Skeleton";
import { materialCategories, studyMaterials } from "@/lib/mock-data";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function StudyMaterialsBoard() {
  const loading = useMockLoading();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const list = studyMaterials.filter((material) => {
      const matchesQuery =
        !search ||
        material.title.toLowerCase().includes(search) ||
        material.courseCode.toLowerCase().includes(search) ||
        material.seller.toLowerCase().includes(search);
      const matchesCategory =
        category === "All" || material.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, category, sort]);

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSort("newest");
  }

  return (
    <div className="space-y-5">
      <div className="rounded-card border border-line bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar
            label="Search study materials"
            value={query}
            onChange={setQuery}
            placeholder="Search by title, course code or seller…"
            className="lg:max-w-md"
          />
          <SortControl
            label="Sort materials"
            value={sort}
            options={sortOptions}
            onChange={setSort}
            className="w-full lg:w-56"
          />
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <FilterChips
            label="Filter by material category"
            options={materialCategories}
            value={category}
            onChange={setCategory}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted">
          <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          listings available
        </p>
        <div className="flex items-center gap-2">
          {query || category !== "All" ? (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear filters
            </Button>
          ) : null}
          <Button variant="outline" size="sm">
            Sell an item
          </Button>
        </div>
      </div>

      {loading ? (
        <SkeletonCardGrid count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<SearchX className="h-6 w-6" />}
          title="No listings found"
          description="Nothing matches this search yet. Try another keyword or list your own material for other students."
          action={<Button onClick={resetFilters}>Clear filters</Button>}
          secondaryAction={
            <Button variant="outline">List study material</Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((material) => (
            <StudyMaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </div>
  );
}
