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
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";

// ─── COLLECTION NAMESPACES ──────────────────────────────────────────────────
export const COLLECTIONS = {
  SAAS_TENANTS:   "saas_tenants",
  SAAS_DOCTORS:   "saas_doctors",
  SAAS_LICENSES:  "saas_licenses",
  SAAS_SETTINGS:  "saas_settings",
  COMM_DOCTORS:   "comm_doctors",
  COMM_TENANTS:   "comm_tenants",
  COMM_APPOINTMENTS: "comm_appointments",
  COMM_PATIENTS:  "comm_patients",
  SYNC_QUEUE:     "sync_queue",
  SERVERS:        "clinic_servers",
};

// ─── PUBLIC-SAFE FIELD FILTER ───────────────────────────────────────────────
const PUBLIC_DOCTOR_FIELDS = [
  'name', 'specialty', 'specialization', 'bio', 'photoUrl',
  'tenantId', 'clinicId', 'clinicName', 'tenantName',
  'city', 'address',
  'workingDays', 'timeSlots',
  'education', 'languages', 'yearsOfExperience',
];

const PUBLIC_TENANT_FIELDS = [
  'name', 'clinicName', 'city', 'address', 'logoUrl', 'description',
];

function buildPublicDoctor(data, doctorId) {
  const mapped = {
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
  return mapped;
}

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
  const ref = await addDoc(collection(db, COLLECTIONS.SAAS_TENANTS), {
    ...tenantData,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });

  // 2. Mirror to comm_tenants (public-safe)
  const publicTenant = buildPublicTenant(
    { ...tenantData, status: 'ACTIVE' },
    ref.id
  );
  await setDoc(doc(db, COLLECTIONS.COMM_TENANTS, ref.id), publicTenant);

  return ref.id;
};

export const getAllTenants = async () => {
  const q = query(collection(db, COLLECTIONS.SAAS_TENANTS), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTenantStatus = async (tenantId, newStatus) => {
  const batch = writeBatch(db);

  // 1. Update saas_tenants
  batch.update(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId), { status: newStatus });

  // 2. Sync visibility to comm_tenants
  batch.update(doc(db, COLLECTIONS.COMM_TENANTS, tenantId), {
    active: newStatus === 'ACTIVE',
    visibility: newStatus === 'ACTIVE' ? 'PUBLIC' : 'HIDDEN',
    _syncedAt: new Date().toISOString(),
  });

  await batch.commit();
};

export const updateTenant = async (tenantId, updates) => {
  const batch = writeBatch(db);

  // 1. Update saas_tenants
  batch.update(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  // 2. Sync allowed fields to comm_tenants
  const publicUpdates = {};
  PUBLIC_TENANT_FIELDS.forEach(f => {
    if (updates[f] !== undefined) publicUpdates[f] = updates[f];
  });
  if (Object.keys(publicUpdates).length > 0) {
    publicUpdates._syncedAt = new Date().toISOString();
    batch.update(doc(db, COLLECTIONS.COMM_TENANTS, tenantId), publicUpdates);
  }

  await batch.commit();
};

export const deleteTenant = async (tenantId) => {
  const batch = writeBatch(db);

  // 1. Delete from saas_tenants
  batch.delete(doc(db, COLLECTIONS.SAAS_TENANTS, tenantId));

  // 2. Delete from comm_tenants
  batch.delete(doc(db, COLLECTIONS.COMM_TENANTS, tenantId));

  // 3. Hide all associated doctors in comm_doctors
  const doctorsQuery = query(
    collection(db, COLLECTIONS.COMM_DOCTORS),
    where("tenantId", "==", tenantId)
  );
  const doctorsSnap = await getDocs(doctorsQuery);
  doctorsSnap.docs.forEach(d => {
    batch.update(d.ref, {
      active: false,
      visibility: 'HIDDEN',
      _syncedAt: new Date().toISOString(),
    });
  });

  await batch.commit();
};

// ─── DOCTORS (SaaS + COMM dual-write) ─────────────────────────────────────

export const createDoctor = async (doctorData) => {
  // 1. Write to saas_doctors
  const ref = await addDoc(collection(db, COLLECTIONS.SAAS_DOCTORS), {
    ...doctorData,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });

  // 2. Mirror to comm_doctors (public-safe, stripped)
  const publicDoctor = buildPublicDoctor(
    { ...doctorData, status: 'ACTIVE' },
    ref.id
  );
  await setDoc(doc(db, COLLECTIONS.COMM_DOCTORS, ref.id), publicDoctor);

  // 3. Ensure tenant exists in comm_tenants
  if (doctorData.tenantId) {
    const tenantSnap = await getDocs(doc(db, COLLECTIONS.COMM_TENANTS, doctorData.tenantId));
    if (!tenantSnap.exists()) {
      // Fetch tenant name from saas_tenants
      const saasTenantSnap = await getDocs(doc(db, COLLECTIONS.SAAS_TENANTS, doctorData.tenantId));
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

  return ref.id;
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
  const batch = writeBatch(db);

  // 1. Update saas_doctors
  batch.update(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId), { status: newStatus });

  // 2. Sync visibility to comm_doctors
  batch.update(doc(db, COLLECTIONS.COMM_DOCTORS, doctorId), {
    active: newStatus === 'ACTIVE',
    visibility: newStatus === 'ACTIVE' ? 'PUBLIC' : 'HIDDEN',
    _syncedAt: new Date().toISOString(),
  });

  await batch.commit();
};

export const updateDoctor = async (doctorId, updates) => {
  const batch = writeBatch(db);

  // 1. Update saas_doctors
  batch.update(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  // 2. Sync allowed fields to comm_doctors
  const publicUpdates = {};
  PUBLIC_DOCTOR_FIELDS.forEach(f => {
    if (updates[f] !== undefined) publicUpdates[f] = updates[f];
  });
  // Map specialization → specialty for community
  if (updates.specialization !== undefined) {
    publicUpdates.specialty = updates.specialization;
  }
  if (Object.keys(publicUpdates).length > 0) {
    publicUpdates._syncedAt = new Date().toISOString();
    batch.update(doc(db, COLLECTIONS.COMM_DOCTORS, doctorId), publicUpdates);
  }

  await batch.commit();
};

export const deleteDoctor = async (doctorId) => {
  const batch = writeBatch(db);

  // 1. Delete from saas_doctors
  batch.delete(doc(db, COLLECTIONS.SAAS_DOCTORS, doctorId));

  // 2. Delete from comm_doctors
  batch.delete(doc(db, COLLECTIONS.COMM_DOCTORS, doctorId));

  await batch.commit();
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
