import { ArrowLongUpIcon, ArrowLongDownIcon, ArrowRightStartOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Header() {

    return (
        <header className="px-8 py-6 shadow-md bg-white flex items-center justify-between">
            <h1 className="basis-1/3 text-2xl font-bold">Job<span className="text-blue-600">Quest</span> 🔍</h1>
            <div className="flex items-center gap-4 justify-center basis-1/3">
                <div className="flex items-center gap-4 bg-gray-100 py-2 px-4 rounded-md">
                    <p className="flex items-center text-blue-600"><ArrowLongUpIcon className="size-5" />0</p>
                    <p className="flex items-center text-blue-600"><ArrowLongDownIcon className="size-5" />0</p>
                </div>
                <Link href="/?add=true" className="bg-gray-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white">Ajouter</Link>
            </div>
            <div className="flex items-center gap-4 justify-end basis-1/3">
                <p className="flex items-center gap-2 text-gray-500"><UserIcon className="size-5" />Nicolas Meuwly</p>
                <button className="bg-gray-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"><ArrowRightStartOnRectangleIcon className="size-6" /></button>
            </div>
        </header>
    );
}
