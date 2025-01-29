import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
