import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    try {
        await prisma.job.create({
            data: {
                title: body.title,
                company: body.company,
                location: body.location,
                rate: body.rate,
                contract: body.contract,
                status: 0,
                mailingDate: new Date("01.01.1970"),
                link: body.link,
            }
        });
        return new Response("Job created successfully", { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 });
        }
        return new Response("An unknown error occurred", { status: 400 });
    }
}