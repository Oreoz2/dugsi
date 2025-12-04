import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/progress/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const record = await prisma.progressRecord.findUnique({
            where: { id: params.id },
            include: { student: true },
        });

        if (!record) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(record);
    } catch (error) {
        console.error("Error fetching progress:", error);
        return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 });
    }
}

// PATCH /api/progress/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const record = await prisma.progressRecord.update({
            where: { id: params.id },
            data: {
                subject: body.subject,
                progressType: body.progressType,
                currentLevel: body.currentLevel,
                progressPercentage: body.progressPercentage,
                grade: body.grade,
                notes: body.notes,
                assessmentDate: body.assessmentDate ? new Date(body.assessmentDate) : undefined,
            },
            include: { student: true },
        });

        return NextResponse.json(record);
    } catch (error) {
        console.error("Error updating progress:", error);
        return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }
}

// DELETE /api/progress/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.progressRecord.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting progress:", error);
        return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
    }
}
