import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const createIssueSchema = z.object({
    title: z.string().min(1, 'Title too short').max(255),
    description: z.string().min(1, 'Description too short').max(255),
})

export async function POST(req: NextRequest) {
    const body = await req.json();
    const isValidCreateIssueSchema = createIssueSchema.safeParse(body);

    if (!isValidCreateIssueSchema.success) {
        console.error(isValidCreateIssueSchema.error);
        return NextResponse.json({ message: isValidCreateIssueSchema.error.format() }, { status: 400 });
    }
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    });

    return NextResponse.json(newIssue, {
        status: 201,
    });
}