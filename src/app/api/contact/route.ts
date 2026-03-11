import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmails } from '@/lib/email/send-contact-email';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().max(20).optional().default(''),
    project: z.string().max(100).optional().default(''),
    message: z
        .string()
        .min(10, 'Message must be at least 10 characters')
        .max(2000),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = contactSchema.parse(body);

        await sendContactEmails(data);

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.issues },
                { status: 400 },
            );
        }
        console.error('[contact] Error:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 },
        );
    }
}
