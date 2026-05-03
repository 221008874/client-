import { NavLink, useNavigate } from "react-router-dom";
import { Box, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// ─── Styled Components ───────────────────────────────────────────────────────

const SidebarRoot = styled(Box)({
  width: 220,
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #090f22, #060d1c)",
  borderRight: "1px solid rgba(15,184,166,0.10)",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 100,
  boxShadow: "4px 0 24px rgba(0,0,0,0.40)",
});

const Logo = styled(Box)({
  padding: "20px 20px 16px",
  borderBottom: "1px solid rgba(15,184,166,0.08)",
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const LogoIcon = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: "10px",
  background: "linear-gradient(135deg, #0fb8a6, #2563eb)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 14px rgba(15,184,166,0.35)",
  fontSize: 18,
  flexShrink: 0,
});

const NavSection = styled(Box)({
  padding: "12px 10px",
  flex: 1,
});

const SectionLabel = styled(Typography)({
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  color: "#2a3a52",
  padding: "8px 10px 4px",
});

const NavItem = styled(NavLink)({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: "10px",
  marginBottom: 2,
  textDecoration: "none",
  color: "#4a6a8a",
  fontSize: "13px",
  fontWeight: 500,
  transition: "all 0.18s ease",
  position: "relative",
  "&:hover": {
    backgroundColor: "rgba(15,184,166,0.08)",
    color: "#9ecfca",
  },
  "&.active": {
    backgroundColor: "rgba(15,184,166,0.12)",
    color: "#2dd4bf",
    fontWeight: 600,
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "20%",
      bottom: "20%",
      width: 3,
      borderRadius: "0 3px 3px 0",
      backgroundColor: "#0fb8a6",
      boxShadow: "0 0 8px rgba(15,184,166,0.60)",
    },
  },
});

const NavIcon = styled(Box)({
  fontSize: 16,
  width: 20,
  textAlign: "center",
  flexShrink: 0,
});

const BottomSection = styled(Box)({
  padding: "12px 10px 20px",
  borderTop: "1px solid rgba(15,184,166,0.08)",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 12px",
  borderRadius: "10px",
  backgroundColor: "rgba(15,184,166,0.05)",
  border: "1px solid rgba(15,184,166,0.10)",
  marginBottom: 8,
});

const LogoutBtn = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: "10px",
  color: "#f87171",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.18s ease",
  "&:hover": {
    backgroundColor: "rgba(248,113,113,0.10)",
    color: "#fca5a5",
  },
});

// ─── Nav Config ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    section: "Management",
    items: [
      { to: "/tenants",  icon: "🏥", label: "Tenants"  },
      { to: "/doctors",  icon: "👨‍⚕️", label: "Doctors"  },
      { to: "/licenses", icon: "🔑", label: "Licenses" },
    ],
  },
  {
    section: "System",
    items: [
      { to: "/settings", icon: "⚙️", label: "SaaS Settings" },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (_) {
      /* noop */
    }
    localStorage.removeItem("clinic_admin_logged");
    localStorage.removeItem("clinic_admin_user");
    navigate("/login");
  };

  const adminUser = localStorage.getItem("clinic_admin_user") || "Admin";

  return (
    <SidebarRoot>
      {/* Logo */}
      <Logo>
        <LogoIcon>🏥</LogoIcon>
        <Box>
          <Typography sx={{ color: "#eaf2ff", fontWeight: 700, fontSize: "13px", lineHeight: 1.2 }}>
            Smart Clinic
          </Typography>
          <Typography sx={{ color: "#2a3a52", fontSize: "10px", fontStyle: "italic" }}>
            Admin v4.0
          </Typography>
        </Box>
      </Logo>

      {/* Navigation */}
      <NavSection>
        {NAV_ITEMS.map((group) => (
          <Box key={group.section} sx={{ mb: 1 }}>
            <SectionLabel>{group.section}</SectionLabel>
            {group.items.map((item) => (
              <Tooltip key={item.to} title="" placement="right" arrow>
                <NavItem to={item.to} end={item.to === "/"}>
                  <NavIcon>{item.icon}</NavIcon>
                  {item.label}
                </NavItem>
              </Tooltip>
            ))}
          </Box>
        ))}
      </NavSection>

      {/* User + Logout */}
      <BottomSection>
        <UserBox>
          <Box sx={{ fontSize: 14 }}>👋</Box>
          <Typography sx={{ color: "#4a6a8a", fontSize: "12px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {adminUser}
          </Typography>
        </UserBox>
        <LogoutBtn onClick={handleLogout}>
          <NavIcon>🚪</NavIcon>
          Logout
        </LogoutBtn>
      </BottomSection>
    </SidebarRoot>
  );
}