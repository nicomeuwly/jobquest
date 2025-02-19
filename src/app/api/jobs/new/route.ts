import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    try {
        await prisma.job.create({
            data: {
                title: body.nom_du_poste,
                company: body.entreprise,
                location: body.localite,
                rate: body.taux,
                contract: body.contrat,
                status: 0,
                mailingDate: new Date("1970-01-01"),
                link: body.lien_de_loffre,
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