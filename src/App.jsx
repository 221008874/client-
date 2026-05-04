import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Pages
import Licenses from "./pages/Licenses";
import Tenants  from "./pages/Tenants";
import Doctors  from "./pages/Doctors";
import Settings from "./pages/Settings";
import Login    from "./pages/Login";

// Layout
import Sidebar from "./components/Sidebar";

// ─── Auth Guard ───────────────────────────────────────────────────────────────

function RequireAuth({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#04091a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#0fb8a6", fontSize: 14 }}>Loading…</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

// ─── Sidebar Layout ───────────────────────────────────────────────────────────
// Wraps all protected pages so Sidebar appears once and persists across routes.

function SidebarLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AdminRegister />} />
        {/* Protected — all share the sidebar layout */}
        <Route
          element={
            <RequireAuth>
              <SidebarLayout />
            </RequireAuth>
          }
        >
          <Route path="/tenants"  element={<Tenants  />} />
          <Route path="/doctors"  element={<Doctors  />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/settings" element={<Settings />} />

          {/* Default redirect */}
          <Route index element={<Navigate to="/tenants" replace />} />
          <Route path="/" element={<Navigate to="/tenants" replace />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}