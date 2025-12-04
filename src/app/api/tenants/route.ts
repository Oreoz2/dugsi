import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/tenants?slug=xxx - Get tenant by slug
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            // Return all tenants if no slug provided
            const tenants = await prisma.tenant.findMany({
                include: {
                    _count: {
                        select: {
                            users: true,
                            students: true,
                        },
                    },
                },
            });
            return NextResponse.json(tenants);
        }

        // Find specific tenant by slug
        const tenant = await prisma.tenant.findUnique({
            where: { slug },
            include: {
                _count: {
                    select: {
                        users: true,
                        students: true,
                    },
                },
            },
        });

        if (!tenant) {
            return NextResponse.json(
                { error: "Tenant not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(tenant);
    } catch (error) {
        console.error("Error fetching tenant:", error);
        return NextResponse.json(
            { error: "Failed to fetch tenant" },
            { status: 500 }
        );
    }
}

// POST /api/tenants - Create a new tenant
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Check if slug is already taken
        const existing = await prisma.tenant.findUnique({
            where: { slug: body.slug },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Slug already taken" },
                { status: 400 }
            );
        }

        const tenant = await prisma.tenant.create({
            data: {
                name: body.name,
                slug: body.slug,
                logo: body.logo,
            },
        });

        return NextResponse.json(tenant, { status: 201 });
    } catch (error) {
        console.error("Error creating tenant:", error);
        return NextResponse.json(
            { error: "Failed to create tenant" },
            { status: 500 }
        );
    }
}
