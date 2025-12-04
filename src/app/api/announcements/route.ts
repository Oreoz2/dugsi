import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/announcements - List announcements (tenant-scoped)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || (session.user as any).tenantId;
        const priority = searchParams.get('priority');

        const where: any = { tenantId };
        if (priority) where.priority = priority;

        const announcements = await prisma.announcement.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(announcements);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
    }
}

// POST /api/announcements - Create announcement
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const tenantId = body.tenantId || (session.user as any).tenantId;

        const announcement = await prisma.announcement.create({
            data: {
                tenantId,
                title: body.title,
                content: body.content,
                priority: body.priority || 'normal',
                author: session.user.name || session.user.email,
            },
        });

        return NextResponse.json(announcement, { status: 201 });
    } catch (error) {
        console.error("Error creating announcement:", error);
        return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
    }
}
