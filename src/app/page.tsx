"use client";
import ListItem from "@/components/ListItem";
import { AddJobModal, EditJobModal } from "@/components/Modal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { JobsContext } from "@/contexts/jobsProvider";
import { getJobs } from "@/lib/jobActions";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const { updates } = useContext(JobsContext);

  const searchParams = useSearchParams();
  const showNew = searchParams.get("add") === "true";
  const showEdit = searchParams.get("edit") === "true";

  useEffect(() => {
    getJobs().then((jobs) => setJobs(jobs));
  }, [ updates ]);

  return (
    <div className="flex flex-col items-center justify-center xl:mx-40 m-8">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th align="left" className="px-6 py-4 text-gray-400">Descriptif du poste</th>
            <th align="left" className="px-6 py-4 text-gray-400">Statut</th>
            <th align="left" className="px-6 py-4 text-gray-400">Date d'envoi</th>
            <th align="right" className="px-6 py-4 text-gray-400">Options</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length !== 0 ? jobs.map((job: any, index: number) => (
            <ListItem key={index} details={job} />
          )) : <tr><td colSpan={4} className="p-4 text-center text-gray-400 ">Aucun poste trouvé</td></tr>}
        </tbody>
      </table>
      {showNew && <AddJobModal />}
      {showEdit && <EditJobModal />}
    </div>
  );
}
