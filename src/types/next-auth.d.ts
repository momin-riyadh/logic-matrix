import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: 'ADMIN' | 'USER';
            emailVerified: Date | null;
        } & DefaultSession['user'];
    }

    interface User {
        emailVerified: Date | null;
        role: 'ADMIN' | 'USER';
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: 'ADMIN' | 'USER';
        emailVerified: Date | null;
    }
}
