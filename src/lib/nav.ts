import {
  Bell,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Recycle,
  SearchCheck,
  Settings,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const dashboardNav: NavSection[] = [
  {
    title: "Campus",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Lost & Found", href: "/lost-found", icon: SearchCheck },
      { label: "Maintenance", href: "/maintenance", icon: Wrench },
      { label: "Study Materials", href: "/study-materials", icon: BookOpen },
      { label: "Recycling", href: "/recycling", icon: Recycle },
    ],
  },
  {
    title: "My activity",
    items: [
      { label: "My Reports", href: "/my-reports", icon: ClipboardList, badge: "8" },
      { label: "Notifications", href: "/notifications", icon: Bell, badge: "3" },
      { label: "Profile & Settings", href: "/profile", icon: Settings },
    ],
  },
  {
    title: "Administration",
    items: [{ label: "Admin Panel", href: "/admin", icon: ShieldCheck }],
  },
];

export const publicNav = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
];
