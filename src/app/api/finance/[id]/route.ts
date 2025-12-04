import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/finance/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const record = await prisma.feeRecord.findUnique({
            where: { id: params.id },
            include: { student: true },
        });

        if (!record) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(record);
    } catch (error) {
        console.error("Error fetching fee:", error);
        return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 });
    }
}

// PATCH /api/finance/[id]
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

        const record = await prisma.feeRecord.update({
            where: { id: params.id },
            data: {
                feeType: body.feeType,
                amount: body.amount,
                dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
                paidAmount: body.paidAmount,
                paymentDate: body.paymentDate ? new Date(body.paymentDate) : undefined,
                paymentMethod: body.paymentMethod,
                status: body.status,
                notes: body.notes,
            },
            include: { student: true },
        });

        return NextResponse.json(record);
    } catch (error) {
        console.error("Error updating fee:", error);
        return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }
}

// DELETE /api/finance/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.feeRecord.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting fee:", error);
        return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
    }
}
