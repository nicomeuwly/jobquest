import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import JobsProvider from "@/contexts/jobsProvider";

export const metadata: Metadata = {
  title: "JobQuest 🔍",
  description: "Résumé de mes recherches d'emploi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <JobsProvider>
          <Header />
          {children}
        </JobsProvider>
      </body>
    </html>
  );
}
