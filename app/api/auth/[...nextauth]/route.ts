import type { User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            userType: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name?: string | null;
        userType: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        userType: string;
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // Call Fastify backend
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const data = await res.json();

                    if (res.ok && data.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name || data.user.email,
                            userType: data.user.userType,
                        };
                    }

                    // Login failed
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.userType = user.userType;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            // Add custom fields to session
            if (session.user) {
                session.user.id = token.id as string;
                session.user.userType = token.userType as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login/partner",
        error: "/login/partner",
    },
    session: {
        strategy: "jwt" as const,
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET || 'your-super-secret-nextauth-key-change-this-in-production-2024',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


