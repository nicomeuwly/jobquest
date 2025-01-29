import { MdArrowDropDown, MdCircle } from "react-icons/md"

export default function ListItem() {
    const jobDetails = {
        title: "Développeur Fullstack",
        details: ["Entreprise", "Lieu", "Taux", "Type de contrat"],
        status: "Réponse négative",
        link: "Lien de l'offre",
    }

    return (
        <div className={"w-full border border-gray-200 p-4 rounded-lg shadow-md flex items-center flex-row " + (jobDetails.status == "Réponse négative" ? "bg-white opacity-50" : "bg-white")}>
            <div className="basis-1/2">
                <h2>{jobDetails.title}</h2>
                <div className="flex items-center gap-2">
                    {jobDetails.details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <p className="text-gray-400 text-sm">{detail}</p>
                            {index != jobDetails.details.length - 1 ? <MdCircle size={5} color="#a1a1aa" /> : null}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-2 basis-1/6">
                <p className="text-gray-400">Status :</p>
                <select className="appearance-none">
                    <option value="1">Enregistré</option>
                    <option value="2">Postulé</option>
                    <option value="3">Réponse négative</option>
                    <option value="4">Entretien</option>
                    <option value="5">Retenu</option>
                </select>
                <MdArrowDropDown />
            </div>
            <div className="flex items-center gap-2 basis-1/6">
                <p className="text-gray-400">Date d'envoi :</p>
                <p>-</p>
            </div>
            <a className="basis-1/6 text-right" href={jobDetails.link}>Lien de l'offre</a>
        </div>
    )
}