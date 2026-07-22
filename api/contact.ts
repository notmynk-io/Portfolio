import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers for serverless execution
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, projectType, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: Please provide your name, email, and message.',
    });
  }

  const recipientEmail = 'notmynk.io@gmail.com';
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(`[Resend Vercel Serverless] RESEND_API_KEY environment variable is missing.`);
    console.log(`[Captured Message Details] Name: ${name} | Email: ${email} | Type: ${projectType}`);
    return res.status(200).json({
      success: true,
      message: `Your inquiry has been received! (Note: Please set RESEND_API_KEY in Vercel environment variables to enable live delivery to ${recipientEmail}).`,
      data: { name, email, projectType }
    });
  }

  try {
    const resend = new Resend(apiKey);
    const emailResponse = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio Inquiry] ${projectType || 'New Message'} from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #ffffff; color: #1e293b;">
          <div style="background-color: #0f172a; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #38bdf8; margin: 0; font-size: 20px;">New Portfolio Inquiry Received</h2>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 120px;">Sender Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Sender Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Project Category:</td>
              <td style="padding: 8px 0; color: #0f172a;">${projectType || 'General Inquiry'}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
            Sent via Resend from Vercel Serverless Function • Portfolio of Mayank Kumar Gupta
          </p>
        </div>
      `
    });

    if (emailResponse.error) {
      console.error('Resend delivery error:', emailResponse.error);
      return res.status(500).json({
        success: false,
        error: emailResponse.error.message || 'Failed to deliver email through Resend API.'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Thank you, ${name}! Your inquiry has been sent to Mayank (${recipientEmail}).`,
      id: emailResponse.data?.id
    });

  } catch (error: any) {
    console.error('Vercel Serverless Function Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error processing contact request.'
    });
  }
}
