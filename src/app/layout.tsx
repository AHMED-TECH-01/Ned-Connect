import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NED Campus Connect — Together for a Better Campus",
    template: "%s · NED Campus Connect",
  },
  description:
    "NED Campus Connect gives NED University students one place to report lost items, raise maintenance complaints, find affordable study materials and locate campus recycling points.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
