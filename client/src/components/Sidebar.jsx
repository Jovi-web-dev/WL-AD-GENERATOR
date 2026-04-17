import { NAV } from "../config/app";

export function Sidebar({ active, onNav, collapsed, onToggle, t }) {
  return (
    <aside style={{
      width: collapsed ? 68 : 256, minHeight: "100vh",
      background: t.bgPanel,
      borderRight: `1px solid ${t.border}`,
      display: "flex", flexDirection: "column",
      transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
      position: "relative", zIndex: 20, flexShrink: 0,
    }}>
      {/* Logo */}
      <div
        onClick={onToggle}
        style={{
          padding: collapsed ? "20px 13px" : "20px 18px",
          borderBottom: `1px solid ${t.border}`,
          display: "flex", alignItems: "center", gap: 12,
          cursor: "pointer", transition: "padding 0.3s",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: t.radius,
          background: t.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, color: t.id === "black" ? "#000" : "#fff",
          flexShrink: 0, letterSpacing: -0.5,
          boxShadow: t.shadowAccent,
        }}>WL</div>
        {!collapsed && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: t.text, letterSpacing: 0.3 }}>WL Importados</div>
            <div style={{ fontSize: 10, color: t.textTertiary, letterSpacing: 2, fontWeight: 600 }}>CENTER</div>
          </div>
        )}
      </div>

      {/* Plan */}
      {!collapsed && (
        <div style={{
          margin: "14px 14px 6px", padding: "12px 14px",
          borderRadius: t.radius, background: t.gradientSubtle,
          border: `1px solid ${t.accentBorder}`,
        }}>
          <div style={{ fontSize: 10, color: t.textTertiary, letterSpacing: 1.5, fontWeight: 700 }}>PLANO ATUAL</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.accent, marginTop: 3 }}>Premium Pro</div>
          <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 2 }}>Válido até 12/07/2026</div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "6px 8px", overflowY: "auto" }}>
        {NAV.map(item => {
          if (item.type === "divider") {
            if (collapsed) return <div key={item.id} style={{ height: 12 }} />;
            return (
              <div key={item.id} style={{
                padding: "14px 10px 6px", fontSize: 10, fontWeight: 700,
                color: t.textTertiary, letterSpacing: 1.8,
              }}>{item.label}</div>
            );
          }
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center",
              gap: 11, padding: collapsed ? "10px 0" : "9px 12px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: t.radiusSm, border: "none", cursor: "pointer",
              background: isActive ? t.accentMuted : "transparent",
              color: isActive ? t.accent : t.textSecondary,
              fontSize: 13.5, fontWeight: isActive ? 600 : 450,
              transition: "all 0.15s", marginBottom: 1,
              position: "relative", fontFamily: "inherit",
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = t.accentGlow; e.currentTarget.style.color = isActive ? t.accent : t.text; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = isActive ? t.accent : t.textSecondary; }}
            >
              {isActive && !collapsed && (
                <div style={{
                  position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                  width: 3, height: 18, borderRadius: 4, background: t.accent,
                }} />
              )}
              <span style={{ fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span style={{
                  marginLeft: "auto", padding: "2px 8px", borderRadius: 5,
                  fontSize: 9, fontWeight: 800, letterSpacing: 0.5,
                  background: item.badge === "PRO" ? t.gradient : t.successBg,
                  color: item.badge === "PRO" ? (t.id === "black" ? "#000" : "#fff") : t.success,
                }}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{
        padding: collapsed ? "14px 8px" : "14px 16px",
        borderTop: `1px solid ${t.border}`,
        display: "flex", alignItems: "center", gap: 10,
        justifyContent: collapsed ? "center" : "flex-start",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: t.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800,
          color: t.id === "black" ? "#000" : "#fff",
        }}>W</div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 13, color: t.text, fontWeight: 600 }}>Wellington</div>
            <div style={{ fontSize: 11, color: t.textTertiary }}>Admin</div>
          </div>
        )}
      </div>
    </aside>
  );
}
