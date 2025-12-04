import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/students - List all students for the current tenant
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Get tenantId from session/context
        // For now, we'll get all students (will fix with tenant context)
        const students = await prisma.student.findMany({
            include: {
                tenant: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        return NextResponse.json(
            { error: "Failed to fetch students" },
            { status: 500 }
        );
    }
}

// POST /api/students - Create a new student
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // TODO: Get tenantId from session/context
        // For now, require it in the request body
        if (!body.tenantId) {
            return NextResponse.json(
                { error: "tenantId is required" },
                { status: 400 }
            );
        }

        const student = await prisma.student.create({
            data: {
                tenantId: body.tenantId,
                studentId: body.studentId,
                englishName: body.englishName,
                arabicName: body.arabicName,
                dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
                gender: body.gender,
                classLevel: body.classLevel,
                yearGroup: body.yearGroup,
                status: body.status || "Active",
                phone: body.phone,
                email: body.email,
                address: body.address,
                guardianName: body.guardianName,
                guardianPhone: body.guardianPhone,
                guardianEmail: body.guardianEmail,
                guardianRelationship: body.guardianRelationship,
                quranProgress: body.quranProgress || 0,
                attendanceRate: body.attendanceRate || 0,
                outstandingFees: body.outstandingFees || 0,
            },
            include: {
                tenant: true,
            },
        });

        return NextResponse.json(student, { status: 201 });
    } catch (error) {
        console.error("Error creating student:", error);
        return NextResponse.json(
            { error: "Failed to create student" },
            { status: 500 }
        );
    }
}
