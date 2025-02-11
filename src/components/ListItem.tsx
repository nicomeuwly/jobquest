"use client";
import { MdCircle } from "react-icons/md";
import { PencilIcon, ChevronDownIcon, TrashIcon, LinkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import colors from "tailwindcss/colors";
import { useState, useEffect } from "react";

interface ListItemProps {
    id: number;
    title: string;
    company: string;
    location: string;
    rate: string;
    contract: string;
    status: number;
    mailingDate: string;
    link: string;
}

export default function ListItem({ details }: { details: ListItemProps }) {
    const statusColorsOklch = [colors.gray[400], colors.blue[600], colors.red[600], colors.purple[600], colors.green[600]];
    const statusValues = ["Enregistré", "Postulé", "Réponse négative", "Entretien", "Retenu"];
    const [hovered, setHovered] = useState(false);

    const [jobDetails, setJobDetails] = useState<ListItemProps>({
        id: 0,
        title: "",
        company: "",
        location: "",
        rate: "",
        contract: "",
        status: 0,
        mailingDate: "",
        link: "",
    });

    const specs = [jobDetails.company, jobDetails.location, jobDetails.rate, jobDetails.contract];
    const baseDate = new Date("1970-01-01").toISOString();
    const tempDate = jobDetails.mailingDate > baseDate? new Date(jobDetails.mailingDate).toLocaleDateString() : "-";

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = parseInt(event.target.value);
        setJobDetails(prev => {
            let updatedJob = null;
            if (newStatus === 0) {
                updatedJob = { ...prev, status: newStatus, mailingDate: baseDate };
            } else if (newStatus === 1 && prev.mailingDate === baseDate) {
                updatedJob = { ...prev, status: newStatus, mailingDate: new Date().toISOString() };
            } else {
                updatedJob = { ...prev, status: newStatus };
            }

            fetch("/api/jobs/edit/" + prev.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedJob),
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Status updated successfully");
                    } else {
                        console.error("An error occurred while updating the status");
                    }
                });

            return updatedJob;
        });
    };

    useEffect(() => {
        setJobDetails(prev => (JSON.stringify(prev) !== JSON.stringify(details) ? details : prev));
    }, [details]);
    return (
        <tr className={"border-y border-gray-200 " + (jobDetails.status === 2 ? "bg-white opacity-50" : "bg-white hover:bg-gray-50")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <td className="px-6 py-4">
                <h2>{jobDetails.title}</h2>
                <div className="flex items-center gap-2">
                    {specs.map((detail, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <p className="text-gray-600 text-sm">{detail}</p>
                            {index !== specs.length - 1 ? <MdCircle size={5} color={statusColorsOklch[0]} /> : null}
                        </div>
                    ))}
                </div>
            </td>
            <td className="h-max px-6 py-4">
                <div className="flex items-center gap-2">
                    <MdCircle size={10} color={statusColorsOklch[jobDetails.status]} />
                    <select className="appearance-none" style={{ color: statusColorsOklch[jobDetails.status] }} onChange={handleStatusChange} value={jobDetails.status}>
                        {statusValues.map((value, index) => (
                            <option key={index} value={index}>{value}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="size-5 text-black" />
                </div>
            </td>
            <td className="px-6 py-4">{tempDate}</td>
            <td className="px-6 py-4" align="right">
                {hovered ?
                    <div className="flex justify-end gap-4">
                        <a href={jobDetails.link}><LinkIcon className="size-5 text-gray-500 hover:text-blue-600" /></a>
                        <PencilIcon className="size-5 text-gray-500 hover:text-blue-600" />
                        <TrashIcon className="size-5 text-gray-500 hover:text-blue-600" />
                    </div> :
                    <div className="flex justify-end gap-4">
                        <EllipsisHorizontalIcon className="size-5 text-white" />
                        <EllipsisHorizontalIcon className="size-5 text-white" />
                        <EllipsisHorizontalIcon className="size-5 text-gray-500" />
                    </div>}
            </td>
        </tr>
    );
}