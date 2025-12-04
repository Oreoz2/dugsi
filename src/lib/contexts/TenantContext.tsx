'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Tenant = {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    createdAt: Date;
    updatedAt: Date;
};

interface TenantContextType {
    tenant: Tenant | null;
    isLoading: boolean;
    error: string | null;
}

const TenantContext = createContext<TenantContextType>({
    tenant: null,
    isLoading: true,
    error: null,
});

export function useTenant() {
    const context = useContext(TenantContext);
    if (!context) {
        throw new Error('useTenant must be used within TenantProvider');
    }
    return context;
}

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTenant() {
            try {
                // Get subdomain from hostname
                const hostname = window.location.hostname;
                const parts = hostname.split('.');

                // For localhost:3000 or direct domain, use a default tenant
                // For subdomain.domain.com, use the subdomain
                let slug = 'default';

                if (parts.length > 2 || (parts.length === 2 && parts[0] !== 'localhost')) {
                    slug = parts[0];
                }

                // Fetch tenant by slug
                const response = await fetch(`/api/tenants?slug=${slug}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch tenant');
                }

                const data = await response.json();
                setTenant(data);
            } catch (err) {
                console.error('Error fetching tenant:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        }

        fetchTenant();
    }, []);

    return (
        <TenantContext.Provider value={{ tenant, isLoading, error }}>
            {children}
        </TenantContext.Provider>
    );
}
