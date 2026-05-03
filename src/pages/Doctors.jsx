import { useState, useEffect } from "react";
import {
  getAllDoctors,
  getAllTenants,
  createDoctor,
  updateDoctor,
  updateDoctorStatus,
  deleteDoctor,
} from "../services/firestoreService";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, TextField, Dialog, DialogTitle, DialogContent,
  Select, MenuItem, FormControl, InputLabel, Autocomplete,
  CircularProgress, Alert, Box, Typography, Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ─── Shared Styled Components (same dark teal system) ─────────────────────────

const PageContainer = styled(Box)({ minHeight: "100vh", backgroundColor: "#04091a", marginLeft: 220, position: "relative", overflow: "hidden" });

const TopBar = styled(Box)({
  background: "linear-gradient(to right, #090f22, #0c1830)",
  borderBottom: "1px solid rgba(15,184,166,0.12)", padding: "16px 28px",
  display: "flex", justifyContent: "space-between", alignItems: "center",
  boxShadow: "0 4px 20px rgba(0,0,0,0.50)", position: "relative",
  "&::after": { content: '""', position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, #0fb8a6 35%, #3b82f6 65%, transparent)", opacity: 0.45 },
});

const ContentWrapper = styled(Box)({ padding: "24px 28px", position: "relative", zIndex: 1 });

const GlassPanel = styled(Box)({
  background: "linear-gradient(to bottom, #0b1628, #081020)", borderRadius: "16px",
  border: "1px solid rgba(15,184,166,0.12)", boxShadow: "0 8px 32px rgba(0,0,0,0.55)", overflow: "hidden",
});

const StyledTableContainer = styled(Box)({
  "& .MuiTable-root": { backgroundColor: "transparent" },
  "& .MuiTableHead-root": { backgroundColor: "#0c1a30" },
  "& .MuiTableCell-head": { color: "#2dd4bf", fontWeight: 700, fontSize: "11px", letterSpacing: "0.8px", textTransform: "uppercase", padding: "14px 20px", borderBottom: "1px solid rgba(15,184,166,0.12)" },
  "& .MuiTableRow-root": { transition: "all 0.15s ease", borderBottom: "1px solid rgba(15,184,166,0.06)", "&:nth-of-type(odd)": { backgroundColor: "rgba(8,16,32,0.35)" }, "&:hover": { backgroundColor: "rgba(15,184,166,0.09)" } },
  "& .MuiTableCell-body": { color: "#dde6f0", fontSize: "13px", padding: "14px 20px", borderBottom: "none" },
});

const StatusBadge = styled(Chip)(({ status }) => ({
  borderRadius: "12px", fontSize: "10px", fontWeight: 700, height: "28px", minWidth: "80px", cursor: "pointer",
  ...(status === "ACTIVE" ? { backgroundColor: "rgba(52,211,153,0.14)", color: "#34d399", border: "1px solid rgba(52,211,153,0.28)" }
    : { backgroundColor: "rgba(248,113,113,0.14)", color: "#f87171", border: "1px solid rgba(248,113,113,0.28)" }),
  "&:hover": { filter: "brightness(1.2)" },
}));

const ActionButton = styled(Button)(({ variant: v }) => ({
  borderRadius: "9px", textTransform: "none", fontWeight: 600, fontSize: "12px", padding: "8px 18px", transition: "all 0.2s ease",
  ...(v === "primary" ? { background: "linear-gradient(to right, #0fb8a6, #0d9488)", color: "white", boxShadow: "0 4px 14px rgba(15,184,166,0.40)", "&:hover": { background: "linear-gradient(to right, #0d9488, #0b7a72)", transform: "translateY(-1px)" } }
    : v === "warning" ? { backgroundColor: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.30)", "&:hover": { backgroundColor: "#f59e0b", color: "white" } }
    : v === "danger" ? { backgroundColor: "rgba(248,113,113,0.10)", color: "#f87171", border: "1px solid rgba(248,113,113,0.25)", "&:hover": { backgroundColor: "#f87171", color: "white" } }
    : { backgroundColor: "rgba(15,184,166,0.07)", color: "#2dd4bf", border: "1px solid rgba(15,184,166,0.20)", "&:hover": { backgroundColor: "rgba(15,184,166,0.20)" } }),
}));

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": { backgroundColor: "#0b1628", borderRadius: "20px", border: "1px solid rgba(15,184,166,0.15)", boxShadow: "0 20px 60px rgba(0,0,0,0.80)" },
  "& .MuiDialogTitle-root": { background: "linear-gradient(to right, #0d9488, #083040)", color: "white", fontSize: "18px", fontWeight: 700, padding: "20px 24px", position: "relative", "&::after": { content: '""', position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(15,184,166,0.5), transparent)" } },
});

const StyledField = styled(TextField)({
  "& .MuiOutlinedInput-root": { backgroundColor: "#0f1e36", borderRadius: "10px", "& fieldset": { borderColor: "rgba(15,184,166,0.18)" }, "&:hover fieldset": { borderColor: "rgba(15,184,166,0.35)" }, "&.Mui-focused fieldset": { borderColor: "#0fb8a6" } },
  "& .MuiInputBase-input": { color: "#dde6f0", fontSize: "14px" },
  "& .MuiInputLabel-root": { color: "#3a5070", fontSize: "12px", fontWeight: 600 },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0fb8a6" },
});

const StyledSelect = styled(Select)({
  backgroundColor: "#0f1e36", borderRadius: "10px", color: "#dde6f0", fontSize: "14px",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(15,184,166,0.18)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(15,184,166,0.35)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0fb8a6" },
  "& .MuiSvgIcon-root": { color: "#4a6080" },
});

const StatCard = styled(Box)({
  background: "linear-gradient(135deg, #0b1628, #081020)", border: "1px solid rgba(15,184,166,0.10)",
  borderRadius: "14px", padding: "18px 22px", flex: "1 1 0", minWidth: 0,
});

const EmptyState = styled(Box)({ textAlign: "center", padding: "48px 20px" });

const BLANK = { name: "", phone: "", email: "", specialization: "", tenantId: "", tenantName: "", licenseKey: "" };

const SPECIALIZATIONS = ["General Practice", "Internal Medicine", "Pediatrics", "Cardiology", "Dermatology", "Orthopedics", "Neurology", "Ophthalmology", "ENT", "Psychiatry", "Other"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Doctors() {
  const [doctors,  setDoctors]  = useState([]);
  const [tenants,  setTenants]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen,   setEditOpen]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formData,   setFormData]   = useState(BLANK);
  const [editData,   setEditData]   = useState(BLANK);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [tenantFilter, setTenantFilter]   = useState("ALL");

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      setLoading(true); setError(null);
      const [docs, tens] = await Promise.all([getAllDoctors(), getAllTenants()]);
      setDoctors(docs); setTenants(tens);
    } catch (e) { setError("Failed to load data."); console.error(e); }
    finally { setLoading(false); }
  };

  // ── Create ────────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!formData.name || !formData.tenantId) { setError("Doctor name and tenant are required"); return; }
    try {
      setError(null);
      await createDoctor(formData);
      setCreateOpen(false); setFormData(BLANK); load();
    } catch (e) { setError("Failed to create doctor: " + e.message); }
  };

  // ── Edit ─────────────────────────────────────────────────────────────────
  const openEdit = (d) => {
    setEditTarget(d);
    setEditData({ name: d.name || "", phone: d.phone || "", email: d.email || "", specialization: d.specialization || "", tenantId: d.tenantId || "", tenantName: d.tenantName || "", licenseKey: d.licenseKey || "" });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editTarget || !editData.name) return;
    try {
      setError(null);
      await updateDoctor(editTarget.id, editData);
      setEditOpen(false); load();
    } catch (e) { setError("Failed to update doctor: " + e.message); }
  };

  // ── Toggle Status ─────────────────────────────────────────────────────────
  const toggleStatus = async (id, current) => {
    try { await updateDoctorStatus(id, current === "ACTIVE" ? "INACTIVE" : "ACTIVE"); load(); }
    catch (e) { setError("Failed to update status"); }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try { await deleteDoctor(deleteConfirm.id); setDeleteConfirm(null); load(); }
    catch (e) { setError("Failed to delete doctor: " + e.message); }
  };

  // ── Filter ────────────────────────────────────────────────────────────────
  const visible = tenantFilter === "ALL" ? doctors : doctors.filter(d => d.tenantId === tenantFilter);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const active = doctors.filter(d => d.status === "ACTIVE").length;

  if (loading) {
    return (
      <PageContainer sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#0fb8a6" }} size={48} thickness={3} />
      </PageContainer>
    );
  }

  const fieldEl = (label, key, obj, set, opts = {}) => (
    <StyledField fullWidth label={label} margin="normal" value={obj[key]} onChange={e => set(p => ({ ...p, [key]: e.target.value }))} {...opts} />
  );

  const TenantSelect = ({ obj, set }) => (
    <FormControl fullWidth margin="normal">
      <InputLabel sx={{ color: "#3a5070", fontSize: "12px", fontWeight: 600, "&.Mui-focused": { color: "#0fb8a6" } }}>Tenant (Clinic) *</InputLabel>
      <StyledSelect label="Tenant (Clinic) *" value={obj.tenantId}
        onChange={e => {
          const t = tenants.find(t => t.id === e.target.value);
          set(p => ({ ...p, tenantId: e.target.value, tenantName: t?.name || "" }));
        }}>
        {tenants.map(t => <MenuItem key={t.id} value={t.id} sx={{ backgroundColor: "#0f1e36", color: "#dde6f0" }}>{t.name}</MenuItem>)}
      </StyledSelect>
    </FormControl>
  );

  const SpecSelect = ({ obj, set }) => (
    <FormControl fullWidth margin="normal">
      <InputLabel sx={{ color: "#3a5070", fontSize: "12px", fontWeight: 600, "&.Mui-focused": { color: "#0fb8a6" } }}>Specialization</InputLabel>
      <StyledSelect label="Specialization" value={obj.specialization} onChange={e => set(p => ({ ...p, specialization: e.target.value }))}>
        {SPECIALIZATIONS.map(s => <MenuItem key={s} value={s} sx={{ backgroundColor: "#0f1e36", color: "#dde6f0" }}>{s}</MenuItem>)}
      </StyledSelect>
    </FormControl>
  );

  return (
    <PageContainer>
      <Box sx={{ position: "fixed", width: 600, height: 600, background: "radial-gradient(circle, rgba(59,130,246,0.04), transparent 70%)", top: -200, right: 0, filter: "blur(60px)", pointerEvents: "none" }} />

      <TopBar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: "linear-gradient(135deg, #2563eb, #0fb8a6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(37,99,235,0.4)", fontSize: 20 }}>👨‍⚕️</Box>
          <Box>
            <Typography sx={{ color: "#eaf2ff", fontWeight: 700, fontSize: "18px" }}>Doctor Management</Typography>
            <Typography sx={{ color: "#4a6080", fontSize: "11px", fontStyle: "italic" }}>Manage doctors across all tenants</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* Tenant filter */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <StyledSelect value={tenantFilter} onChange={e => setTenantFilter(e.target.value)} displayEmpty sx={{ height: 38, fontSize: "12px" }}>
              <MenuItem value="ALL" sx={{ backgroundColor: "#0f1e36", color: "#dde6f0" }}>All Tenants</MenuItem>
              {tenants.map(t => <MenuItem key={t.id} value={t.id} sx={{ backgroundColor: "#0f1e36", color: "#dde6f0" }}>{t.name}</MenuItem>)}
            </StyledSelect>
          </FormControl>
          <ActionButton variant="primary" onClick={() => setCreateOpen(true)}>+ New Doctor</ActionButton>
        </Box>
      </TopBar>

      <ContentWrapper>
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3, backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171", borderRadius: "12px", "& .MuiAlert-icon": { color: "#f87171" } }}>
            {error}
          </Alert>
        )}

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {[
            { label: "Total Doctors", value: doctors.length, color: "#60a5fa" },
            { label: "Active",        value: active,          color: "#34d399" },
            { label: "Inactive",      value: doctors.length - active, color: "#f87171" },
            { label: "Tenants",       value: tenants.length,  color: "#2dd4bf" },
          ].map(s => (
            <StatCard key={s.label}>
              <Typography sx={{ color: "#4a6080", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", mb: 0.5 }}>{s.label}</Typography>
              <Typography sx={{ color: s.color, fontSize: "28px", fontWeight: 700, lineHeight: 1 }}>{s.value}</Typography>
            </StatCard>
          ))}
        </Box>

        <GlassPanel>
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Tenant</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>License Key</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visible.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <EmptyState>
                        <Typography sx={{ fontSize: "40px", mb: 1, opacity: 0.3 }}>👨‍⚕️</Typography>
                        <Typography sx={{ color: "#4a6080", fontWeight: 600, fontSize: "15px", mb: 0.5 }}>No doctors found</Typography>
                        <Typography sx={{ color: "#283848", fontSize: "13px" }}>
                          {tenantFilter !== "ALL" ? "No doctors for this tenant." : "Click \"+ New Doctor\" to add one."}
                        </Typography>
                      </EmptyState>
                    </TableCell>
                  </TableRow>
                ) : (
                  visible.map(d => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600, color: "#eaf2ff" }}>Dr. {d.name}</Typography>
                        {d.email && <Typography sx={{ fontSize: "11px", color: "#4a6080", mt: 0.25 }}>{d.email}</Typography>}
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: "12px", color: "#9ecfca", backgroundColor: "rgba(15,184,166,0.08)", border: "1px solid rgba(15,184,166,0.12)", borderRadius: 6, px: 1, py: 0.25, display: "inline-block" }}>
                          {d.tenantName || "—"}
                        </Typography>
                      </TableCell>
                      <TableCell>{d.specialization || "—"}</TableCell>
                      <TableCell>{d.phone || "—"}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontFamily: "monospace", fontSize: "12px", color: d.licenseKey ? "#34d399" : "#4a6080" }}>
                          {d.licenseKey || "Not assigned"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={d.status} label={d.status} size="small" onClick={() => toggleStatus(d.id, d.status)} />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                          <ActionButton variant="warning" size="small" onClick={() => openEdit(d)}>Edit</ActionButton>
                          <ActionButton variant="danger" size="small" onClick={() => setDeleteConfirm(d)}>Delete</ActionButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </GlassPanel>
      </ContentWrapper>

      {/* ── Create Dialog ────────────────────────────────────────────────────── */}
      <StyledDialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent sx={{ p: "24px", backgroundColor: "#0b1628" }}>
          {fieldEl("Full Name *", "name", formData, setFormData)}
          <TenantSelect obj={formData} set={setFormData} />
          <SpecSelect obj={formData} set={setFormData} />
          {fieldEl("Phone", "phone", formData, setFormData, { placeholder: "010xxxxxxxx" })}
          {fieldEl("Email", "email", formData, setFormData, { type: "email" })}
          {fieldEl("License Key (optional)", "licenseKey", formData, setFormData, { helperText: "Link to an existing license key", placeholder: "LIC-2026-001" })}
          <Box sx={{ mt: 3, display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
            <ActionButton variant="secondary" onClick={() => { setCreateOpen(false); setError(null); }}>Cancel</ActionButton>
            <ActionButton variant="primary" onClick={handleCreate}>Add Doctor</ActionButton>
          </Box>
        </DialogContent>
      </StyledDialog>

      {/* ── Edit Dialog ──────────────────────────────────────────────────────── */}
      <StyledDialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent sx={{ p: "24px", backgroundColor: "#0b1628" }}>
          {fieldEl("Full Name *", "name", editData, setEditData)}
          <TenantSelect obj={editData} set={setEditData} />
          <SpecSelect obj={editData} set={setEditData} />
          {fieldEl("Phone", "phone", editData, setEditData)}
          {fieldEl("Email", "email", editData, setEditData, { type: "email" })}
          {fieldEl("License Key", "licenseKey", editData, setEditData)}
          <Box sx={{ mt: 3, display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
            <ActionButton variant="secondary" onClick={() => setEditOpen(false)}>Cancel</ActionButton>
            <ActionButton variant="primary" onClick={handleEdit}>Save Changes</ActionButton>
          </Box>
        </DialogContent>
      </StyledDialog>

      {/* ── Delete Confirm ────────────────────────────────────────────────────── */}
      <StyledDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent sx={{ p: "24px", backgroundColor: "#0b1628" }}>
          <Typography sx={{ color: "#dde6f0", mb: 1 }}>
            Delete <strong style={{ color: "#f87171" }}>Dr. {deleteConfirm?.name}</strong>?
          </Typography>
          <Typography sx={{ color: "#4a6080", fontSize: "13px", mb: 3 }}>This action cannot be undone.</Typography>
          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
            <ActionButton variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</ActionButton>
            <ActionButton variant="danger" onClick={handleDelete}>Delete</ActionButton>
          </Box>
        </DialogContent>
      </StyledDialog>
    </PageContainer>
  );
}