import { signIn } from "next-auth/react";

export const createUser = async (
    event: React.FormEvent<HTMLFormElement>,
    router: any
) => {
    try {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const user = Object.fromEntries(formData.entries());

        if (!user.email || !user.password || !user.firstName || !user.lastName || !user.password || !user.confirmPassword) {
            console.error("Missing fields");
            return;
        }
        
        if (user.password !== user.confirmPassword) {
            console.error("Passwords do not match");
            return;
        }
        
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        
        if (response.ok) {
            console.log("User created successfully");
            const login = await signIn("credentials", {
                email: user.email,
                password: user.password,
                redirect: false,
            });
            if (login && login.ok) {
                router.redirect("/");
            } else {
                console.error("Failed to sign in");
            }
        } else {
            console.error("Failed to create user");
        }
    } catch (error) {
        console.error("An error occurred while creating the user");
    }
};