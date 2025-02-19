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
                title: body.title || body.nom_du_poste,
                company: body.company || body.entreprise,
                location: body.location || body.localite,
                rate: body.rate || body.taux,
                contract: body.contract || body.contrat,
                status: body.status,
                mailingDate: body.mailingDate ? new Date(body.mailingDate) : body.date_denvoi ? new Date(body.date_denvoi) : new Date("01.01.1970"),
                link: body.link || body.lien_de_loffre,
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
                id: parseInt(id),
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