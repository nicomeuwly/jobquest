"use client";
import router from "next/navigation";
import InputElement from "@/components/Input";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { createUser } from "@/lib/userActions";

export default function SignUpPage() {

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="xl:w-1/4 md:w-1/3 w-full md:h-fit h-full bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-2xl mb-4 font-bold flex items-center">Job<span className="text-blue-600">Quest</span><MagnifyingGlassIcon className="ml-2 size-6 text-blue-600" /></h1>
                <h2 className="font-bold mb-8 w-full text-center">Créer un compte</h2>
                <form className="grid grid-cols-2 gap-4" onSubmit={(event) => createUser(event, router)}>
                    <InputElement placeholder="Prénom" type="text" required={true} colSpan={1} name="firstName" />
                    <InputElement placeholder="Nom" type="text" required={true} colSpan={1} name="lastName" />
                    <InputElement placeholder="Adresse e-mail" type="text" colSpan={2} required={true} name="email" />
                    <InputElement placeholder="Mot de passe" type="password" colSpan={2} required={true} name="password" />
                    <InputElement placeholder="Confirmer le mot de passe" type="password" colSpan={2} required={true} name="confirmPassword" />
                    <div className="mt-2 w-full flex flex-col justify-center items-center gap-4 col-span-2">
                        <PrimaryButton text="Créer un compte" type="submit" />
                        <SecondaryButton text="Retour" type="button" onClick={() => router.redirect("/signin")} />
                    </div>
                </form>
            </div>
        </div>
    );
}