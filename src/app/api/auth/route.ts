import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.password || !body.confirmPassword) {
        return new Response("Missing fields", { status: 400 });
    }
    if (body.password !== body.confirmPassword) {
        return new Response("Passwords do not match", { status: 400 });
    }
    
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: await hash(body.password, 10),
                firstName: body.firstName,
                lastName: body.lastName,
            },
        });
        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 });
        }
        return new Response("An unknown error occurred", { status: 400 });
    }
}