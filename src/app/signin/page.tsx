"use client";
import { signIn } from "next-auth/react";
import router from "next/navigation";
import InputElement from "@/components/Input";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SignInPage() {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const loginEntries = Object.fromEntries(formData.entries());

        const response = await signIn("credentials", {
            email: loginEntries.email,
            password: loginEntries.password,
            redirect: false,
        });
        if (response && response.ok) {
            router.redirect("/");
        } else {
            console.error("Failed to sign in");
        }
    };

    const createAccountLink = () => {
        router.redirect("/signup");
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="xl:w-1/4 md:w-1/3 w-full md:h-fit h-full bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-2xl mb-4 font-bold flex items-center">Job<span className="text-blue-600">Quest</span><MagnifyingGlassIcon className="ml-2 size-6 text-blue-600" /></h1>
                <h2 className="font-bold mb-8 w-full text-center">Connexion</h2>
                <form className="w-full flex flex-col gap-6 items-center" onSubmit={onSubmit}>
                    <InputElement placeholder="Adresse e-mail" type="text" required={true} name="email" />
                    <InputElement placeholder="Mot de passe" type="password" required={true} name="password" />
                    <div className="mt-2 w-full flex flex-col justify-center items-center gap-4">
                        <PrimaryButton text="Connexion" type="submit" />
                        <SecondaryButton text="Créer un compte" type="button" onClick={createAccountLink} />
                    </div>
                </form>
            </div>
        </div>
    );
}