"use client";
import { useRouter } from "next/navigation";
import InputElement from "@/components/Input";

export function AddJobModal() {
    const router = useRouter();
    const formElements = [
        { placeholder: "Nom du poste", type: "text", required: true, colSpan: 2 },
        { placeholder: "Entreprise", type: "text", required: true, colSpan: 1 },
        { placeholder: "Localité", type: "text", required: true, colSpan: 1 },
        { placeholder: "Taux", type: "text", required: true, colSpan: 1 },
        { placeholder: "Contrat", type: "text", required: true, colSpan: 1 },
        { placeholder: "Lien de l'offre", type: "text", required: true, colSpan: 2 },
    ];

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="font-bold mb-8 w-full text-center">Ajouter un poste</h1>
            <form className="grid grid-cols-2 gap-4">
                {formElements.map((element, index) => (
                    <InputElement key={index} placeholder={element.placeholder} type={element.type} required={element.required} colSpan={element.colSpan}/>
                ))}
                <div className="col-span-2 flex justify-center gap-4 mt-4">
                    <button className="bg-gray-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white" type="submit">Ajouter</button>
                    <button className="bg-gray-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white" type="button" onClick={() => router.back()}>Annuler</button>
                </div>
            </form>
        </div>
    );
}

export function EditJobModal() {
    const router = useRouter();
    const formElements = [
        { placeholder: "Nom du poste", type: "text", required: true, colSpan: 2 },
        { placeholder: "Entreprise", type: "text", required: true, colSpan: 1 },
        { placeholder: "Localité", type: "text", required: true, colSpan: 1 },
        { placeholder: "Taux", type: "text", required: true, colSpan: 1 },
        { placeholder: "Contrat", type: "text", required: true, colSpan: 1 },
        { placeholder: "Date d'envoi", type: "date", required: true, colSpan: 1 },
        { placeholder: "Lien de l'offre", type: "text", required: true, colSpan: 1 },
    ];

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="font-bold mb-8 w-full text-center">Modifier un poste</h1>
            <form className="grid grid-cols-2 gap-4">
                {formElements.map((element, index) => (
                    <InputElement key={index} placeholder={element.placeholder} type={element.type} required={element.required} colSpan={element.colSpan}/>
                ))}
                <div className="col-span-2 flex justify-center gap-4 mt-4">
                    <button className="bg-gray-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white" type="submit">Enregistrer</button>
                    <button className="bg-gray-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white" type="button" onClick={() => router.back()}>Annuler</button>
                </div>
            </form>
        </div>
    );
}
