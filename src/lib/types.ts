export type ReportCategory =
  | "lost-found"
  | "maintenance"
  | "study-materials"
  | "recycling";

export type ReportStatus = "pending" | "in-progress" | "resolved" | "rejected";

export type Priority = "low" | "medium" | "high";

export type BinType =
  | "paper"
  | "plastic"
  | "metal"
  | "glass"
  | "organic"
  | "e-waste";

export type NotificationType =
  | "report-update"
  | "lost-found"
  | "system"
  | "material";

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  phone: string;
  initials: string;
  joinYear: string;
}

export interface Report {
  id: string;
  title: string;
  category: ReportCategory;
  status: ReportStatus;
  priority: Priority;
  location: string;
  submittedAt: string;
  description: string;
  reporter: string;
}

export interface LostFoundItem {
  id: string;
  title: string;
  category: string;
  kind: "lost" | "found";
  location: string;
  date: string;
  description: string;
  image: string;
  contact: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  courseCode: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  price: number;
  seller: string;
  department: string;
  image: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface RecyclingPoint {
  id: string;
  name: string;
  address: string;
  hours: string;
  binTypes: BinType[];
  markerX: number;
  markerY: number;
}

export interface CommonIssue {
  id: string;
  label: string;
  count: number;
  location: string;
}
