// lib/email/templates/contact-confirmation.ts
// Sent TO the user confirming their form was received

export type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    project: string;
    message: string;
    submittedAt?: Date;
};

export function contactConfirmationTemplate(data: ContactFormData): string {
    const {
        name,
        email,
        phone,
        project,
        message,
        submittedAt = new Date(),
    } = data;

    const firstName = name.split(' ')[0];

    const formattedDate = submittedAt.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = submittedAt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);border-radius:12px 12px 0 0;padding:40px 40px 0;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:rgba(255,255,255,0.15);border-radius:8px;padding:8px 16px;">
                          <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;">LOGIC MATRIX</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Success checkmark bubble -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:#ffffff;border-radius:50%;width:72px;height:72px;line-height:72px;text-align:center;margin-bottom:20px;box-shadow:0 8px 24px rgba(0,0,0,0.2);">
                      <span style="font-size:36px;line-height:72px;display:block;">&#10003;</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:0;">
                    <h1 style="margin:0 0 8px;color:#ffffff;font-size:26px;font-weight:700;line-height:1.3;">
                      Message Received!
                    </h1>
                    <p style="margin:0 0 0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.5;">
                      Thanks for reaching out, <strong>${firstName}</strong>. We'll be in touch shortly.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Wave divider -->
              <div style="margin-top:32px;line-height:0;font-size:0;">
                <svg viewBox="0 0 600 40" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;">
                  <path d="M0,20 C150,40 450,0 600,20 L600,40 L0,40 Z" fill="#ffffff"/>
                </svg>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Greeting -->
              <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.7;">
                Hi <strong>${firstName}</strong>,
              </p>
              <p style="margin:0 0 28px;color:#334155;font-size:15px;line-height:1.7;">
                Thank you for contacting <strong>Logic Matrix</strong>. We have successfully received your message and our team will review it shortly. You can expect to hear from us within <strong>1–2 business days</strong>.
              </p>

              <!-- What happens next -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td>
                    <h2 style="margin:0 0 16px;color:#1e293b;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                      What Happens Next?
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <!-- Step 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                      <tr>
                        <td width="44" valign="top" style="padding-right:14px;">
                          <div style="width:36px;height:36px;border-radius:50%;background:#dbeafe;text-align:center;line-height:36px;">
                            <span style="color:#2563eb;font-size:16px;font-weight:700;">1</span>
                          </div>
                        </td>
                        <td valign="middle">
                          <p style="margin:0;color:#1e293b;font-size:14px;font-weight:600;">Message reviewed</p>
                          <p style="margin:2px 0 0;color:#64748b;font-size:13px;">Our team reads every submission carefully</p>
                        </td>
                      </tr>
                    </table>
                    <!-- Step 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                      <tr>
                        <td width="44" valign="top" style="padding-right:14px;">
                          <div style="width:36px;height:36px;border-radius:50%;background:#dbeafe;text-align:center;line-height:36px;">
                            <span style="color:#2563eb;font-size:16px;font-weight:700;">2</span>
                          </div>
                        </td>
                        <td valign="middle">
                          <p style="margin:0;color:#1e293b;font-size:14px;font-weight:600;">Right expert assigned</p>
                          <p style="margin:2px 0 0;color:#64748b;font-size:13px;">We match you with the best person for your project</p>
                        </td>
                      </tr>
                    </table>
                    <!-- Step 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="44" valign="top" style="padding-right:14px;">
                          <div style="width:36px;height:36px;border-radius:50%;background:#dbeafe;text-align:center;line-height:36px;">
                            <span style="color:#2563eb;font-size:16px;font-weight:700;">3</span>
                          </div>
                        </td>
                        <td valign="middle">
                          <p style="margin:0;color:#1e293b;font-size:14px;font-weight:600;">We contact you</p>
                          <p style="margin:2px 0 0;color:#64748b;font-size:13px;">Expect a reply at <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a> within 1–2 business days</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Submitted info summary -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td>
                    <h2 style="margin:0 0 14px;color:#1e293b;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                      Your Submission Summary
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">

                      <!-- Row: Name -->
                      <tr>
                        <td width="130" style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#64748b;font-size:13px;font-weight:600;">Name</p>
                        </td>
                        <td style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#1e293b;font-size:13px;">${name}</p>
                        </td>
                      </tr>

                      <!-- Divider -->
                      <tr><td colspan="2" style="padding:0;"><div style="border-top:1px solid #e2e8f0;margin:4px 0;"></div></td></tr>

                      <!-- Row: Email -->
                      <tr>
                        <td width="130" style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#64748b;font-size:13px;font-weight:600;">Email</p>
                        </td>
                        <td style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#1e293b;font-size:13px;">${email}</p>
                        </td>
                      </tr>

                      <tr><td colspan="2" style="padding:0;"><div style="border-top:1px solid #e2e8f0;margin:4px 0;"></div></td></tr>

                      <!-- Row: Phone -->
                      <tr>
                        <td width="130" style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#64748b;font-size:13px;font-weight:600;">Phone</p>
                        </td>
                        <td style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#1e293b;font-size:13px;">${phone || 'Not provided'}</p>
                        </td>
                      </tr>

                      <tr><td colspan="2" style="padding:0;"><div style="border-top:1px solid #e2e8f0;margin:4px 0;"></div></td></tr>

                      <!-- Row: Project -->
                      <tr>
                        <td width="130" style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#64748b;font-size:13px;font-weight:600;">Project Type</p>
                        </td>
                        <td style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#1e293b;font-size:13px;">${project || 'Not specified'}</p>
                        </td>
                      </tr>

                      <tr><td colspan="2" style="padding:0;"><div style="border-top:1px solid #e2e8f0;margin:4px 0;"></div></td></tr>

                      <!-- Row: Message -->
                      <tr>
                        <td width="130" style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#64748b;font-size:13px;font-weight:600;">Message</p>
                        </td>
                        <td style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#1e293b;font-size:13px;line-height:1.6;white-space:pre-wrap;">${message}</p>
                        </td>
                      </tr>

                      <tr><td colspan="2" style="padding:0;"><div style="border-top:1px solid #e2e8f0;margin:4px 0;"></div></td></tr>

                      <!-- Row: Submitted at -->
                      <tr>
                        <td width="130" style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#64748b;font-size:13px;font-weight:600;">Submitted</p>
                        </td>
                        <td style="padding:6px 0;vertical-align:top;">
                          <p style="margin:0;color:#1e293b;font-size:13px;">${formattedDate} at ${formattedTime}</p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>

              <!-- Wrong email notice -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                <tr>
                  <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;">
                    <p style="margin:0;color:#92400e;font-size:13px;line-height:1.6;">
                      <strong>&#9888; Not you?</strong> If you did not submit this form, please ignore this email. No action is required.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1e293b;border-radius:0 0 12px 12px;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:0 10px;">
                          <a href="#" style="color:rgba(255,255,255,0.6);font-size:13px;text-decoration:none;">Website</a>
                        </td>
                        <td style="color:rgba(255,255,255,0.3);font-size:13px;">|</td>
                        <td style="padding:0 10px;">
                          <a href="#" style="color:rgba(255,255,255,0.6);font-size:13px;text-decoration:none;">Portfolio</a>
                        </td>
                        <td style="color:rgba(255,255,255,0.3);font-size:13px;">|</td>
                        <td style="padding:0 10px;">
                          <a href="#" style="color:rgba(255,255,255,0.6);font-size:13px;text-decoration:none;">Blog</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin:0 0 4px;color:rgba(255,255,255,0.9);font-size:13px;font-weight:600;">Logic Matrix</p>
                    <p style="margin:0;color:rgba(255,255,255,0.4);font-size:12px;line-height:1.6;">
                      You received this email because you submitted a contact form on our website.<br/>
                      &copy; ${new Date().getFullYear()} Logic Matrix. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
