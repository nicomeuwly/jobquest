"use client";
import { ArrowLongUpIcon, ArrowLongDownIcon, ArrowRightStartOnRectangleIcon, UserIcon, ListBulletIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { JobsContext } from "@/contexts/jobsProvider";
import { useContext, useEffect, useState } from "react";
import { getJobs } from "@/lib/jobActions";
import { signOut } from "next-auth/react";

export default function Header() {
    const { updates } = useContext(JobsContext);
    const [total, setTotal] = useState<number>(0);
    const [sended, setSended] = useState<number>(0);
    const [received, setReceived] = useState<number>(0);

    useEffect(() => {
        getJobs().then((jobs) => {
            setTotal(jobs.length);
            setSended(jobs.filter((job: any) => job.status > 0).length);
            setReceived(jobs.filter((job: any) => job.status > 1).length);
        });
    }, [updates]);
    return (
        <header className="h-[5.5rem] xl:px-40 px-8 py-6 shadow-md bg-white flex items-center justify-between">
            <h1 className="basis-1/3 text-2xl font-bold flex items-center">Job<span className="text-blue-600">Quest</span><MagnifyingGlassIcon className="ml-2 size-6 text-blue-600"/></h1>
            <div className="flex items-center gap-4 justify-center basis-1/3">
                <div className="flex items-center gap-4 bg-gray-100 py-2 px-4 rounded-md">
                    <p className="flex items-center gap-2 text-blue-600"><ListBulletIcon className="size-5" />{total}</p>
                    <p className="flex items-center gap-2 text-blue-600"><ArrowLongUpIcon className="size-5" />{sended}</p>
                    <p className="flex items-center gap-2 text-blue-600"><ArrowLongDownIcon className="size-5" />{received}</p>
                </div>
                <Link href="/?add=true" className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-md text-white">Ajouter</Link>
            </div>
            <div className="flex items-center gap-4 justify-end basis-1/3">
                <p className="flex items-center gap-2 text-gray-500"><UserIcon className="size-5" />Nicolas Meuwly</p>
                <button className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded-md text-white cursor-pointer"><ArrowRightStartOnRectangleIcon className="size-6" onClick={() => {signOut()}}/></button>
            </div>
        </header>
    );
}
