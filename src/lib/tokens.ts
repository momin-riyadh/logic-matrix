import { v4 as uuidv4 } from 'uuid';
import { prisma } from './prisma';

export async function generateVerificationToken(email: string) {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailVerificationToken.deleteMany({
        where: { email },
    });

    const verificationToken = await prisma.emailVerificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken.token;
}

export async function generatePasswordResetToken(email: string) {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.deleteMany({
        where: { email },
    });

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordResetToken.token;
}

export async function verifyEmailToken(token: string) {
    const verificationToken = await prisma.emailVerificationToken.findUnique({
        where: { token },
    });

    if (!verificationToken) return null;
    if (verificationToken.expires < new Date()) return null;

    return verificationToken;
}

export async function verifyPasswordResetToken(token: string) {
    const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token },
    });

    if (!resetToken) return null;
    if (resetToken.expires < new Date()) return null;

    return resetToken;
}
