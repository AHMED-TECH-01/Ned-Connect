"use client";

import { useMemo, useState } from "react";
import { BellOff, CheckCheck } from "lucide-react";
import { useMockLoading } from "@/hooks/useMockLoading";
import { NotificationItem } from "@/components/modules/NotificationItem";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { SkeletonList } from "@/components/ui/Skeleton";
import { notifications as seedNotifications } from "@/lib/mock-data";
import type { Notification } from "@/lib/types";

const filterOptions = ["All", "Unread", "Report updates", "Lost & found", "System"];

const filterMatch: Record<string, (item: Notification) => boolean> = {
  Unread: (item) => !item.read,
  "Report updates": (item) => item.type === "report-update",
  "Lost & found": (item) => item.type === "lost-found",
  System: (item) => item.type === "system",
};

export function NotificationsBoard() {
  const loading = useMockLoading();
  const [items, setItems] = useState<Notification[]>(seedNotifications);
  const [filter, setFilter] = useState("All");
  const [markedAll, setMarkedAll] = useState(false);

  const unread = items.filter((item) => !item.read).length;

  const filtered = useMemo(() => {
    const predicate = filterMatch[filter];
    return predicate ? items.filter(predicate) : items;
  }, [items, filter]);

  function toggleRead(id: string) {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: !item.read } : item
      )
    );
    setMarkedAll(false);
  }

  function markAllRead() {
    setItems((previous) => previous.map((item) => ({ ...item, read: true })));
    setMarkedAll(true);
  }

  return (
    <div className="space-y-5">
      {markedAll ? (
        <Alert tone="success" title="All notifications marked as read">
          Your unread count is now clear. New activity will appear here again.
        </Alert>
      ) : null}

      <SectionCard
        title="Notifications"
        description="Status changes, item matches and campus announcements"
        action={
          <div className="flex items-center gap-2">
            <Badge tone={unread > 0 ? "warning" : "success"}>
              {unread} unread
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={markAllRead}
              disabled={unread === 0}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          </div>
        }
        bodyClassName="p-0"
      >
        <div className="border-b border-line px-5 py-4 sm:px-6">
          <FilterChips
            label="Filter notifications"
            options={filterOptions}
            value={filter}
            onChange={(value) => {
              setFilter(value);
              setMarkedAll(false);
            }}
          />
        </div>

        {loading ? (
          <SkeletonList count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<BellOff className="h-6 w-6" />}
            title="You're all caught up"
            description="There are no notifications for this filter right now. New report updates and item matches will show up here."
            action={<Button onClick={() => setFilter("All")}>Show all</Button>}
            className="m-5 border-0 bg-transparent sm:m-6"
          />
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((item) => (
              <NotificationItem
                key={item.id}
                notification={item}
                onToggleRead={toggleRead}
              />
            ))}
          </ul>
        )}
      </SectionCard>

      <p className="text-[11.5px] text-muted">
        Notification preferences can be changed from{" "}
        <span className="font-semibold text-ink">Profile &amp; Settings</span>.
      </p>
    </div>
  );
}
