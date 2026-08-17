import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Mailer] SMTP not configured. Email would be sent to:', to);
    console.log('[Mailer] Subject:', subject);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"Oak & Code" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('[Mailer] Failed to send email:', error);
    return false;
  }
}

export function contactConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0D1F0D; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #D4AF37; margin: 0;">Oak & Code</h1>
        <p style="color: #F5EFE0; margin: 10px 0 0;">Rooted in Strategy. Built for Growth.</p>
      </div>
      <div style="background: #fff; padding: 30px; border: 1px solid #eee; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1B3A1B;">Thank you, ${name}!</h2>
        <p>We've received your project inquiry and our team is already reviewing it.</p>
        <p><strong>What happens next?</strong></p>
        <ul>
          <li>You'll receive a call from us within <strong>2 hours</strong> on business days</li>
          <li>We'll discuss your project goals and timeline</li>
          <li>You'll receive a custom proposal within 24 hours</li>
        </ul>
        <p>Questions? Reply to this email or WhatsApp us at +91 98765 43210.</p>
        <p style="color: #888; font-size: 14px; margin-top: 30px;">
          — The Oak & Code Team<br>
          Vadodara, Gujarat, India
        </p>
      </div>
    </body>
    </html>
  `;
}

export function adminNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #D4AF37;">🆕 New Lead — Oak & Code</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>City:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.city}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Services:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.services.join(', ')}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Budget:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.budget}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Timeline:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.timeline}</td></tr>
      </table>
      <p style="margin-top: 20px;"><strong>Description:</strong></p>
      <p style="background: #f5f5f5; padding: 15px; border-radius: 4px;">${data.description}</p>
    </body>
    </html>
  `;
}

export function auditConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0D1F0D; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #D4AF37; margin: 0;">Free Website Audit</h1>
      </div>
      <div style="background: #fff; padding: 30px; border: 1px solid #eee;">
        <h2>Hi ${name},</h2>
        <p>Your free website audit request has been received! Our team will analyze your site and send you a detailed report within 48 hours.</p>
        <p>The audit covers: performance, SEO, mobile responsiveness, conversion optimization, and security.</p>
        <p style="color: #888;">— Oak & Code Team</p>
      </div>
    </body>
    </html>
  `;
}
