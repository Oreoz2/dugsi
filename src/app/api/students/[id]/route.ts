import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/students/[id] - Get a single student
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const student = await prisma.student.findUnique({
            where: { id: params.id },
            include: {
                tenant: true,
                attendanceRecords: {
                    orderBy: { date: 'desc' },
                    take: 10,
                },
                progressRecords: {
                    orderBy: { assessmentDate: 'desc' },
                    take: 10,
                },
                feeRecords: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        // TODO: Check if student belongs to user's tenant

        return NextResponse.json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json(
            { error: "Failed to fetch student" },
            { status: 500 }
        );
    }
}

// PATCH /api/students/[id] - Update a student
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

        // TODO: Check if student belongs to user's tenant

        const student = await prisma.student.update({
            where: { id: params.id },
            data: {
                englishName: body.englishName,
                arabicName: body.arabicName,
                dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
                gender: body.gender,
                classLevel: body.classLevel,
                yearGroup: body.yearGroup,
                status: body.status,
                phone: body.phone,
                email: body.email,
                address: body.address,
                guardianName: body.guardianName,
                guardianPhone: body.guardianPhone,
                guardianEmail: body.guardianEmail,
                guardianRelationship: body.guardianRelationship,
                quranProgress: body.quranProgress,
                attendanceRate: body.attendanceRate,
                outstandingFees: body.outstandingFees,
            },
            include: {
                tenant: true,
            },
        });

        return NextResponse.json(student);
    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json(
            { error: "Failed to update student" },
            { status: 500 }
        );
    }
}

// DELETE /api/students/[id] - Delete a student
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Check if student belongs to user's tenant

        await prisma.student.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.json(
            { error: "Failed to delete student" },
            { status: 500 }
        );
    }
}
