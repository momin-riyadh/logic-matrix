import { mailOptions, transporter } from '@/configs/nodemailer.config';
import { contactConfirmationTemplate } from '@/templates/contact-confirmation';
import { contactNotificationTemplate } from '@/templates/contact-notification';

export type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    project: string;
    message: string;
};

export async function sendContactEmails(data: ContactFormData) {
    const submittedAt = new Date();
    const templateData = { ...data, submittedAt };

    const results = await Promise.allSettled([
        // notify admin
        transporter.sendMail({
            from: `"Logic Matrix Website" <${process.env.SMTP_FROM}>`,
            to: process.env.CONTACT_EMAIL,
            subject: `New Contact: ${data.name} — ${data.project || 'General Enquiry'}`,
            html: contactNotificationTemplate(templateData),
            replyTo: data.email,
        }),

        // confirm to the user
        transporter.sendMail({
            from: `"Logic Matrix" <${mailOptions.from}>`,
            to: data.email,
            subject: 'We received your message — Logic Matrix',
            html: contactConfirmationTemplate(templateData),
        }),
    ]);

    // surface any failures
    const errors: string[] = [];
    results.forEach((result, i) => {
        if (result.status === 'rejected') {
            const label = i === 0 ? 'admin notification' : 'user confirmation';
            console.error(`[email] Failed to send ${label}:`, result.reason);
            errors.push(label);
        }
    });

    if (errors.length === 2) {
        throw new Error('Both emails failed to send');
    }

    return { ok: true, errors };
}
