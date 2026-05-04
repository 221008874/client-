// api/admin/register-verify.js
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Init Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64 || '{}')
    ),
  });
}

const db = getFirestore();
const auth = getAuth();

// Hash OTP for comparison
async function hashOtp(otp) {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp, fullName } = req.body;
  
  if (!email || !otp || !fullName) {
    return res.status(400).json({ error: 'Email, OTP, and full name are required' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const otpHash = await hashOtp(otp);

  try {
    // Fetch OTP record
    const otpRef = db.collection('saas_otp_requests').doc(normalizedEmail);
    const otpSnap = await otpRef.get();
    
    if (!otpSnap.exists) {
      return res.status(400).json({ error: 'No verification request found. Please request a new code.' });
    }

    const otpData = otpSnap.data();
    
    // Check expiry
    if (new Date() > otpData.expiry.toDate()) {
      await otpRef.delete();
      return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
    }
    
    // Check attempts (prevent brute force)
    if (otpData.attempts >= 5) {
      await otpRef.delete();
      return res.status(400).json({ error: 'Too many attempts. Please request a new code.' });
    }
    
    // Verify OTP
    if (otpData.otpHash !== otpHash) {
      // Increment attempts
      await otpRef.update({ attempts: otpData.attempts + 1 });
      return res.status(400).json({ error: 'Invalid verification code' });
    }
    
    // ✅ OTP verified — create Firebase Auth user with admin claim
    const userRecord = await auth.createUser({
      email: normalizedEmail,
      displayName: fullName,
      emailVerified: false,
      disabled: false,
    });
    
    // Set custom claim: admin: true
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });
    
    // Send email verification (optional but recommended)
    await auth.generateEmailVerificationLink(normalizedEmail);
    
    // Clean up OTP record
    await otpRef.delete();
    
    // Log registration event
    await db.collection('saas_audit_events').add({
      type: 'ADMIN_REGISTERED',
      email: normalizedEmail,
      uid: userRecord.uid,
      fullName,
      registeredAt: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    });

    return res.status(200).json({
      success: true,
      message: 'Admin account created successfully! Please check your email to verify your address.',
      uid: userRecord.uid,
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    
    // Handle specific Firebase errors
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }
    
    return res.status(500).json({ 
      error: 'Registration failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}