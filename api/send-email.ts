import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY manquante dans les variables d\'environnement Vercel');
    return res.status(500).json({
      error: 'Configuration serveur incomplète',
      details: 'RESEND_API_KEY missing in Vercel environment variables',
    });
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, phone, company, address, postalCode, city, vehicleType, message, recipients } = req.body;

    // Validation des données
    if (!name || !email || !phone || !message || !vehicleType || !recipients || recipients.length === 0) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    // Déterminer le libellé du type de demande
    const typeLabels: { [key: string]: string } = {
      'entretien-reparation': 'Entretien ou réparation poids lourd',
      'achat-pieces': 'Achat pièces détachées',
      'achat-isuzu': 'Achat véhicule Isuzu',
      'autre': 'Autre'
    };

    const typeLabel = typeLabels[vehicleType] || vehicleType;

    // Créer le contenu de l'email
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
              <h1 style="margin: 0;">📧 Nouvelle demande de contact</h1>
              <p style="margin: 5px 0 0 0;">VAL DE LOIRE V.I</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">🎯 Type de demande</span>
                <div class="value">${typeLabel}</div>
              </div>
              
              <div class="field">
                <span class="label">👤 Nom complet</span>
                <div class="value">${name}</div>
              </div>
              
              ${company ? `
                <div class="field">
                  <span class="label">🏢 Entreprise</span>
                  <div class="value">${company}</div>
                </div>
              ` : ''}
              
              <div class="field">
                <span class="label">📧 Email</span>
                <div class="value"><a href="mailto:${email}" style="color: #001e40;">${email}</a></div>
              </div>
              
              <div class="field">
                <span class="label">📞 Téléphone</span>
                <div class="value"><a href="tel:${phone}" style="color: #001e40;">${phone}</a></div>
              </div>
              
              ${address ? `
                <div class="field">
                  <span class="label">📍 Adresse complète</span>
                  <div class="value">
                    ${address}${postalCode || city ? '<br>' : ''}
                    ${postalCode ? postalCode + ' ' : ''}${city || ''}
                  </div>
                </div>
              ` : ''}
              
              <div class="field">
                <span class="label">💬 Message</span>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de contact du site VAL DE LOIRE V.I</p>
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

    // Envoyer l'email via Resend
    const data = await resend.emails.send({
      from: 'VAL DE LOIRE V.I <noreply@vdlvi.fr>',
      to: recipients,
      subject: `[${typeLabel}] Nouvelle demande de ${name}`,
      html: emailHtml,
      replyTo: email, // Permet de répondre directement au client
    });

    return res.status(200).json({ 
      success: true, 
      messageId: data.id,
      message: 'Email envoyé avec succès' 
    });

  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.message 
    });
  }
}
