import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        if (!id) {
            return new Response("Missing job ID", { status: 400 });
        }
        const job = await prisma.job.findUnique({
            where: {
                id: id,
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

export async function PUT(request: Request) {
    const id = request.url.split("/").pop();
    const body = await request.json();
    if (!id) {
        return new Response("No ID provided", { status: 400 });
    }

    try {
        await prisma.job.update({
            where: {
                id: id,
            },
            data: {
                title: body.title,
                company: body.company,
                location: body.location,
                rate: body.rate,
                contract: body.contract,
                status: body.status,
                mailingDate: body.mailingDate ? new Date(body.mailingDate) : new Date("01.01.1970"),
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

export async function DELETE(request: Request) {
    const id = request.url.split("/").pop();
    if (!id) {
        return new Response("No ID provided", { status: 400 });
    }

    try {
        await prisma.job.delete({
            where: {
                id: id,
            },
        });
        return new Response("Job deleted successfully", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 });
        }
        return new Response("An unknown error occurred", { status: 400 });
    }
}