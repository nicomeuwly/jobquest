import ListItem from "@/components/ListItem";

export default async function Home() {
  const data = await fetch(process.env.API_URL + "/api/jobs");
  const jobs = await data.json()

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
          {jobs.map((job: any, index: number) => (
            <ListItem key={index} details={job} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
