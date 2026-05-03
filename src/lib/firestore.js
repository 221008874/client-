import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { COLLECTIONS } from "./collections";

// ─── Firebase Config (Admin Panel specific) ────────────────────────────────
// Load from environment variables - NEVER hardcode
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (singleton pattern)
let app;
if (!app) {
  app = initializeApp(firebaseConfig);
}

export const db = getFirestore(app);
export const auth = getAuth(app);

// ─── ADMIN-ONLY FIRESTORE SERVICE FUNCTIONS ────────────────────────────────
// These functions ONLY access SAAS_* collections.
// They are NOT imported or used by the Community App.

import {
  collection, getDocs, doc, setDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp, where, limit, startAfter,
} from "firebase/firestore";

// ─── LICENSES (SaaS Admin scope) ───────────────────────────────────────────
export const createLicense = async (licenseData) => {
  const { licenseKey, ...data } = licenseData;
  await setDoc(doc(db, COLLECTIONS.LICENSES, licenseKey), {
    ...data,
    licenseKey,
    status: "ACTIVE",
    expired: false,
    deviceId: null,
    createdAt: serverTimestamp(),
  });
};

export const getAllLicenses = async () => {
  const q = query(collection(db, COLLECTIONS.LICENSES), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateLicenseStatus = async (docId, newStatus) => {
  await updateDoc(doc(db, COLLECTIONS.LICENSES, docId), { status: newStatus });
};

export const updateLicenseExpiry = async (licenseKey, newExpiryDate) => {
  await updateDoc(doc(db, COLLECTIONS.LICENSES, licenseKey), {
    expiryDate: newExpiryDate,
    status: "ACTIVE",
    expired: false,
  });
};

// ─── TENANTS (SaaS Admin scope) ────────────────────────────────────────────
export const createTenant = async (tenantData) => {
  const ref = await addDoc(collection(db, COLLECTIONS.TENANTS), {
    ...tenantData,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const getAllTenants = async () => {
  const q = query(collection(db, COLLECTIONS.TENANTS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTenant = async (tenantId, updates) => {
  await updateDoc(doc(db, COLLECTIONS.TENANTS, tenantId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteTenant = async (tenantId) => {
  await deleteDoc(doc(db, COLLECTIONS.TENANTS, tenantId));
};

// ─── DOCTORS (SaaS Admin scope - internal management) ──────────────────────
export const createDoctor = async (doctorData) => {
  const ref = await addDoc(collection(db, COLLECTIONS.DOCTORS), {
    ...doctorData,
    status: "ACTIVE",
    visibility: "PRIVATE", // Admin-created doctors start private
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const getAllDoctors = async () => {
  const q = query(collection(db, COLLECTIONS.DOCTORS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDoctorsByTenant = async (tenantId) => {
  const q = query(
    collection(db, COLLECTIONS.DOCTORS),
    where("tenantId", "==", tenantId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateDoctor = async (doctorId, updates) => {
  await updateDoc(doc(db, COLLECTIONS.DOCTORS, doctorId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteDoctor = async (doctorId) => {
  await deleteDoc(doc(db, COLLECTIONS.DOCTORS, doctorId));
};

// ─── SERVER MONITORING (Admin read-only) ───────────────────────────────────
export const getAllClinicServers = async () => {
  const q = query(collection(db, COLLECTIONS.SERVERS), orderBy("lastSeen", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getServerByLicense = async (licenseKey) => {
  const q = query(
    collection(db, COLLECTIONS.SERVERS),
    where("licenseKey", "==", licenseKey),
    where("status", "==", "ONLINE"),
    orderBy("lastSeen", "desc"),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

// ─── AUDIT LOGS (Admin read-only) ──────────────────────────────────────────
export const getAuditEvents = async ({ limit = 50, offset = 0 }) => {
  const q = query(
    collection(db, COLLECTIONS.AUDIT_EVENTS),
    orderBy("timestamp", "desc"),
    limit(limit),
    startAfter(offset)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};