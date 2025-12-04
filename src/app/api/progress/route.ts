import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/progress - List progress records (tenant-scoped)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || (session.user as any).tenantId;
        const studentId = searchParams.get('studentId');
        const subject = searchParams.get('subject');

        const where: any = { tenantId };
        if (studentId) where.studentId = studentId;
        if (subject) where.subject = subject;

        const records = await prisma.progressRecord.findMany({
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
            orderBy: { assessmentDate: 'desc' },
        });

        return NextResponse.json(records);
    } catch (error) {
        console.error("Error fetching progress:", error);
        return NextResponse.json({ error: "Failed to fetch progress records" }, { status: 500 });
    }
}

// POST /api/progress - Create progress record
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const tenantId = body.tenantId || (session.user as any).tenantId;

        const record = await prisma.progressRecord.create({
            data: {
                tenantId,
                studentId: body.studentId,
                subject: body.subject,
                progressType: body.progressType,
                currentLevel: body.currentLevel,
                progressPercentage: body.progressPercentage || 0,
                grade: body.grade,
                notes: body.notes,
                assessedBy: session.user.name || session.user.email,
                assessmentDate: body.assessmentDate ? new Date(body.assessmentDate) : new Date(),
            },
            include: { student: true },
        });

        return NextResponse.json(record, { status: 201 });
    } catch (error) {
        console.error("Error creating progress:", error);
        return NextResponse.json({ error: "Failed to create progress record" }, { status: 500 });
    }
}
