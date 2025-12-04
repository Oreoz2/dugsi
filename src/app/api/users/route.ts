import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/users - List users (tenant-scoped)
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const tenantId = searchParams.get('tenantId') || (session.user as any).tenantId;

        const users = await prisma.user.findMany({
            where: { tenantId },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                fullName: true,
                phone: true,
                isActive: true,
                lastLogin: true,
                createdAt: true,
                // Exclude password
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

// POST /api/users - Create user
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const tenantId = body.tenantId || (session.user as any).tenantId;

        // TODO: Hash password with bcrypt before production
        const user = await prisma.user.create({
            data: {
                tenantId,
                username: body.username,
                email: body.email,
                password: body.password, // TODO: Hash this
                role: body.role || 'user',
                fullName: body.fullName,
                phone: body.phone,
                isActive: body.isActive !== undefined ? body.isActive : true,
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                fullName: true,
                phone: true,
                isActive: true,
                createdAt: true,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
