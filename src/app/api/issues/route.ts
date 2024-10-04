import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createIssueSchema } from "../../validationSchemas";
const prisma = new PrismaClient();




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
export async function GET() {
    const issues = await prisma.issue.findMany();
    if (!issues) {
        return NextResponse.json({ message: 'No issues found' }, { status: 404 });
    }
    return NextResponse.json(issues, {
        status: 200,
    });
}