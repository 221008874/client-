// api/admin/register-request.js
import nodemailer from 'nodemailer';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Init Firebase Admin (singleton)
if (!getApps().length) {
  initializeApp({
    credential: cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64 || '{}')
    ),
  });
}

const db = getFirestore();
const auth = getAuth();

// Secure random 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Hash OTP for storage (simple SHA-256)
async function hashOtp(otp) {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    // Check if user already exists and is admin
    try {
      const user = await auth.getUserByEmail(normalizedEmail);
      const claims = user.customClaims || {};
      if (claims.admin === true) {
        return res.status(400).json({ 
          error: 'This email is already registered as an admin' 
        });
      }
    } catch (e) {
      // User doesn't exist yet — that's fine, continue
      if (e.code !== 'auth/user-not-found') throw e;
    }

    // Generate and hash OTP
    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP request in Firestore
    await db.collection('saas_otp_requests').doc(normalizedEmail).set({
      otpHash,
      expiry,
      requestedAt: new Date(),
      attempts: 0,
      verified: false,
    });

    // Send email via Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER, // e.g., "bedoboda22222@gmail.com"
        pass: process.env.GMAIL_APP_PASSWORD, // NEW app password
      },
    });

    await transporter.sendMail({
      from: `"Smart Clinic Admin" <${process.env.GMAIL_USER}>`,
      to: normalizedEmail,
      subject: '🔐 Your Admin Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0fb8a6; text-align: center;">Smart Clinic Admin</h2>
          <p>Hello,</p>
          <p>You requested verification to register as a Smart Clinic admin.</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="background: #0fb8a6; color: white; padding: 12px 24px; border-radius: 6px; font-size: 24px; font-weight: bold; letter-spacing: 4px;">
              ${otp}
            </span>
          </div>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #999; font-size: 11px;">Smart Clinic Admin Portal • Secure License Management</p>
        </div>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code sent to your email',
      email: normalizedEmail 
    });

  } catch (error) {
    console.error('OTP request error:', error);
    return res.status(500).json({ 
      error: 'Failed to send verification code',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}