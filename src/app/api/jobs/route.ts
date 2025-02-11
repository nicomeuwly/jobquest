import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const jobs = await prisma.job.findMany();
        return new Response(JSON.stringify(jobs), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 });
        }
        return new Response("An unknown error occurred", { status: 400 });
    }
}