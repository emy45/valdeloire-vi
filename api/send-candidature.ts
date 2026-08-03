import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY manquante' });
  }

  const resend = new Resend(apiKey);

  const { firstName, lastName, email, phone, position, message, cvBase64, cvName, honeypot } = req.body;

  // Honeypot : si rempli, c'est un bot
  if (honeypot) {
    return res.status(200).json({ success: true });
  }

  if (!firstName || !lastName || !email || !phone || !position || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #001e40; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #001e40; display: block; margin-bottom: 5px; }
          .value { background-color: white; padding: 10px; border-left: 3px solid #001e40; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📋 Nouvelle candidature</h1>
            <p style="margin: 5px 0 0 0;">VAL DE LOIRE V.I</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Candidat</span>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <span class="label">💼 Poste recherché</span>
              <div class="value">${position}</div>
            </div>
            <div class="field">
              <span class="label">📧 Email</span>
              <div class="value"><a href="mailto:${email}" style="color: #001e40;">${email}</a></div>
            </div>
            <div class="field">
              <span class="label">📞 Téléphone</span>
              <div class="value"><a href="tel:${phone}" style="color: #001e40;">${phone}</a></div>
            </div>
            <div class="field">
              <span class="label">💬 Message / Lettre de motivation</span>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
            ${cvBase64 ? '<div class="field"><span class="label">📎 CV</span><div class="value">CV joint en pièce jointe</div></div>' : ''}
            <div class="footer">
              <p>Candidature reçue depuis le site VAL DE LOIRE V.I</p>
              <p>Date : ${new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const attachments = cvBase64
      ? [{ filename: cvName || 'CV.pdf', content: cvBase64 }]
      : [];

    await resend.emails.send({
      from: 'VAL DE LOIRE V.I <noreply@vdlvi.fr>',
      to: ['a.auchere@sodimavi.fr', 'e.richard@sodimavi.fr'],
      subject: `[Candidature] ${firstName} ${lastName} — ${position}`,
      html: emailHtml,
      replyTo: email,
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Erreur envoi candidature:', error);
    return res.status(500).json({ error: error.message });
  }
}
