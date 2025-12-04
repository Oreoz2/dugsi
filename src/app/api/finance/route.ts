import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/finance - List fee records (tenant-scoped)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || (session.user as any).tenantId;
        const studentId = searchParams.get('studentId');
        const status = searchParams.get('status');

        const where: any = { tenantId };
        if (studentId) where.studentId = studentId;
        if (status) where.status = status;

        const records = await prisma.feeRecord.findMany({
            where,
            include: {
                student: {
                    select: {
                        id: true,
                        englishName: true,
                        arabicName: true,
                        studentId: true,
                        classLevel: true,
                        guardianName: true,
                        guardianPhone: true,
                        guardianEmail: true,
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        });

        return NextResponse.json(records);
    } catch (error) {
        console.error("Error fetching finance:", error);
        return NextResponse.json({ error: "Failed to fetch fee records" }, { status: 500 });
    }
}

// POST /api/finance - Create fee record
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const tenantId = body.tenantId || (session.user as any).tenantId;

        const record = await prisma.feeRecord.create({
            data: {
                tenantId,
                studentId: body.studentId,
                feeType: body.feeType,
                amount: body.amount,
                dueDate: new Date(body.dueDate),
                paidAmount: body.paidAmount || 0,
                paymentDate: body.paymentDate ? new Date(body.paymentDate) : null,
                paymentMethod: body.paymentMethod,
                status: body.status || 'Pending',
                notes: body.notes,
            },
            include: { student: true },
        });

        return NextResponse.json(record, { status: 201 });
    } catch (error) {
        console.error("Error creating fee:", error);
        return NextResponse.json({ error: "Failed to create fee record" }, { status: 500 });
    }
}
