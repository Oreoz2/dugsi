import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { z } from "zod"

async function getUser(email: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { email },
            include: { tenant: true },
        });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        // If database is not set up yet, return null
        return null;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) {
                        console.log('User not found');
                        return null;
                    }

                    // TODO: Use bcrypt.compare when database is set up
                    // For now, simple comparison (will be replaced with bcrypt)
                    const passwordsMatch = password === user.password;

                    if (passwordsMatch) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.fullName,
                            role: user.role,
                            tenantId: user.tenantId,
                        };
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.tenantId = (user as any).tenantId;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role;
                (session.user as any).tenantId = token.tenantId;
            }
            return session;
        },
    },
});
