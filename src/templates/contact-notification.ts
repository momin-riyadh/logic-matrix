export type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    project: string;
    message: string;
    submittedAt?: Date;
};

export function contactNotificationTemplate(data: ContactFormData): string {
    const {
        name,
        email,
        phone,
        project,
        message,
        submittedAt = new Date(),
    } = data;

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
  <title>New Contact Form Submission</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
              <!-- Logo area -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:rgba(255,255,255,0.15);border-radius:8px;padding:8px 16px;">
                          <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;">LOGIC MATRIX</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:rgba(255,255,255,0.2);border-radius:50%;padding:14px;margin-bottom:16px;">
                      <img src="https://cdn-icons-png.flaticon.com/32/561/561127.png" width="32" height="32" alt="Mail" style="display:block;" />
                    </div>
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">
                      New Contact Form Submission
                    </h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
                      ${formattedDate} &middot; ${formattedTime}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:#dbeafe;border-left:4px solid #2563eb;padding:14px 40px;">
              <p style="margin:0;color:#1e40af;font-size:14px;font-weight:600;">
                &#128276; A new message has arrived from your website contact form. Please respond promptly.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <!-- Sender info grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td colspan="2">
                    <h2 style="margin:0 0 16px;color:#1e293b;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">
                      Sender Details
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:0 8px 16px 0;vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
                          <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Full Name</p>
                          <p style="margin:0;color:#1e293b;font-size:15px;font-weight:600;">${name}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding:0 0 16px 8px;vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
                          <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email Address</p>
                          <p style="margin:0;color:#2563eb;font-size:15px;font-weight:600;">
                            <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:0 8px 0 0;vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
                          <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Phone Number</p>
                          <p style="margin:0;color:#1e293b;font-size:15px;font-weight:600;">
                            <a href="tel:${phone}" style="color:#1e293b;text-decoration:none;">${phone || 'Not provided'}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding:0 0 0 8px;vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
                          <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Project Type</p>
                          <p style="margin:0;color:#1e293b;font-size:15px;font-weight:600;">${project || 'Not specified'}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <h2 style="margin:0 0 12px;color:#1e293b;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">
                Message
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2563eb;border-radius:0 8px 8px 0;padding:20px 24px;">
                    <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:12px;">
                          <a href="mailto:${email}?subject=Re: Your enquiry at Logic Matrix"
                             style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
                            &#9993; Reply Now
                          </a>
                        </td>
                        <td>
                          <a href="tel:${phone}"
                             style="display:inline-block;background:#ffffff;color:#2563eb;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;border:2px solid #2563eb;letter-spacing:0.3px;">
                            &#128222; Call Back
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1e293b;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.9);font-size:13px;font-weight:600;">Logic Matrix</p>
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">
                This email was automatically generated from your website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
