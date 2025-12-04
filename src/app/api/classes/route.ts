import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/classes - List classes (tenant-scoped)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || (session.user as any).tenantId;

        const classes = await prisma.class.findMany({
            where: { tenantId },
            orderBy: { name: 'asc' },
        });

        return NextResponse.json(classes);
    } catch (error) {
        console.error("Error fetching classes:", error);
        return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
    }
}

// POST /api/classes - Create class
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const tenantId = body.tenantId || (session.user as any).tenantId;

        const classRecord = await prisma.class.create({
            data: {
                tenantId,
                name: body.name,
                level: body.level,
                teacher: body.teacher,
                schedule: body.schedule,
                capacity: body.capacity || 20,
                enrolled: body.enrolled || 0,
                description: body.description,
            },
        });

        return NextResponse.json(classRecord, { status: 201 });
    } catch (error) {
        console.error("Error creating class:", error);
        return NextResponse.json({ error: "Failed to create class" }, { status: 500 });
    }
}
