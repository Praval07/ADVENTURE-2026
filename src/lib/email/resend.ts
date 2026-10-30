export interface EmailPayload {
  to: string;
  subject: string;
  template: 
    | 'registration_confirmation'
    | 'photo_approved'
    | 'photo_rejected'
    | 'video_submitted'
    | 'results_published'
    | 'certificate_ready';
  variables: Record<string, string>;
}

export async function sendEmailNotification(payload: EmailPayload): Promise<{ success: boolean; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      `[Resend Simulated Notification] To: ${payload.to} | Subject: "${payload.subject}" | Template: ${payload.template}`
    );
    return { success: true, id: `sim-${Date.now()}` };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'ADVENTURE 2026 <iic.recpratapgarh@gmail.com>',
        to: payload.to,
        subject: payload.subject,
        html: generateEmailHtml(payload.template, payload.variables),
      }),
    });

    const data = await response.json();
    return { success: response.ok, id: data.id };
  } catch (error) {
    console.error('Failed to send email via Resend:', error);
    return { success: false };
  }
}

function generateEmailHtml(template: EmailPayload['template'], vars: Record<string, string>): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0f12; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #282f3d;">
      <div style="border-bottom: 1px solid #282f3d; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #ff5b26; margin: 0; font-size: 20px;">ADVENTURE 2026</h2>
        <p style="color: #9ca3af; margin: 4px 0 0 0; font-size: 12px;">Institution's Innovation Council (IIC) × Skill Development Cell (SDC), BRBBARECP</p>
      </div>

      <h3 style="color: #ffffff; font-size: 18px; margin-top: 0;">${vars.headline || 'Official Event Update'}</h3>
      <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">${vars.message || ''}</p>

      ${vars.actionUrl ? `
        <div style="margin: 24px 0;">
          <a href="${vars.actionUrl}" style="background: #ff5b26; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
            ${vars.actionText || 'Open Portal'}
          </a>
        </div>
      ` : ''}

      <div style="border-top: 1px solid #282f3d; padding-top: 16px; margin-top: 24px; font-size: 11px; color: #6b7280;">
        <p>This is an automated notification from ADVENTURE 2026. For queries, email iic.recpratapgarh@gmail.com.</p>
        <p>Bharat Ratna Babasaheb Bhimrao Ambedkar REC, Pratapgarh, Uttar Pradesh, India.</p>
      </div>
    </div>
  `;
}
