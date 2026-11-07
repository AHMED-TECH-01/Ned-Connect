import type {
  BinType,
  CommonIssue,
  LostFoundItem,
  Notification,
  RecyclingPoint,
  Report,
  ReportCategory,
  ReportStatus,
  Student,
  StudyMaterial,
} from "@/lib/types";

// Inline SVG data URIs for instant image display (no generation delay)
export const heroImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e8f0ea'/%3E%3Crect x='0' y='450' width='800' height='150' fill='%23d0e0d8'/%3E%3Cg transform='translate(60,60)'%3E%3Crect x='50' y='200' width='600' height='280' rx='6' fill='%23c8dcd0' stroke='%2300402f' stroke-width='4'/%3E%3Crect x='80' y='260' width='80' height='100' rx='4' fill='%23b0c8b8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='80' y='260' width='80' height='40' rx='0' fill='%23a0b8a8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='200' y='260' width='80' height='100' rx='4' fill='%23b0c8b8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='200' y='260' width='80' height='40' rx='0' fill='%23a0b8a8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='320' y='260' width='80' height='100' rx='4' fill='%23b0c8b8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='320' y='260' width='80' height='40' rx='0' fill='%23a0b8a8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='440' y='260' width='80' height='100' rx='4' fill='%23b0c8b8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='440' y='260' width='80' height='40' rx='0' fill='%23a0b8a8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='560' y='260' width='80' height='100' rx='4' fill='%23b0c8b8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='560' y='260' width='80' height='40' rx='0' fill='%23a0b8a8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='240' y='100' width='220' height='160' rx='6' fill='%23b8d0c0' stroke='%2300402f' stroke-width='4'/%3E%3Cellipse cx='350' cy='100' rx='110' ry='50' fill='%23c0d8cc' stroke='%2300402f' stroke-width='4'/%3E%3Crect x='300' y='60' width='100' height='80' rx='4' fill='%23d0e8dc' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='320' y='35' width='60' height='40' rx='4' fill='%23d8ecd8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='100' y='360' width='100' height='120' rx='4' fill='%23b0c8b8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='130' y='390' width='40' height='60' rx='3' fill='%23c0d8c8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='500' y='360' width='100' height='120' rx='4' fill='%23b0c8b8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='530' y='390' width='40' height='60' rx='3' fill='%23c0d8c8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='300' y='300' width='100' height='180' rx='4' fill='%23a8c0b0' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='325' y='340' width='50' height='80' rx='3' fill='%23c0d8c8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='335' y='315' width='30' height='20' rx='2' fill='%23d0e8dc' stroke='%2300402f' stroke-width='1'/%3E%3Crect x='0' y='480' width='700' height='10' rx='3' fill='%23b8d0c0' stroke='%2300402f' stroke-width='2'/%3E%3C/g%3E%3Ctext x='400' y='560' font-family='sans-serif' font-size='28' font-weight='bold' fill='%2300402f' text-anchor='middle'%3ENED University of Engineering %26 Technology%3C/text%3E%3C/svg%3E";

export const authIllustration =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f1f8f5'/%3E%3Crect x='0' y='310' width='600' height='90' fill='%23d8ecd8'/%3E%3Cg transform='translate(30,20)'%3E%3Crect x='40' y='140' width='480' height='180' rx='6' fill='%23d8ecd8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='70' y='190' width='70' height='80' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='70' y='190' width='70' height='30' rx='0' fill='%23b8d8c0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='165' y='190' width='70' height='80' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='165' y='190' width='70' height='30' rx='0' fill='%23b8d8c0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='260' y='190' width='70' height='80' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='260' y='190' width='70' height='30' rx='0' fill='%23b8d8c0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='355' y='190' width='70' height='80' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='355' y='190' width='70' height='30' rx='0' fill='%23b8d8c0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='450' y='190' width='50' height='80' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='450' y='190' width='50' height='30' rx='0' fill='%23b8d8c0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='180' y='60' width='200' height='130' rx='6' fill='%23c8e0d0' stroke='%2300402f' stroke-width='3'/%3E%3Cellipse cx='280' cy='60' rx='100' ry='40' fill='%23d8ecd8' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='250' y='30' width='60' height='60' rx='3' fill='%23e0f0e6' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='265' y='10' width='30' height='30' rx='3' fill='%23e8f5ee' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='70' y='280' width='100' height='60' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='390' y='280' width='100' height='60' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='220' y='220' width='160' height='100' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='250' y='250' width='100' height='50' rx='3' fill='%23d8ecd8' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='280' y='230' width='40' height='20' rx='2' fill='%23e0f0e6' stroke='%2300402f' stroke-width='1'/%3E%3Crect x='0' y='320' width='520' height='10' rx='3' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E";

export const emptyIllustration =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f1f8f5'/%3E%3Crect x='80' y='120' width='240' height='180' rx='12' fill='none' stroke='%23c8e0d0' stroke-width='6'/%3E%3Crect x='100' y='140' width='200' height='140' rx='8' fill='%23e0f0e6' stroke='%2300402f' stroke-width='3'/%3E%3Cline x1='130' y1='180' x2='270' y2='180' stroke='%23a0c8b0' stroke-width='4' stroke-linecap='round'/%3E%3Cline x1='130' y1='200' x2='240' y2='200' stroke='%23a0c8b0' stroke-width='4' stroke-linecap='round'/%3E%3Cline x1='130' y1='220' x2='220' y2='220' stroke='%23a0c8b0' stroke-width='4' stroke-linecap='round'/%3E%3Ccircle cx='300' cy='100' r='60' fill='%23d8ecd8' stroke='%2300402f' stroke-width='4'/%3E%3Cline x1='340' y1='140' x2='380' y2='180' stroke='%2300402f' stroke-width='6' stroke-linecap='round'/%3E%3Ccircle cx='380' cy='180' r='8' fill='%2300402f'/%3E%3Ctext x='200' y='360' font-family='sans-serif' font-size='20' font-weight='bold' fill='%2300402f' text-anchor='middle'%3ENothing here yet%3C/text%3E%3C/svg%3E";

export const BRAND = {
  name: "NED Campus Connect",
  tagline: "Together for a Better Campus",
  university: "NED University of Engineering & Technology",
  city: "Karachi",
  logo: "/ned-logo.png",
};

export const currentStudent: Student = {
  id: "std-1042",
  name: "Ahmed Raza",
  email: "ahmed.raza@neduet.edu.pk",
  studentId: "SE-21-1042",
  department: "Software Engineering",
  phone: "+92 300 1234567",
  initials: "AR",
  joinYear: "2021",
};

export const statusMeta: Record<
  ReportStatus,
  { label: string; tone: "warning" | "info" | "success" | "danger" }
> = {
  pending: { label: "Pending", tone: "warning" },
  "in-progress": { label: "In Progress", tone: "info" },
  resolved: { label: "Resolved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
};

export const categoryMeta: Record<
  ReportCategory,
  { label: string; short: string }
> = {
  "lost-found": { label: "Lost & Found", short: "Lost & Found" },
  maintenance: { label: "Maintenance", short: "Maintenance" },
  "study-materials": { label: "Study Materials", short: "Materials" },
  recycling: { label: "Recycling", short: "Recycling" },
};

export const binTypeMeta: Record<BinType, { label: string; color: string }> = {
  paper: { label: "Paper", color: "#0284c7" },
  plastic: { label: "Plastic", color: "#f59e0b" },
  metal: { label: "Metal", color: "#6b7c74" },
  glass: { label: "Glass", color: "#0ea5e9" },
  organic: { label: "Organic", color: "#16a34a" },
  "e-waste": { label: "E-Waste", color: "#dc2626" },
};

export const reports: Report[] = [
  {
    id: "RPT-2418",
    title: "Broken ceiling fan in Classroom C-204",
    category: "maintenance",
    status: "in-progress",
    priority: "high",
    location: "Main Academic Block, Room C-204",
    submittedAt: "2026-10-24",
    description:
      "The ceiling fan regulator sparks when switched on and the fan does not rotate. Classroom has 40 students.",
    reporter: "Ahmed Raza",
  },
  {
    id: "RPT-2411",
    title: "Overflowing recycling bin near cafeteria",
    category: "recycling",
    status: "pending",
    priority: "medium",
    location: "Cafeteria Back Entrance",
    submittedAt: "2026-10-23",
    description:
      "Plastic waste bin has not been emptied for four days and is overflowing onto the walkway.",
    reporter: "Ahmed Raza",
  },
  {
    id: "RPT-2394",
    title: "Found: Black wireless earbuds case",
    category: "lost-found",
    status: "resolved",
    priority: "low",
    location: "Library, 2nd Floor Reading Hall",
    submittedAt: "2026-10-19",
    description:
      "Found a black earbuds charging case on table 12. Handed over to the library front desk.",
    reporter: "Ahmed Raza",
  },
  {
    id: "RPT-2387",
    title: "Water leakage in CS Department washroom",
    category: "maintenance",
    status: "resolved",
    priority: "high",
    location: "Computer Science Building, Ground Floor",
    submittedAt: "2026-10-16",
    description:
      "Continuous water leakage from the pipeline behind the second washbasin causing slippery floor.",
    reporter: "Ahmed Raza",
  },
  {
    id: "RPT-2372",
    title: "Lost student ID card near Sports Complex",
    category: "lost-found",
    status: "pending",
    priority: "medium",
    location: "Sports Complex Gate",
    submittedAt: "2026-10-14",
    description:
      "Lost my student ID card with a blue lanyard somewhere between the sports complex and the engineering block.",
    reporter: "Ahmed Raza",
  },
  {
    id: "RPT-2350",
    title: "E-waste collection request for lab",
    category: "recycling",
    status: "rejected",
    priority: "low",
    location: "Electronics Lab, Block B",
    submittedAt: "2026-10-09",
    description:
      "Requesting pickup of 6 non-functional oscilloscopes and assorted circuit boards.",
    reporter: "Ahmed Raza",
  },
  {
    id: "RPT-2331",
    title: "Projector not displaying in Lecture Hall 3",
    category: "maintenance",
    status: "in-progress",
    priority: "medium",
    location: "Lecture Hall 3",
    submittedAt: "2026-10-05",
    description:
      "The projector powers on but shows no signal on HDMI-2. Tried switching cables already.",
    reporter: "Ahmed Raza",
  },
  {
    id: "RPT-2308",
    title: "Suggestion: add a paper recycling point in Block A",
    category: "recycling",
    status: "resolved",
    priority: "low",
    location: "Block A, First Floor Corridor",
    submittedAt: "2026-09-28",
    description:
      "Most departments in Block A dispose of large amounts of printed paper. A dedicated bin would help.",
    reporter: "Ahmed Raza",
  },
];

export const adminReports: Report[] = [
  ...reports,
  {
    id: "RPT-2425",
    title: "Broken bench in the courtyard",
    category: "maintenance",
    status: "pending",
    priority: "low",
    location: "Central Courtyard",
    submittedAt: "2026-10-25",
    description: "Two wooden planks of the bench are cracked and unsafe to sit on.",
    reporter: "Fatima Khan",
  },
  {
    id: "RPT-2421",
    title: "Found: Casio FX-991 calculator",
    category: "lost-found",
    status: "in-progress",
    priority: "low",
    location: "Exam Hall 1",
    submittedAt: "2026-10-25",
    description: "Found a scientific calculator with a name sticker reading 'Bilal'.",
    reporter: "Usman Tariq",
  },
  {
    id: "RPT-2416",
    title: "Metal bins not collected for two weeks",
    category: "recycling",
    status: "pending",
    priority: "high",
    location: "Hostel Block D",
    submittedAt: "2026-10-24",
    description: "Metal and glass bins at the hostel entrance are full and attracting insects.",
    reporter: "Sana Malik",
  },
  {
    id: "RPT-2402",
    title: "Request to repair corridor lights",
    category: "maintenance",
    status: "resolved",
    priority: "medium",
    location: "Civil Engineering Block, 2nd Floor",
    submittedAt: "2026-10-21",
    description: "Four ceiling lights in the corridor are dead, making the corridor dark after 6 PM.",
    reporter: "Hamza Sheikh",
  },
  {
    id: "RPT-2399",
    title: "Lost: Silver water bottle near gym",
    category: "lost-found",
    status: "resolved",
    priority: "low",
    location: "Gymnasium Entrance",
    submittedAt: "2026-10-20",
    description: "350ml silver steel bottle with a dented cap. Owner can collect from security desk.",
    reporter: "Ayesha Noor",
  },
];

export const lostFoundItems: LostFoundItem[] = [
  {
    id: "LF-318",
    title: "Black Wireless Earbuds Case",
    category: "Electronics",
    kind: "found",
    location: "Library, 2nd Floor",
    date: "2026-10-19",
    description:
      "Charging case only, black matte finish. Handed over to the library front desk.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Cellipse cx='200' cy='200' rx='140' ry='110' fill='%23333' stroke='%23222' stroke-width='3'/%3E%3Cellipse cx='200' cy='200' rx='120' ry='90' fill='%23222'/%3E%3Crect x='165' y='280' width='70' height='30' rx='8' fill='%23222' stroke='%23222' stroke-width='2'/%3E%3Ccircle cx='200' cy='170' r='18' fill='%23333' stroke='%23333' stroke-width='2'/%3E%3Ccircle cx='200' cy='170' r='8' fill='%23444'/%3E%3C/svg%3E",
    contact: "Library Front Desk",
  },
  {
    id: "LF-315",
    title: "Student ID Card — SE-21-1042",
    category: "ID Cards",
    kind: "lost",
    location: "Sports Complex Gate",
    date: "2026-10-14",
    description:
      "Blue lanyard attached. Please drop at the Student Affairs office if found.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Crect x='100' y='120' width='200' height='130' rx='10' fill='%23e0f0e6' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='120' y='140' width='60' height='70' rx='6' fill='%23c8e0d0' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='195' y='150' width='85' height='8' rx='3' fill='%23a0c8b0'/%3E%3Crect x='195' y='165' width='60' height='6' rx='3' fill='%23a0c8b0'/%3E%3Crect x='195' y='180' width='70' height='6' rx='3' fill='%23a0c8b0'/%3E%3Crect x='175' y='270' width='50' height='120' rx='4' fill='%232b8fdb' stroke='%232b8fdb' stroke-width='2'/%3E%3Ccircle cx='200' cy='360' r='10' fill='%232b8fdb'/%3E%3C/svg%3E",
    contact: "Ahmed Raza",
  },
  {
    id: "LF-311",
    title: "Casio FX-991 Scientific Calculator",
    category: "Electronics",
    kind: "found",
    location: "Exam Hall 1",
    date: "2026-10-25",
    description: "Name sticker reads 'Bilal'. Kept with the exam controller office.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Crect x='80' y='120' width='240' height='150' rx='12' fill='%231a2c1a' stroke='%2300402f' stroke-width='3'/%3E%3Crect x='95' y='135' width='210' height='50' rx='6' fill='%238fc98f' stroke='%2300402f' stroke-width='2'/%3E%3Crect x='95' y='195' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='135' y='195' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='175' y='195' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='215' y='195' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='255' y='195' width='50' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='95' y='220' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='135' y='220' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='175' y='220' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='215' y='220' width='35' height='20' rx='3' fill='%23c8e0d0'/%3E%3Crect x='255' y='220' width='50' height='20' rx='3' fill='%23c8e0d0'/%3E%3Ctext x='200' y='280' font-family='monospace' font-size='12' fill='%23c8e0d0' text-anchor='middle'%3ECASIO%3C/text%3E%3Ctext x='200' y='295' font-family='monospace' font-size='10' fill='%23c8e0d0' text-anchor='middle'%3EFX-991EX%3C/text%3E%3C/svg%3E",
    contact: "Exam Controller Office",
  },
  {
    id: "LF-306",
    title: "Brown Leather Wallet",
    category: "Accessories",
    kind: "lost",
    location: "Cafeteria",
    date: "2026-10-11",
    description:
      "Contains a library card and a bus pass. Reward offered for return.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Crect x='100' y='130' width='200' height='130' rx='14' fill='%238B5A2B' stroke='%235C3317' stroke-width='3'/%3E%3Crect x='100' y='130' width='200' height='35' rx='14' fill='%237A4422' stroke='%235C3317' stroke-width='3'/%3E%3Crect x='180' y='145' width='40' height='20' rx='4' fill='%23C19A6B' stroke='%235C3317' stroke-width='2'/%3E%3Crect x='105' y='170' width='190' height='85' rx='4' fill='%237A4422' stroke='%235C3317' stroke-width='2'/%3E%3Cline x1='200' y1='170' x2='200' y2='255' stroke='%235C3317' stroke-width='2'/%3E%3C/svg%3E",
    contact: "Zainab Ali",
  },
  {
    id: "LF-302",
    title: "Data Structures Textbook (3rd Ed.)",
    category: "Books",
    kind: "found",
    location: "Block B, Room B-112",
    date: "2026-10-08",
    description:
      "Name written inside the cover as 'H. Sheikh'. Left in room B-112 after the 9 AM lecture.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Crect x='110' y='90' width='180' height='240' rx='8' fill='%232c5aa0' stroke='%231a3d70' stroke-width='4'/%3E%3Crect x='120' y='100' width='160' height='30' rx='4' fill='%231a3d70'/%3E%3Ctext x='200' y='122' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EDATA%3C/text%3E%3Ctext x='200' y='138' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3 ESTRUCTURES%3C/text%3E%3Crect x='120' y='140' width='160' height='8' rx='2' fill='%231a3d70'/%3E%3Ctext x='200' y='240' font-family='serif' font-size='20' font-style='italic' fill='white' text-anchor='middle'%3EThird Edition%3C/text%3E%3Crect x='140' y='300' width='120' height='12' rx='3' fill='%231a3d70'/%3E%3Crect x='140' y='318' width='80' height='8' rx='3' fill='%231a3d70'/%3E%3C/svg%3E",
    contact: "Hamza Sheikh",
  },
  {
    id: "LF-298",
    title: "Silver Steel Water Bottle",
    category: "Accessories",
    kind: "found",
    location: "Gymnasium Entrance",
    date: "2026-10-06",
    description: "350ml bottle with a dented cap. Available at the security desk.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Crect x='150' y='90' width='100' height='240' rx='20' fill='%23d8d8d8' stroke='%23aaa' stroke-width='3'/%3E%3Crect x='160' y='60' width='80' height='40' rx='10' fill='%23c0c0c0' stroke='%23aaa' stroke-width='3'/%3E%3Cellipse cx='200' cy='60' rx='30' ry='10' fill='%23b0b0b0' stroke='%23aaa' stroke-width='2'/%3E%3Crect x='160' y='100' width='80' height='180' rx='4' fill='%23e8e8e8' stroke='%23ccc' stroke-width='2'/%3E%3Cline x1='200' y1='100' x2='200' y2='280' stroke='%23ccc' stroke-width='1'/%3E%3Crect x='150' y='300' width='100' height='30' rx='10' fill='%23c0c0c0' stroke='%23aaa' stroke-width='3'/%3E%3C/svg%3E",
    contact: "Campus Security",
  },
  {
    id: "LF-294",
    title: "Prescription Spectacles (Black Frame)",
    category: "Accessories",
    kind: "lost",
    location: "Central Courtyard",
    date: "2026-10-03",
    description: "Black rectangular frame in a navy hard case. Needed urgently for classes.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Crect x='60' y='160' width='120' height='80' rx='8' fill='none' stroke='%231a1a1a' stroke-width='6'/%3E%3Crect x='220' y='160' width='120' height='80' rx='8' fill='none' stroke='%231a1a1a' stroke-width='6'/%3E%3Cpath d='M180 200 Q200 190 220 200' stroke='%231a1a1a' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3Cline x1='60' y1='195' x2='30' y2='190' stroke='%231a1a1a' stroke-width='5' stroke-linecap='round'/%3E%3Cline x1='340' y1='195' x2='370' y2='190' stroke='%231a1a1a' stroke-width='5' stroke-linecap='round'/%3E%3Cellipse cx='120' cy='200' rx='45' ry='30' fill='%231a3d70' opacity='0.2' stroke='%231a3d70' stroke-width='2'/%3E%3Cellipse cx='280' cy='200' rx='45' ry='30' fill='%231a3d70' opacity='0.2' stroke='%231a3d70' stroke-width='2'/%3E%3C/svg%3E",
    contact: "Usman Tariq",
  },
  {
    id: "LF-289",
    title: "USB-C Charger & Type-C Cable",
    category: "Electronics",
    kind: "found",
    location: "Lecture Hall 3",
    date: "2026-09-30",
    description: "65W charger with a white braided cable. Collected after the 11 AM lecture.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8faf9'/%3E%3Crect x='120' y='100' width='160' height='100' rx='12' fill='%23f5f5f5' stroke='%23ddd' stroke-width='3'/%3E%3Crect x='180' y='200' width='40' height='120' rx='8' fill='%23f5f5f5' stroke='%23ddd' stroke-width='3'/%3E%3Crect x='170' y='320' width='60' height='20' rx='6' fill='%23e8e8e8' stroke='%23ccc' stroke-width='2'/%3E%3Crect x='210' y='200' width='80' height='10' rx='4' fill='%23e0e0e0' stroke='%23ccc' stroke-width='2'/%3E%3Cpath d='M220 205 Q280 205 280 260 Q280 300 220 300' stroke='%23f0f0f0' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Cpath d='M220 205 Q280 205 280 260 Q280 300 220 300' stroke='%23ddd' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Crect x='250' y='195' width='20' height='20' rx='3' fill='%23ccc' stroke='%23bbb' stroke-width='2'/%3E%3C/svg%3E",
    contact: "Fatima Khan",
  },
];

export const studyMaterials: StudyMaterial[] = [
  {
    id: "SM-512",
    title: "Introduction to Algorithms",
    courseCode: "CS-301",
    category: "Textbooks",
    condition: "Good",
    price: 1850,
    seller: "Hamza Sheikh",
    department: "Computer Science",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='70' y='50' width='260' height='380' rx='10' fill='%23333' stroke='%23222' stroke-width='4'/%3E%3Crect x='85' y='65' width='230' height='50' rx='6' fill='%23cc3333'/%3E%3Ctext x='200' y='100' font-family='sans-serif' font-size='18' font-weight='bold' fill='white' text-anchor='middle'%3EALGORITHMS%3C/text%3E%3Crect x='85' y='125' width='230' height='12' rx='3' fill='%23222'/%3E%3Crect x='100' y='160' width='200' height='150' rx='4' fill='%23444'/%3E%3Crect x='100' y='160' width='200' height='150' rx='4' fill='none' stroke='%23555' stroke-width='2'/%3E%3Cpath d='M130 200 L200 200 L200 260 L270 260' stroke='%23666' stroke-width='3' fill='none'/%3E%3Ccircle cx='200' cy='200' r='25' stroke='%23666' stroke-width='3' fill='none'/%3E%3Ctext x='200' y='380' font-family='sans-serif' font-size='16' font-weight='bold' fill='white' text-anchor='middle'%3EIntroduction to%3C/text%3E%3Ctext x='200' y='405' font-family='sans-serif' font-size='16' font-weight='bold' fill='white' text-anchor='middle'%3EAlgorithms%3C/text%3E%3Ctext x='200' y='430' font-family='sans-serif' font-size='12' fill='%23999' text-anchor='middle'%3E4th Edition%3C/text%3E%3C/svg%3E",
  },
  {
    id: "SM-509",
    title: "Operating Systems Handwritten Notes",
    courseCode: "CS-302",
    category: "Notes",
    condition: "Like New",
    price: 600,
    seller: "Fatima Khan",
    department: "Computer Science",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='70' y='60' width='260' height='360' rx='8' fill='%23fdfde0' stroke='%23d0d0b0' stroke-width='3'/%3E%3Cline x1='100' y1='110' x2='300' y2='110' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='130' x2='300' y2='130' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='150' x2='300' y2='150' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='170' x2='300' y2='170' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='190' x2='300' y2='190' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='210' x2='300' y2='210' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='230' x2='300' y2='230' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='250' x2='300' y2='250' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='270' x2='300' y2='270' stroke='%23bbb' stroke-width='2'/%3E%3Cline x1='100' y1='290' x2='300' y2='290' stroke='%23bbb' stroke-width='2'/%3E%3Crect x='85' y='70' width='230' height='340' rx='4' fill='none' stroke='%23e0e0c0' stroke-width='2'/%3E%3Ctext x='200' y='440' font-family='cursive' font-size='22' font-weight='bold' fill='%23333' text-anchor='middle'%3EOperating Systems%3C/text%3E%3Ctext x='200' y='465' font-family='cursive' font-size='14' fill='%23666' text-anchor='middle'%3EHandwritten Notes — CS-302%3C/text%3E%3C/svg%3E",
  },
  {
    id: "SM-503",
    title: "Engineering Mechanics — Statics",
    courseCode: "ME-201",
    category: "Textbooks",
    condition: "Fair",
    price: 1200,
    seller: "Usman Tariq",
    department: "Mechanical Engineering",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='70' y='50' width='260' height='380' rx='10' fill='%232c3e6b' stroke='%231a2650' stroke-width='4'/%3E%3Crect x='85' y='65' width='230' height='50' rx='6' fill='%231a2650'/%3E%3Ctext x='200' y='95' font-family='sans-serif' font-size='15' font-weight='bold' fill='white' text-anchor='middle'%3EENGINEERING%3C/text%3E%3Ctext x='200' y='112' font-family='sans-serif' font-size='15' font-weight='bold' fill='white' text-anchor='middle'%3EMECHANICS%3C/text%3E%3Crect x='100' y='160' width='200' height='150' rx='4' fill='none' stroke='%234a5fa0' stroke-width='3'/%3E%3Cline x1='140' y1='200' x2='260' y2='200' stroke='%234a5fa0' stroke-width='4' stroke-linecap='round'/%3E%3Cline x1='200' y1='160' x2='200' y2='310' stroke='%234a5fa0' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='200' cy='235' r='8' fill='%234a5fa0'/%3E%3Cline x1='140' y1='235' x2='120' y2='280' stroke='%234a5fa0' stroke-width='3' stroke-linecap='round'/%3E%3Cline x1='260' y1='235' x2='280' y2='280' stroke='%234a5fa0' stroke-width='3' stroke-linecap='round'/%3E%3Ctext x='200' y='400' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EStatics%3C/text%3E%3Ctext x='200' y='425' font-family='sans-serif' font-size='11' fill='%2399aacc' text-anchor='middle'%3EBeer %26 Johnston%3C/text%3E%3C/svg%3E",
  },
  {
    id: "SM-498",
    title: "Digital Logic Design Lab Manual",
    courseCode: "EE-214",
    category: "Lab Manuals",
    condition: "Good",
    price: 450,
    seller: "Ayesha Noor",
    department: "Electrical Engineering",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='70' y='60' width='260' height='360' rx='8' fill='%23fff8e8' stroke='%23d4c080' stroke-width='3'/%3E%3Crect x='70' y='60' width='260' height='50' rx='8' fill='%23d4a820' stroke='%23b89010' stroke-width='3'/%3E%3Crect x='70' y='95' width='260' height='15' fill='%23d4a820'/%3E%3Ctext x='200' y='90' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EDigital Logic Design%3C/text%3E%3Crect x='90' y='130' width='60' height='60' rx='4' fill='%23eee' stroke='%23ccc' stroke-width='2'/%3E%3Crect x='90' y='130' width='30' height='30' rx='2' fill='%2300aa44'/%3E%3Crect x='90' y='130' width='30' height='30' rx='2' fill='%2300aa44' opacity='0.7'/%3E%3Crect x='100' y='210' width='180' height='8' rx='3' fill='%23ddd'/%3E%3Crect x='100' y='230' width='140' height='8' rx='3' fill='%23ddd'/%3E%3Crect x='100' y='250' width='160' height='8' rx='3' fill='%23ddd'/%3E%3Crect x='100' y='270' width='120' height='8' rx='3' fill='%23ddd'/%3E%3Ccircle cx='320' cy='380' r='25' fill='%23eee' stroke='%23ccc' stroke-width='2'/%3E%3Ccircle cx='320' cy='380' r='25' fill='none' stroke='%23d4a820' stroke-width='3' stroke-dasharray='8,4'/%3E%3Ctext x='200' y='440' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23552' text-anchor='middle'%3ELab Manual — EE-214%3C/text%3E%3C/svg%3E",
  },
  {
    id: "SM-491",
    title: "Database Systems Past Papers (2019–2025)",
    courseCode: "CS-305",
    category: "Past Papers",
    condition: "New",
    price: 300,
    seller: "Zainab Ali",
    department: "Computer Science",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='80' y='60' width='240' height='340' rx='8' fill='%23fff' stroke='%23ddd' stroke-width='3'/%3E%3Crect x='90' y='70' width='220' height='40' rx='4' fill='%23006040'/%3E%3Ctext x='200' y='97' font-family='sans-serif' font-size='13' font-weight='bold' fill='white' text-anchor='middle'%3EDATABASE SYSTEMS%3C/text%3E%3Crect x='90' y='115' width='220' height='8' rx='2' fill='%23eee'/%3E%3Crect x='100' y='140' width='200' height='10' rx='2' fill='%23ddd'/%3E%3Crect x='100' y='158' width='180' height='10' rx='2' fill='%23ddd'/%3E%3Crect x='100' y='176' width='190' height='10' rx='2' fill='%23ddd'/%3E%3Crect x='100' y='200' width='200' height='10' rx='2' fill='%23ddd'/%3E%3Crect x='100' y='218' width='160' height='10' rx='2' fill='%23ddd'/%3E%3Crect x='90' y='245' width='220' height='8' rx='2' fill='%23eee'/%3E%3Crect x='100' y='265' width='200' height='10' rx='2' fill='%23ddd'/%3E%3Crect x='100' y='283' width='170' height='10' rx='2' fill='%23ddd'/%3E%3Crect x='80' y='400' width='240' height='60' rx='8' fill='%23e8f0ea' stroke='%23c0d8c8' stroke-width='3'/%3E%3Ctext x='200' y='435' font-family='sans-serif' font-size='18' font-weight='bold' fill='%2300402f' text-anchor='middle'%3E2019 – 2025%3C/text%3E%3Ctext x='200' y='455' font-family='sans-serif' font-size='12' fill='%2300402f' text-anchor='middle'%3EPast Exam Papers%3C/text%3E%3C/svg%3E",
  },
  {
    id: "SM-486",
    title: "Fluid Mechanics Solved Problems",
    courseCode: "CE-212",
    category: "Notes",
    condition: "Good",
    price: 550,
    seller: "Bilal Ahmed",
    department: "Civil Engineering",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='70' y='50' width='260' height='380' rx='10' fill='%23fff' stroke='%23ddd' stroke-width='4'/%3E%3Crect x='85' y='65' width='230' height='45' rx='6' fill='%23006080'/%3E%3Ctext x='200' y='92' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EFluid Mechanics%3C/text%3E%3Ctext x='200' y='107' font-family='sans-serif' font-size='10' fill='white' text-anchor='middle'%3ESolved Problems — CE-212%3C/text%3E%3Ccircle cx='200' cy='220' r='80' fill='none' stroke='%230080a0' stroke-width='3'/%3E%3Cpath d='M160 200 Q200 140 240 200 Q200 260 160 200' fill='%2300a0c0' opacity='0.2' stroke='%230080a0' stroke-width='2'/%3E%3Cline x1='200' y1='140' x2='200' y2='300' stroke='%230080a0' stroke-width='2' stroke-dasharray='6,4'/%3E%3Cline x1='120' y1='220' x2='280' y2='220' stroke='%230080a0' stroke-width='2' stroke-dasharray='6,4'/%3E%3Cpath d='M200 220 L240 180' stroke='%230080a0' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='200' cy='220' r='6' fill='%230080a0'/%3E%3Crect x='100' y='350' width='200' height='10' rx='3' fill='%23ddd'/%3E%3Crect x='100' y='370' width='150' height='10' rx='3' fill='%23ddd'/%3E%3Ctext x='200' y='450' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23006080' text-anchor='middle'%3ESolved Problems%3C/text%3E%3C/svg%3E",
  },
  {
    id: "SM-479",
    title: "Calculus — Early Transcendentals",
    courseCode: "MT-102",
    category: "Textbooks",
    condition: "Like New",
    price: 1600,
    seller: "Sana Malik",
    department: "Basic Sciences",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='70' y='50' width='260' height='380' rx='10' fill='%23cc3333' stroke='%23992222' stroke-width='4'/%3E%3Crect x='85' y='65' width='230' height='45' rx='6' fill='%23992222'/%3E%3Ctext x='200' y='92' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3ECALCULUS%3C/text%3E%3Crect x='100' y='150' width='200' height='150' rx='4' fill='none' stroke='%23ffaaaa' stroke-width='2'/%3E%3Cpath d='M100 280 Q150 200 200 250 Q250 300 300 220' stroke='%23ffaaaa' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='200' cy='250' r='8' fill='%23ffaaaa'/%3E%3Ctext x='200' y='400' font-family='sans-serif' font-size='16' font-weight='bold' fill='white' text-anchor='middle'%3EEarly Transcendentals%3C/text%3E%3Ctext x='200' y='425' font-family='sans-serif' font-size='12' fill='%23ffaaaa' text-anchor='middle'%3EJames Stewart%3C/text%3E%3Ctext x='200' y='445' font-family='sans-serif' font-size='11' fill='%23ffaaaa' text-anchor='middle'%3E8th Edition%3C/text%3E%3C/svg%3E",
  },
  {
    id: "SM-471",
    title: "Software Engineering Lab Manual",
    courseCode: "SE-304",
    category: "Lab Manuals",
    condition: "Good",
    price: 500,
    seller: "Ahmed Raza",
    department: "Software Engineering",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f8faf9'/%3E%3Crect x='70' y='50' width='260' height='380' rx='10' fill='%23fff' stroke='%23ddd' stroke-width='4'/%3E%3Crect x='85' y='65' width='230' height='45' rx='6' fill='%234a90d9'/%3E%3Ctext x='200' y='92' font-family='sans-serif' font-size='13' font-weight='bold' fill='white' text-anchor='middle'%3ESOFTWARE ENGINEERING%3C/text%3E%3Ctext x='200' y='107' font-family='sans-serif' font-size='10' fill='white' text-anchor='middle'%3ELab Manual — SE-304%3C/text%3E%3Crect x='100' y='150' width='200' height='100' rx='4' fill='%23f0f6ff' stroke='%234a90d9' stroke-width='2'/%3E%3Crect x='115' y='165' width='80' height='10' rx='3' fill='%234a90d9' opacity='0.6'/%3E%3Crect x='115' y='183' width='120' height='10' rx='3' fill='%234a90d9' opacity='0.4'/%3E%3Crect x='115' y='201' width='100' height='10' rx='3' fill='%234a90d9' opacity='0.5'/%3E%3Ctext x='200' y='400' font-family='monospace' font-size='16' font-weight='bold' fill='%234a90d9' text-anchor='middle'%3Efunction lab()%3C/text%3E%3Ctext x='200' y='420' font-family='monospace' font-size='12' fill='%236688aa' text-anchor='middle'%3E%7B /* code */ %7D%3C/text%3E%3C/svg%3E",
  },
];

export const notifications: Notification[] = [
  {
    id: "NT-901",
    type: "report-update",
    title: "Your complaint is now In Progress",
    description:
      "RPT-2418 — Broken ceiling fan in Classroom C-204 has been assigned to the electrical maintenance team.",
    time: "12 minutes ago",
    read: false,
  },
  {
    id: "NT-898",
    type: "lost-found",
    title: "Possible match for your lost ID card",
    description:
      "A student ID card was handed in at the Sports Complex security desk. Verify the details before collecting.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "NT-894",
    type: "material",
    title: "New listing in Software Engineering",
    description:
      "Software Engineering Lab Manual (SE-304) was listed for Rs 500 by a fellow student.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "NT-889",
    type: "report-update",
    title: "Report resolved",
    description:
      "RPT-2387 — Water leakage in CS Department washroom has been marked as resolved.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "NT-882",
    type: "system",
    title: "Recycling schedule updated",
    description:
      "Plastic and e-waste collection now happens every Tuesday and Friday at the cafeteria yard.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "NT-875",
    type: "report-update",
    title: "Report rejected",
    description:
      "RPT-2350 — E-waste collection request for lab was closed. Please route lab equipment requests through the lab in-charge.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "NT-868",
    type: "lost-found",
    title: "Your found item was claimed",
    description:
      "LF-318 — Black Wireless Earbuds Case was collected from the library front desk.",
    time: "5 days ago",
    read: true,
  },
  {
    id: "NT-861",
    type: "system",
    title: "Welcome to NED Campus Connect",
    description:
      "Your student account is verified. You can now report issues, list materials and track recycling.",
    time: "1 week ago",
    read: true,
  },
];

export const recyclingPoints: RecyclingPoint[] = [
  {
    id: "RC-01",
    name: "Main Cafeteria Recycling Yard",
    address: "Behind the main cafeteria, near the service gate",
    hours: "Mon–Sat, 8:00 AM – 6:00 PM",
    binTypes: ["plastic", "paper", "organic"],
    markerX: 34,
    markerY: 42,
  },
  {
    id: "RC-02",
    name: "Library Paper Bank",
    address: "Library ground floor, beside the photocopy counter",
    hours: "Mon–Sat, 9:00 AM – 8:00 PM",
    binTypes: ["paper", "e-waste"],
    markerX: 56,
    markerY: 28,
  },
  {
    id: "RC-03",
    name: "Hostel Block D Bins",
    address: "Hostel Block D entrance, left of the security cabin",
    hours: "24 hours",
    binTypes: ["plastic", "metal", "glass"],
    markerX: 72,
    markerY: 58,
  },
  {
    id: "RC-04",
    name: "Block B E-Waste Drop-off",
    address: "Electronics Lab corridor, Block B first floor",
    hours: "Mon–Fri, 10:00 AM – 4:00 PM",
    binTypes: ["e-waste", "metal"],
    markerX: 24,
    markerY: 66,
  },
  {
    id: "RC-05",
    name: "Sports Complex Glass Point",
    address: "Sports complex north stand, near the water cooler",
    hours: "Mon–Sat, 7:00 AM – 7:00 PM",
    binTypes: ["glass", "plastic"],
    markerX: 66,
    markerY: 78,
  },
  {
    id: "RC-06",
    name: "Admin Block Organic Compost Bin",
    address: "Administration block rear garden",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    binTypes: ["organic", "paper"],
    markerX: 46,
    markerY: 54,
  },
];

export const commonIssues: CommonIssue[] = [
  { id: "CI-1", label: "Ceiling fan not working", count: 34, location: "Main Academic Block" },
  { id: "CI-2", label: "Washroom water leakage", count: 27, location: "CS Building" },
  { id: "CI-3", label: "Corridor lights out", count: 21, location: "Civil Engineering Block" },
  { id: "CI-4", label: "Projector / AV fault", count: 18, location: "Lecture Halls 1–4" },
  { id: "CI-5", label: "Broken furniture", count: 12, location: "Central Courtyard" },
  { id: "CI-6", label: "Air conditioner not cooling", count: 9, location: "Library Reading Hall" },
];

export const issueTypes = [
  "Electrical — fan, lights, sockets",
  "Plumbing — leakage, taps, drainage",
  "Furniture — desks, chairs, benches",
  "AV / IT equipment — projector, network",
  "Civil — doors, windows, walls",
  "Cleanliness & housekeeping",
];

export const campusLocations = [
  "Main Academic Block",
  "Computer Science Building",
  "Civil Engineering Block",
  "Electrical Engineering Block",
  "Library",
  "Lecture Hall 1–4",
  "Cafeteria",
  "Sports Complex",
  "Hostel Block D",
  "Central Courtyard",
];

export const lostFoundCategories = [
  "All",
  "Electronics",
  "Books",
  "ID Cards",
  "Accessories",
];

export const materialCategories = [
  "All",
  "Textbooks",
  "Notes",
  "Lab Manuals",
  "Past Papers",
];

export const departmentOptions = [
  "Software Engineering",
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Basic Sciences",
];
