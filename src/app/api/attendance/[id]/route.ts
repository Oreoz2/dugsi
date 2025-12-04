import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/attendance/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const record = await prisma.attendanceRecord.findUnique({
            where: { id: params.id },
            include: { student: true },
        });

        if (!record) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(record);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 });
    }
}

// PATCH /api/attendance/[id]
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

        const record = await prisma.attendanceRecord.update({
            where: { id: params.id },
            data: {
                status: body.status,
                notes: body.notes,
                date: body.date ? new Date(body.date) : undefined,
            },
            include: { student: true },
        });

        return NextResponse.json(record);
    } catch (error) {
        console.error("Error updating attendance:", error);
        return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }
}

// DELETE /api/attendance/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.attendanceRecord.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting attendance:", error);
        return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
    }
}
