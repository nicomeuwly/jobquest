import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
    const id = request.url.split("/").pop();
    const body = await request.json();
    if (!id) {
        return new Response("No ID provided", { status: 400 });
    }

    try {
        await prisma.job.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: body.title,
                company: body.company,
                location: body.location,
                rate: body.rate,
                contract: body.contract,
                status: body.status,
                mailingDate: body.mailingDate,
                link: body.link,
            }
        });
        return new Response("Job updated successfully", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 });
        }
        return new Response("An unknown error occurred", { status: 400 });
    }
}