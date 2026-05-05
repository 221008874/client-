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
  getDoc,
} from "firebase/firestore";

// ─── CRITICAL: db must be from the SAME modular SDK instance ──────────────
import { db } from "../firebase";

export const COLLECTIONS = {
  SAAS_TENANTS:      "saas_tenants",
  SAAS_DOCTORS:      "saas_doctors",
  SAAS_LICENSES:     "saas_licenses",
  SAAS_SETTINGS:     "saas_settings",
  COMM_DOCTORS:      "comm_doctors",
  COMM_TENANTS:      "comm_tenants",
  COMM_APPOINTMENTS: "comm_appointments",
  COMM_PATIENTS:     "comm_patients",
  SYNC_QUEUE:        "sync_queue",
  SERVERS:           "clinic_servers",
};

// ─── PUBLIC-SAFE FIELD BUILDERS ─────────────────────────────────────────────
function buildPublicDoctor(data, doctorId) {
  return {
    name: data.name || '',
    specialty: data.specialization || data.specialty || '',
    bio: data.bio || '',
    photoUrl: data.photoUrl || '',
    tenantId: data.tenantId || data.clinicId || '',
    clinicName: data.tenantName || data.clinicName || '',
    city: data.city || '',
    address: data.address || '',
    workingDays: data.workingDays || [],
    timeSlots: data.timeSlots || [],
    education: data.education || '',
    languages: data.languages || [],
    yearsOfExperience: data.yearsOfExperience || null,
    active: data.status === 'ACTIVE',
    visibility: data.status === 'ACTIVE' ? 'PUBLIC' : 'HIDDEN',
    availableToday: false,
    _syncedAt: new Date().toISOString(),
    _sourceId: doctorId,
  };
}
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const createDoctorWithAuth = async (doctorData) => {
  const auth = getAuth();
  
  // 1. Create the doctor profile (existing dual-write)
  const doctorId = await createDoctor(doctorData);
  
  // 2. Create Firebase Auth account
  if (doctorData.email && doctorData.password) {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth, 
        doctorData.email, 
        doctorData.password
      );
      
      // 3. Create mapping in comm_doctor_users
      await setDoc(doc(db, COLLECTIONS.COMM_DOCTOR_USERS, doctorData.email), {
        doctorId: doctorId,
        email: doctorData.email,
        createdAt: serverTimestamp(),
      });
      
      console.log('Doctor auth account created:', userCred.user.uid);
    } catch (e) {
      console.error('Failed to create auth account:', e);
      // Don't fail the whole operation — auth can be set up later
    }
  }
  
  return doctorId;
};
function buildPublicTenant(data, tenantId) {
  return {
    id: tenantId,
    name: data.name || data.clinicName || 'Unknown Clinic',
    city: data.city || '',
    address: data.address || '',
    logoUrl: data.logoUrl || '',
    description: data.description || '',
    active: data.status === 'ACTIVE',
    visibility: data.status === 'ACTIVE' ? 'PUBLIC' : 'HIDDEN',
    _syncedAt: new Date().toISOString(),
    _sourceId: tenantId,
  };
}

// ─── LICENSES ───────────────────────────────────────────────────────────────

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

// ─── TENANTS (SaaS + COMM dual-write) ─────────────────────────────────────

export const createTenant = async (tenantData) => {
  // 1. Write to saas_tenants
  const saasRef = await addDoc(collection(db, COLLECTIONS.SAAS_TENANTS), {
    ...tenantData,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });

  // 2. Mirror to comm_tenants
  const publicTenant = buildPublicTenant(
    { ...tenantData, status: 'ACTIVE' },
    saasRef.id
  );
  await setDoc(doc(db, COLLECTIONS.COMM_TENANTS, saasRef.id), publicTenant);

  return saasRef.id;
};

export const getAllTenants = async () => {
  const q = query(collection(db, COLLECTIONS.SAAS_TENANTS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTenantStatus = async (tenantId, newStatus) => {
  // 1. Update saas_tenants
  await updateDoc(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId), { status: newStatus });

  // 2. Sync visibility to comm_tenants
  await updateDoc(doc(db, COLLECTIONS.COMM_TENANTS, tenantId), {
    active: newStatus === 'ACTIVE',
    visibility: newStatus === 'ACTIVE' ? 'PUBLIC' : 'HIDDEN',
    _syncedAt: new Date().toISOString(),
  });
};

export const updateTenant = async (tenantId, updates) => {
  // 1. Update saas_tenants
  await updateDoc(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  // 2. Sync allowed fields to comm_tenants
  const publicUpdates = {};
  ['name', 'clinicName', 'city', 'address', 'logoUrl', 'description'].forEach(f => {
    if (updates[f] !== undefined) publicUpdates[f] = updates[f];
  });
  if (Object.keys(publicUpdates).length > 0) {
    publicUpdates._syncedAt = new Date().toISOString();
    await updateDoc(doc(db, COLLECTIONS.COMM_TENANTS, tenantId), publicUpdates);
  }
};

export const deleteTenant = async (tenantId) => {
  // 1. Delete from saas_tenants
  await deleteDoc(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId));

  // 2. Delete from comm_tenants
  await deleteDoc(doc(db, COLLECTIONS.COMM_TENANTS, tenantId));

  // 3. Hide associated doctors in comm_doctors
  const doctorsQuery = query(
    collection(db, COLLECTIONS.COMM_DOCTORS),
    where("tenantId", "==", tenantId)
  );
  const doctorsSnap = await getDocs(doctorsQuery);
  for (const d of doctorsSnap.docs) {
    await updateDoc(d.ref, {
      active: false,
      visibility: 'HIDDEN',
      _syncedAt: new Date().toISOString(),
    });
  }
};

// ─── DOCTORS (SaaS + COMM dual-write) ─────────────────────────────────────

export const createDoctor = async (doctorData) => {
  // 1. Write to saas_doctors
  const saasRef = await addDoc(collection(db, COLLECTIONS.SAAS_DOCTORS), {
    ...doctorData,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });

  // 2. Mirror to comm_doctors (public-safe, stripped)
  const publicDoctor = buildPublicDoctor(
    { ...doctorData, status: 'ACTIVE' },
    saasRef.id
  );
  await setDoc(doc(db, COLLECTIONS.COMM_DOCTORS, saasRef.id), publicDoctor);

  // 3. Ensure tenant exists in comm_tenants
  if (doctorData.tenantId) {
    const tenantSnap = await getDoc(doc(db, COLLECTIONS.COMM_TENANTS, doctorData.tenantId));
    if (!tenantSnap.exists()) {
      const saasTenantSnap = await getDoc(doc(db, COLLECTIONS.SAAS_TENANTS, doctorData.tenantId));
      const tenantName = saasTenantSnap.exists() ? saasTenantSnap.data().name : 'Unknown Clinic';
      await setDoc(doc(db, COLLECTIONS.COMM_TENANTS, doctorData.tenantId), {
        id: doctorData.tenantId,
        name: tenantName,
        active: true,
        visibility: 'PUBLIC',
        _syncedAt: new Date().toISOString(),
      });
    }
  }

  return saasRef.id;
};

export const getAllDoctors = async () => {
  const q = query(collection(db, COLLECTIONS.SAAS_DOCTORS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getPublicDoctors = async () => {
  const q = query(
    collection(db, COLLECTIONS.COMM_DOCTORS),
    where("active", "==", true),
    where("visibility", "==", "PUBLIC"),
    orderBy("name")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

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
  // 1. Update saas_doctors
  await updateDoc(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId), { status: newStatus });

  // 2. Sync visibility to comm_doctors
  await updateDoc(doc(db, COLLECTIONS.COMM_DOCTORS, doctorId), {
    active: newStatus === 'ACTIVE',
    visibility: newStatus === 'ACTIVE' ? 'PUBLIC' : 'HIDDEN',
    _syncedAt: new Date().toISOString(),
  });
};

export const updateDoctor = async (doctorId, updates) => {
  // 1. Update saas_doctors
  await updateDoc(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  // 2. Sync allowed fields to comm_doctors
  const publicUpdates = {};
  ['name', 'specialization', 'specialty', 'bio', 'photoUrl', 'tenantId', 'clinicId',
   'clinicName', 'tenantName', 'city', 'address', 'workingDays', 'timeSlots',
   'education', 'languages', 'yearsOfExperience'].forEach(f => {
    if (updates[f] !== undefined) publicUpdates[f] = updates[f];
  });
  if (updates.specialization !== undefined) {
    publicUpdates.specialty = updates.specialization;
  }
  if (Object.keys(publicUpdates).length > 0) {
    publicUpdates._syncedAt = new Date().toISOString();
    await updateDoc(doc(db, COLLECTIONS.COMM_DOCTORS, doctorId), publicUpdates);
  }
};

export const deleteDoctor = async (doctorId) => {
  // 1. Delete from saas_doctors
  await deleteDoc(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId));

  // 2. Delete from comm_doctors
  await deleteDoc(doc(db, COLLECTIONS.COMM_DOCTORS, doctorId));
};

// ─── PATIENTS & APPOINTMENTS ────────────────────────────────────────────────

export const createPatient = async (patientData) => {
  const { phone, ...data } = patientData;
  await setDoc(doc(db, COLLECTIONS.COMM_PATIENTS, phone), {
    ...data,
    phone,
    synced: false,
    lastUpdated: serverTimestamp(),
  });
};

export const lookupPatient = async (phone) => {
  const ref = doc(db, COLLECTIONS.COMM_PATIENTS, phone);
  const snap = await getDoc(ref);
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

export const getAppointmentsByPatient = async (patientPhone, tenantId = null) => {
  let q = query(
    collection(db, COLLECTIONS.COMM_APPOINTMENTS),
    where("patientPhone", "==", patientPhone),
    orderBy("createdAt", "desc")
  );
  if (tenantId) {
    q = query(q, where("tenantId", "==", tenantId));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUnsyncedAppointments = async ({ licenseKey, tenantId, lastDoc = null, batchSize = 100 }) => {
  let q = query(
    collection(db, COLLECTIONS.COMM_APPOINTMENTS),
    where("synced", "==", false),
    where("licenseKey", "==", licenseKey),
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

// ─── SYNC QUEUE ─────────────────────────────────────────────────────────────

export const queueSyncAppointment = async ({ licenseKey, tenantId, appointmentId, patientPhone, doctorId }) => {
  await addDoc(collection(db, COLLECTIONS.SYNC_QUEUE), {
    licenseKey,
    tenantId,
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
    where("licenseKey", "==", licenseKey),
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
    nextRetry: serverTimestamp(),
  });
};

// ─── SERVER REGISTRATION ──────────────────────────────────────────────────

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
