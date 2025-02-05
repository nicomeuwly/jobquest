import ListItem from "@/components/ListItem";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center m-8">
      <h1 className="text-2xl font-bold mb-8">JobQuest 🔍</h1>
      <div className="w-full px-6 py-4 rounded-lg flex items-center flex-row">
        <h2 className="basis-1/2 text-gray-400">Descriptif du poste</h2>
      </div>
      <ListItem />
    </div>
  );
}
