import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/announcements/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const announcement = await prisma.announcement.findUnique({
            where: { id: params.id },
        });

        if (!announcement) {
            return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
        }

        return NextResponse.json(announcement);
    } catch (error) {
        console.error("Error fetching announcement:", error);
        return NextResponse.json({ error: "Failed to fetch announcement" }, { status: 500 });
    }
}

// PATCH /api/announcements/[id]
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

        const announcement = await prisma.announcement.update({
            where: { id: params.id },
            data: {
                title: body.title,
                content: body.content,
                priority: body.priority,
            },
        });

        return NextResponse.json(announcement);
    } catch (error) {
        console.error("Error updating announcement:", error);
        return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
    }
}

// DELETE /api/announcements/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.announcement.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
    }
}
