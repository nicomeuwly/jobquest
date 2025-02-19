"use client";
import { useRouter } from "next/navigation";
import InputElement from "@/components/Input";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { useEffect, useContext, useState } from "react";
import { JobsContext } from "@/contexts/jobsProvider";
import { createJob, getJob, updateJob } from "@/lib/jobActions";
import { useSearchParams } from "next/navigation";

export function AddJobModal() {
    const { updates, setUpdates } = useContext(JobsContext);
    const router = useRouter();

    return (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="xl:w-1/3 md:w-1/2 w-full md:h-fit h-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="font-bold mb-8 w-full text-center">Ajouter un poste</h1>
                <form className="grid grid-cols-2 gap-4" onSubmit={(event) => createJob(event, setUpdates, updates, router)}>
                    <InputElement placeholder="Nom du poste" type="text" required={true} colSpan={2} />
                    <InputElement placeholder="Entreprise" type="text" required={true} colSpan={1} />
                    <InputElement placeholder="Localité" type="text" required={true} colSpan={1} />
                    <InputElement placeholder="Taux" type="text" required={true} colSpan={1} />
                    <InputElement placeholder="Contrat" type="text" required={true} colSpan={1} />
                    <InputElement placeholder="Lien de l'offre" type="text" required={true} colSpan={2} />
                    <div className="col-span-2 flex justify-center gap-4 mt-4">
                        <PrimaryButton text="Ajouter" type="submit" />
                        <SecondaryButton text="Annuler" type="button" onClick={() => router.back()} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export function EditJobModal() {
    const { updates, setUpdates } = useContext(JobsContext);
    const [job, setJob] = useState<any>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobId = searchParams.get("id");

    useEffect(() => {
        jobId ? getJob(+jobId).then((job) => setJob(job)) : router.back();
    }, [jobId]);
    return (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="xl:w-1/3 md:w-1/2 w-full md:h-fit h-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="font-bold mb-8 w-full text-center">Modifier un poste</h1>
                {job ?
                    <form className="grid grid-cols-2 gap-4" onSubmit={(event) => updateJob(event, job.id, setUpdates, updates, router)}>
                        <InputElement placeholder="Nom du poste" type="text" required={true} colSpan={2} value={job.title} />
                        <InputElement placeholder="Entreprise" type="text" required={true} colSpan={1} value={job.company} />
                        <InputElement placeholder="Localité" type="text" required={true} colSpan={1} value={job.location} />
                        <InputElement placeholder="Taux" type="text" required={true} colSpan={1} value={job.rate} />
                        <InputElement placeholder="Contrat" type="text" required={true} colSpan={1} value={job.contract} />
                        {job.status > 0 ? <InputElement placeholder="Date d'envoi" type="date" required={true} colSpan={1} value={new Date(job.mailingDate).toISOString().split("T")[0]} /> : null}
                        <InputElement placeholder="Lien de l'offre" type="text" required={true} colSpan={job.status > 0 ? 1 : 2} value={job.link} />
                        <div className="col-span-2 flex justify-center gap-4 mt-4">
                            <PrimaryButton text="Enregistrer" type="submit" />
                            <SecondaryButton text="Annuler" type="button" onClick={() => router.back()} />
                        </div>
                    </form>
                    : <p>Chargement...</p>}
            </div>
        </div>
    );
}
