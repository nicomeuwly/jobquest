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

export async function POST(request: Request) {
    const body = await request.json();
    if (!body.title || !body.company || !body.location || !body.rate || !body.contract || !body.link) {
        return new Response("Missing fields", { status: 400 });
    }
    try {
        await prisma.job.create({
            data: {
                title: body.title,
                company: body.company,
                location: body.location,
                rate: body.rate,
                contract: body.contract,
                status: 0,
                mailingDate: new Date("1970-01-01"),
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