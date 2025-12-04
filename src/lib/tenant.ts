import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper function to get tenant from hostname
export async function getTenantFromHostname(hostname: string) {
    const parts = hostname.split('.');

    // For localhost or direct domain access
    if (parts.length === 1 || (parts.length === 2 && parts[0] === 'localhost')) {
        return null;
    }

    // Extract subdomain (first part)
    const slug = parts[0];

    const tenant = await prisma.tenant.findUnique({
        where: { slug },
    });

    return tenant;
}

// Helper function to get tenant from request
export async function getTenantFromRequest(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    return getTenantFromHostname(hostname);
}

// Middleware helper to add tenant to request
export function withTenant(handler: Function) {
    return async (request: NextRequest, context?: any) => {
        const tenant = await getTenantFromRequest(request);

        // Add tenant to request (we'll use this in API routes)
        (request as any).tenant = tenant;

        return handler(request, context);
    };
}
