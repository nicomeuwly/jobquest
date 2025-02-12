"use client";
import ListItem from "@/components/ListItem";
import { AddJobModal } from "@/components/Modal";
import { useSearchParams } from "next/navigation";

export default function Home() {
  // const data = await fetch("/api/jobs");
  // const jobs = await data.json()

  const searchParams = useSearchParams();
  const show = searchParams.get("add") === "true";

  return (
    <div className="flex flex-col items-center justify-center m-8">
      <table className="w-full">
        <thead>
          <tr>
            <th align="left" className="px-6 py-4 text-gray-400">Descriptif du poste</th>
            <th align="left" className="px-6 py-4 text-gray-400">Statut</th>
            <th align="left" className="px-6 py-4 text-gray-400">Date d'envoi</th>
            <th align="right" className="px-6 py-4 text-gray-400">Options</th>
          </tr>
        </thead>
        <tbody>
          {/* {jobs.map((job: any, index: number) => (
            <ListItem key={index} details={job} />
          ))} */}
        </tbody>
      </table>
      {show && <AddJobModal />}
    </div>
  );
}
