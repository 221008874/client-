import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// ─── Initialize Firebase Admin (singleton) ───────────────────────────────

if (!getApps().length) {
  try {
    const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64;
    
    if (!base64Key || base64Key.length < 50) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON_BASE64 is missing or too short');
    }
    
    const decoded = Buffer.from(base64Key, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(decoded);
    
    if (!serviceAccount.project_id || !serviceAccount.private_key) {
      throw new Error('Service account JSON is missing required fields');
    }
    
    initializeApp({ credential: cert(serviceAccount) });
    console.log('✅ Firebase Admin initialized (verify)');
    
  } catch (err) {
    console.error('❌ Firebase Admin init failed:', err.message);
  }
}

const db = getFirestore();
const auth = getAuth();

// ─── Hash OTP (must match register-request.js EXACTLY) ───────────────────

async function hashOtp(otp) {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ─── Main Handler ────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp, fullName, password } = req.body;
  const normalizedEmail = email?.toLowerCase().trim();

  // Validation
  if (!normalizedEmail || !otp || !fullName || !password) {
    return res.status(400).json({ error: 'Email, OTP, full name, and password are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // ─── 1. Retrieve stored OTP ─────────────────────────────────────────
    const otpDocRef = db.collection('saas_otp_requests').doc(normalizedEmail);
    const otpDoc = await otpDocRef.get();
    
    if (!otpDoc.exists) {
      return res.status(400).json({ error: 'No verification request found. Please request a new code.' });
    }

    const otpData = otpDoc.data();
    
    // ─── 2. Check expiry ──────────────────────────────────────────────────
    if (new Date() > new Date(otpData.expiry)) {
      await otpDocRef.delete(); // Clean up expired
      return res.status(400).json({ error: 'Verification code expired. Please request a new one.' });
    }

    // ─── 3. Check attempts ──────────────────────────────────────────────
    if (otpData.attempts >= 5) {
      await otpDocRef.delete(); // Clean up after max attempts
      return res.status(400).json({ error: 'Too many failed attempts. Please request a new code.' });
    }

    // ─── 4. Verify OTP hash ─────────────────────────────────────────────
    const inputHash = await hashOtp(otp);
    if (inputHash !== otpData.otpHash) {
      await otpDocRef.update({ attempts: (otpData.attempts || 0) + 1 });
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // ─── 5. Check if email already exists ────────────────────────────────
    try {
      const existingUser = await auth.getUserByEmail(normalizedEmail);
      if (existingUser) {
        return res.status(400).json({ error: 'This email is already registered' });
      }
    } catch (e) {
      if (e.code !== 'auth/user-not-found') throw e;
      // User not found = good, we can create
    }

    // ─── 6. Create Firebase user ────────────────────────────────────────
    const userRecord = await auth.createUser({
      email: normalizedEmail,
      password: password,
      displayName: fullName,
      emailVerified: true,
    });

    // ─── 7. Set admin custom claim ──────────────────────────────────────
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });

    // ─── 8. Store admin profile in Firestore ─────────────────────────────
    await db.collection('admins').doc(userRecord.uid).set({
      email: normalizedEmail,
      fullName: fullName,
      createdAt: new Date().toISOString(),
      role: 'admin',
      uid: userRecord.uid,
    });

    // ─── 9. Clean up OTP document ───────────────────────────────────────
    await otpDocRef.delete();

    console.log('✅ Admin created:', userRecord.uid);

    return res.status(200).json({ 
      success: true, 
      message: 'Admin account created successfully',
      uid: userRecord.uid 
    });

  } catch (error) {
    console.error('❌ Verify/Register error:', error);
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'This email is already registered' });
    }
    if (error.code === 'auth/invalid-password') {
      return res.status(400).json({ error: 'Password is too weak' });
    }
    
    return res.status(500).json({ error: 'Failed to create account. Please try again.' });
  }
}