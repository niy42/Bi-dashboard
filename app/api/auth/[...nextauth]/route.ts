// NextAuth route file
// This file is a custom route file for NextAuth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser, registerUser } from "@/lib/auth";

declare module "next-auth" {
    interface User {
        keepLoggedIn?: boolean;
        maxAge?: number;
    }
    interface Session {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            keepLoggedIn?: boolean;
            maxAge?: number;
        };
    }
    interface JWT {
        keepLoggedIn?: boolean;
        maxAge?: number;
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" },
                keepLoggedIn: { label: "Keep me logged in", type: "checkbox" },
            },
            async authorize(credentials, req) {
                console.log("Authorize called with credentials:", credentials);
                const { email, password, name, keepLoggedIn } = credentials || {};

                if (!email || !password) {
                    console.log("Missing email or password");
                    return null;
                }

                // Handle registration
                // if (req.query?.nextauth?.includes("signup")) {
                //     console.log("Handling registration for email:", email);
                //     try {
                //         const newUser = await registerUser(email, password, name || "");
                //         console.log("User registered via registerUser:", newUser);
                //         return {
                //             ...newUser,
                //             keepLoggedIn: keepLoggedIn === "true" || false,
                //         };
                //     } catch (error) {
                //         if (error instanceof Error) {
                //             console.log("Registration error:", error.message);
                //         } else {
                //             console.log("Registration error:", error);
                //         }
                //         if (error instanceof Error) {
                //             throw new Error(error.message || "Registration failed");
                //         } else {
                //             throw new Error("Registration failed");
                //         }
                //     }
                // }

                // Handle registration
                if (credentials?.mode === "signup") {
                    console.log("Handling registration for email:", email);
                    try {
                        const newUser = await registerUser(email, password, name || "");
                        console.log("User registered via registerUser:", newUser);
                        return {
                            ...newUser,
                            keepLoggedIn: keepLoggedIn === "true" || false,
                        };
                    } catch (error) {
                        console.log("Registration error:", error);
                        throw new Error(error.message || "Registration failed");
                    }
                }


                // Handle login
                const user = await authenticateUser(email, password);
                console.log("User returned from authenticateUser:", user);
                if (user) {
                    const result = {
                        ...user,
                        keepLoggedIn: keepLoggedIn === "true" || false,
                    };
                    console.log("Returning user to NextAuth:", result);
                    return result;
                }

                console.log("No user found, returning null");
                return null;
            },
        }),
    ],
    pages: { signIn: "/" },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // Default: 30 days
        updateAge: 24 * 60 * 60, // Update session every 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            console.log("JWT callback - Token:", token, "User:", user);
            if (user) {
                token.keepLoggedIn = user.keepLoggedIn;
                token.maxAge = token.keepLoggedIn ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback - Session:", session, "Token:", token);
            if (session?.user) {
                session.user.keepLoggedIn = token.keepLoggedIn as boolean;
                session.user.maxAge = typeof token.maxAge === "number" ? token.maxAge : 30 * 24 * 60 * 60;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };