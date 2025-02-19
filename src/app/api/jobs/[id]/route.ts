import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        if (!id) {
            return new Response("Missing job ID", { status: 400 });
        }
        const job = await prisma.job.findUnique({
            where: {
                id: Number(id)
            }
        });
        return new Response(JSON.stringify(job), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 });
        }
        return new Response("An unknown error occurred", { status: 400 });
    }
}