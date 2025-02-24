import type { Metadata } from "next";
import "./globals.css";
import JobsProvider from "@/contexts/jobsProvider";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "JobQuest 🔍",
  description: "Résumé de mes recherches d'emploi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="fr">
      <body className="w-screen h-screen bg-gray-50">
        {session ? (<Providers>
          <JobsProvider>
            {children}
          </JobsProvider>
        </Providers>) : (<div className="h-full w-full">{children}</div>)}
      </body>
    </html>
  );
}
