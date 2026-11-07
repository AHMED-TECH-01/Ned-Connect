"use client";

import {
  Bell,
  BookOpen,
  ClipboardList,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/lib/types";

const typeMeta: Record<
  NotificationType,
  { label: string; icon: LucideIcon; tile: string }
> = {
  "report-update": {
    label: "Report update",
    icon: ClipboardList,
    tile: "bg-info-soft text-[#0369a1]",
  },
  "lost-found": {
    label: "Lost & found",
    icon: SearchCheck,
    tile: "bg-warning-soft text-[#b45309]",
  },
  material: {
    label: "Study material",
    icon: BookOpen,
    tile: "bg-brand-100 text-brand-700",
  },
  system: {
    label: "System",
    icon: Bell,
    tile: "bg-success-soft text-[#15803d]",
  },
};

export interface NotificationItemProps {
  notification: Notification;
  onToggleRead: (id: string) => void;
}

export function NotificationItem({
  notification,
  onToggleRead,
}: NotificationItemProps) {
  const meta = typeMeta[notification.type];
  const Icon = meta.icon;

  return (
    <li
      className={cn(
        "relative flex items-start gap-4 px-5 py-4 transition-colors hover:bg-brand-50/60 sm:px-6",
        !notification.read && "bg-brand-50/40"
      )}
    >
      {!notification.read ? (
        <span
          aria-label="Unread"
          className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-600"
        />
      ) : null}

      <span
        className={cn(
          "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          meta.tile
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.85} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={cn(
              "text-[14px] text-ink",
              notification.read ? "font-medium" : "font-bold"
            )}
          >
            {notification.title}
          </p>
          <span className="rounded-full bg-page px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-muted">
            {meta.label}
          </span>
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
          {notification.description}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="whitespace-nowrap text-[11.5px] text-muted">
          {notification.time}
        </span>
        <button
          type="button"
          onClick={() => onToggleRead(notification.id)}
          className="text-[11.5px] font-semibold text-brand-700 hover:underline"
        >
          {notification.read ? "Mark unread" : "Mark read"}
        </button>
      </div>
    </li>
  );
}
