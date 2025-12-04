import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/attendance - List attendance records (tenant-scoped)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || (session.user as any).tenantId;
        const studentId = searchParams.get('studentId');
        const date = searchParams.get('date');

        const where: any = { tenantId };
        if (studentId) where.studentId = studentId;
        if (date) where.date = new Date(date);

        const records = await prisma.attendanceRecord.findMany({
            where,
            include: {
                student: {
                    select: {
                        id: true,
                        englishName: true,
                        arabicName: true,
                        studentId: true,
                        classLevel: true,
                    },
                },
            },
            orderBy: { date: 'desc' },
        });

        return NextResponse.json(records);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        return NextResponse.json(
            { error: "Failed to fetch attendance records" },
            { status: 500 }
        );
    }
}

// POST /api/attendance - Create attendance record
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const tenantId = body.tenantId || (session.user as any).tenantId;

        const record = await prisma.attendanceRecord.create({
            data: {
                tenantId,
                studentId: body.studentId,
                date: new Date(body.date),
                status: body.status,
                notes: body.notes,
                markedBy: session.user.name || session.user.email,
            },
            include: {
                student: true,
            },
        });

        return NextResponse.json(record, { status: 201 });
    } catch (error) {
        console.error("Error creating attendance:", error);
        return NextResponse.json(
            { error: "Failed to create attendance record" },
            { status: 500 }
        );
    }
}
