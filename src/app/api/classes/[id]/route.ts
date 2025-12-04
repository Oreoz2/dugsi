import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/classes/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const classRecord = await prisma.class.findUnique({
            where: { id: params.id },
        });

        if (!classRecord) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        return NextResponse.json(classRecord);
    } catch (error) {
        console.error("Error fetching class:", error);
        return NextResponse.json({ error: "Failed to fetch class" }, { status: 500 });
    }
}

// PATCH /api/classes/[id]
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

        const classRecord = await prisma.class.update({
            where: { id: params.id },
            data: {
                name: body.name,
                level: body.level,
                teacher: body.teacher,
                schedule: body.schedule,
                capacity: body.capacity,
                enrolled: body.enrolled,
                description: body.description,
            },
        });

        return NextResponse.json(classRecord);
    } catch (error) {
        console.error("Error updating class:", error);
        return NextResponse.json({ error: "Failed to update class" }, { status: 500 });
    }
}

// DELETE /api/classes/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.class.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting class:", error);
        return NextResponse.json({ error: "Failed to delete class" }, { status: 500 });
    }
}
