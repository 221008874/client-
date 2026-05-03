import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";

// ─── COLLECTION NAMESPACES (Prevent cross-service conflicts) ─────────────────
export const COLLECTIONS = {
  // SaaS Admin scope (admin panel only)
  SAAS_TENANTS: "saas_tenants",
  SAAS_DOCTORS: "saas_doctors",
  SAAS_LICENSES: "saas_licenses",
  SAAS_SETTINGS: "saas_settings",
  
  // Community/Booking scope (public + patient flow)
  COMM_DOCTORS: "comm_doctors",
  COMM_APPOINTMENTS: "comm_appointments",
  COMM_PATIENTS: "comm_patients",
  
  // Local Server sync scope (per-license isolated)
  SYNC_QUEUE: "sync_queue",
  SYNC_LOG: "sync_log",
  SERVERS: "clinic_servers",
  
  // Cross-service audit
  AUDIT_EVENTS: "saas_audit_events",
  INVALID_REPORTS: "invalid_reports",
};

// ─── LICENSES (SaaS Admin scope) ────────────────────────────────────────────

export const createLicense = async (licenseData) => {
  const { licenseKey, ...data } = licenseData;
  await setDoc(doc(db, COLLECTIONS.SAAS_LICENSES, licenseKey), {
    ...data,
    licenseKey,
    status: "ACTIVE",
    expired: false,
    deviceId: null,
    createdAt: serverTimestamp(),
  });
};

export const getAllLicenses = async () => {
  const q = query(collection(db, COLLECTIONS.SAAS_LICENSES), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateLicenseStatus = async (docId, newStatus) => {
  await updateDoc(doc(db, COLLECTIONS.SAAS_LICENSES, docId), { status: newStatus });
};

export const updateLicenseExpiry = async (licenseKey, newExpiryDate) => {
  await updateDoc(doc(db, COLLECTIONS.SAAS_LICENSES, licenseKey), {
    expiryDate: newExpiryDate,
    status: "ACTIVE",
    expired: false,
  });
};

// ─── TENANTS (SaaS Admin scope) ─────────────────────────────────────────────

export const createTenant = async (tenantData) => {
  const ref = await addDoc(collection(db, COLLECTIONS.SAAS_TENANTS), {
    ...tenantData,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const getAllTenants = async () => {
  const q = query(collection(db, COLLECTIONS.SAAS_TENANTS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTenantStatus = async (tenantId, newStatus) => {
  await updateDoc(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId), { status: newStatus });
};

export const updateTenant = async (tenantId, updates) => {
  await updateDoc(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteTenant = async (tenantId) => {
  await deleteDoc(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId));
};

// ─── DOCTORS (Dual scope: SAAS for admin, COMM for public) ──────────────────

/**
 * Create doctor in SAAS scope (admin panel)
 */
export const createDoctor = async (doctorData) => {
  const ref = await addDoc(collection(db, COLLECTIONS.SAAS_DOCTORS), {
    ...doctorData,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

/**
 * Get doctors for admin panel (SAAS scope)
 */
export const getAllDoctors = async () => {
  const q = query(collection(db, COLLECTIONS.SAAS_DOCTORS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get doctors for public community app (COMM scope) - only active, public fields
 */
export const getPublicDoctors = async () => {
  const q = query(
    collection(db, COLLECTIONS.COMM_DOCTORS),
    where("active", "==", true),
    where("visibility", "==", "PUBLIC"),
    orderBy("name")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    // Return only public-safe fields
    return {
      id: doc.id,
      name: data.name,
      specialty: data.specialty,
      clinicName: data.clinicName,
      city: data.city,
      photoUrl: data.photoUrl,
      workingDays: data.workingDays,
      timeSlots: data.timeSlots,
      availableToday: data.availableToday,
      bio: data.bio,
      education: data.education,
      languages: data.languages,
      yearsOfExperience: data.yearsOfExperience,
    };
  });
};

/**
 * Get doctors filtered by tenant (for clinic staff views)
 */
export const getDoctorsByTenant = async (tenantId) => {
  const q = query(
    collection(db, COLLECTIONS.SAAS_DOCTORS),
    where("tenantId", "==", tenantId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateDoctorStatus = async (doctorId, newStatus) => {
  await updateDoc(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId), { status: newStatus });
};

export const updateDoctor = async (doctorId, updates) => {
  await updateDoc(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteDoctor = async (doctorId) => {
  await deleteDoc(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId));
};

// ─── PATIENTS & APPOINTMENTS (Community/Booking scope) ──────────────────────

export const createPatient = async (patientData) => {
  const { phone, ...data } = patientData;
  // Phone as doc ID for O(1) lookup, but store in COMM scope
  await setDoc(doc(db, COLLECTIONS.COMM_PATIENTS, phone), {
    ...data,
    phone,
    synced: false,
    lastUpdated: serverTimestamp(),
  });
};

export const lookupPatient = async (phone) => {
  const ref = doc(db, COLLECTIONS.COMM_PATIENTS, phone);
  const snap = await getDocs(ref);
  if (snap.exists()) return { id: snap.id, ...snap.data() };
  return null;
};

export const createAppointment = async (appointmentData) => {
  const ref = await addDoc(collection(db, COLLECTIONS.COMM_APPOINTMENTS), {
    ...appointmentData,
    status: "SCHEDULED",
    synced: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

/**
 * Get appointments for a patient (with tenant isolation)
 */
export const getAppointmentsByPatient = async (patientPhone, tenantId = null) => {
  let q = query(
    collection(db, COLLECTIONS.COMM_APPOINTMENTS),
    where("patientPhone", "==", patientPhone),
    orderBy("createdAt", "desc")
  );
  
  // Add tenant filter if provided (for clinic staff views)
  if (tenantId) {
    q = query(q, where("tenantId", "==", tenantId));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get unsynced appointments for a specific tenant/license (for local server sync)
 * Uses pagination to prevent OOM
 */
export const getUnsyncedAppointments = async ({ licenseKey, tenantId, lastDoc = null, batchSize = 100 }) => {
  let q = query(
    collection(db, COLLECTIONS.COMM_APPOINTMENTS),
    where("synced", "==", false),
    where("licenseKey", "==", licenseKey), // ← critical isolation
    orderBy("createdAt", "asc"),
    limit(batchSize)
  );
  
  if (tenantId) {
    q = query(q, where("tenantId", "==", tenantId));
  }
  
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }
  
  const snapshot = await getDocs(q);
  return {
    docs: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null,
    hasMore: snapshot.docs.length === batchSize,
  };
};

// ─── SYNC QUEUE (Partitioned by licenseKey) ─────────────────────────────────

export const queueSyncAppointment = async ({ licenseKey, tenantId, appointmentId, patientPhone, doctorId }) => {
  await addDoc(collection(db, COLLECTIONS.SYNC_QUEUE), {
    licenseKey,      // ← partition key for isolation
    tenantId,        // ← secondary isolation
    appointmentId,
    patientPhone,
    doctorId,
    status: "PENDING",
    retryCount: 0,
    createdAt: serverTimestamp(),
    nextRetry: null,
  });
};

export const getPendingSyncItems = async ({ licenseKey, batchSize = 20 }) => {
  const q = query(
    collection(db, COLLECTIONS.SYNC_QUEUE),
    where("licenseKey", "==", licenseKey), // ← only fetch own items
    where("status", "in", ["PENDING", "FAILED"]),
    where("retryCount", "<", 5),
    orderBy("createdAt", "asc"),
    limit(batchSize)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const markSyncComplete = async (queueItemId) => {
  await deleteDoc(doc(db, COLLECTIONS.SYNC_QUEUE, queueItemId));
};

export const markSyncFailed = async (queueItemId, error, retryCount) => {
  await updateDoc(doc(db, COLLECTIONS.SYNC_QUEUE, queueItemId), {
    status: "FAILED",
    lastError: error,
    retryCount,
    nextRetry: serverTimestamp(), // Cloud Function can filter by this
  });
};

// ─── INVALID REPORTS ────────────────────────────────────────────────────────

export const logInvalidAttempt = async (data) => {
  await addDoc(collection(db, COLLECTIONS.INVALID_REPORTS), {
    ...data,
    timestamp: serverTimestamp(),
  });
};

export const getInvalidReports = async () => {
  const q = query(collection(db, COLLECTIONS.INVALID_REPORTS), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ─── SERVER REGISTRATION (Local clinic instances) ───────────────────────────

export const registerClinicServer = async ({ macAddress, licenseKey, tunnelUrl, localIp, port, version }) => {
  await setDoc(doc(db, COLLECTIONS.SERVERS, macAddress), {
    macAddress,
    licenseKey,
    tunnelUrl,
    localIp,
    port,
    status: "ONLINE",
    lastSeen: serverTimestamp(),
    version,
    registeredAt: serverTimestamp(),
  });
};

export const updateServerHeartbeat = async (macAddress, updates) => {
  await updateDoc(doc(db, COLLECTIONS.SERVERS, macAddress), {
    ...updates,
    lastSeen: serverTimestamp(),
  });
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