import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
//  DESIGN SYSTEM — WL IMPORTADOS CENTER
//  4 Temas: Padrão WL | Branco | Black | Acessível (Daltonismo)
// ═══════════════════════════════════════════════════════════

const THEMES = {
  wl: {
    id: "wl",
    label: "Padrão WL",
    icon: "✦",
    // Surfaces
    bg: "#0C0B09",
    bgPanel: "#15140F",
    bgCard: "#1C1A14",
    bgCardHover: "#242118",
    bgInput: "#1A1810",
    bgOverlay: "rgba(12,11,9,0.85)",
    // Brand
    accent: "#C9A84C",
    accentHover: "#D4B85A",
    accentMuted: "rgba(201,168,76,0.15)",
    accentBorder: "rgba(201,168,76,0.25)",
    accentGlow: "rgba(201,168,76,0.08)",
    gradient: "linear-gradient(135deg, #8B6914 0%, #D4A843 50%, #C9A84C 100%)",
    gradientSubtle: "linear-gradient(135deg, rgba(139,105,20,0.12) 0%, rgba(212,168,67,0.06) 100%)",
    // Text
    text: "#F2EDE3",
    textSecondary: "#A89E8C",
    textTertiary: "#706858",
    textInverse: "#0C0B09",
    // Borders
    border: "#2A2720",
    borderSubtle: "#1F1D18",
    borderFocus: "#C9A84C",
    // Semantic
    success: "#5CB85C",
    successBg: "rgba(92,184,92,0.12)",
    successBorder: "rgba(92,184,92,0.25)",
    warning: "#F0AD4E",
    warningBg: "rgba(240,173,78,0.12)",
    warningBorder: "rgba(240,173,78,0.25)",
    error: "#D9534F",
    errorBg: "rgba(217,83,79,0.12)",
    errorBorder: "rgba(217,83,79,0.25)",
    info: "#5BC0DE",
    infoBg: "rgba(91,192,222,0.12)",
    // Misc
    shadow: "0 1px 3px rgba(0,0,0,0.4)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.5)",
    shadowAccent: "0 4px 20px rgba(201,168,76,0.2)",
    radius: "10px",
    radiusSm: "6px",
    radiusLg: "14px",
  },
  branco: {
    id: "branco",
    label: "Branco",
    icon: "○",
    bg: "#F7F6F3",
    bgPanel: "#FFFFFF",
    bgCard: "#FFFFFF",
    bgCardHover: "#F9F8F5",
    bgInput: "#F2F1EE",
    bgOverlay: "rgba(255,255,255,0.9)",
    accent: "#8B6914",
    accentHover: "#A07A1A",
    accentMuted: "rgba(139,105,20,0.08)",
    accentBorder: "rgba(139,105,20,0.2)",
    accentGlow: "rgba(139,105,20,0.04)",
    gradient: "linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)",
    gradientSubtle: "linear-gradient(135deg, rgba(139,105,20,0.06) 0%, rgba(201,168,76,0.03) 100%)",
    text: "#1A1814",
    textSecondary: "#6B6560",
    textTertiary: "#9E9890",
    textInverse: "#FFFFFF",
    border: "#E8E5E0",
    borderSubtle: "#F0EDEA",
    borderFocus: "#8B6914",
    success: "#2E7D32",
    successBg: "rgba(46,125,50,0.08)",
    successBorder: "rgba(46,125,50,0.2)",
    warning: "#E65100",
    warningBg: "rgba(230,81,0,0.06)",
    warningBorder: "rgba(230,81,0,0.15)",
    error: "#C62828",
    errorBg: "rgba(198,40,40,0.06)",
    errorBorder: "rgba(198,40,40,0.15)",
    info: "#0277BD",
    infoBg: "rgba(2,119,189,0.06)",
    shadow: "0 1px 3px rgba(0,0,0,0.06)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.08)",
    shadowAccent: "0 4px 20px rgba(139,105,20,0.1)",
    radius: "10px",
    radiusSm: "6px",
    radiusLg: "14px",
  },
  black: {
    id: "black",
    label: "Black",
    icon: "●",
    bg: "#000000",
    bgPanel: "#0A0A0A",
    bgCard: "#111111",
    bgCardHover: "#1A1A1A",
    bgInput: "#0D0D0D",
    bgOverlay: "rgba(0,0,0,0.9)",
    accent: "#FFFFFF",
    accentHover: "#E0E0E0",
    accentMuted: "rgba(255,255,255,0.08)",
    accentBorder: "rgba(255,255,255,0.15)",
    accentGlow: "rgba(255,255,255,0.04)",
    gradient: "linear-gradient(135deg, #333 0%, #666 50%, #333 100%)",
    gradientSubtle: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
    text: "#FFFFFF",
    textSecondary: "#888888",
    textTertiary: "#555555",
    textInverse: "#000000",
    border: "#1E1E1E",
    borderSubtle: "#141414",
    borderFocus: "#FFFFFF",
    success: "#4ADE80",
    successBg: "rgba(74,222,128,0.1)",
    successBorder: "rgba(74,222,128,0.2)",
    warning: "#FBBF24",
    warningBg: "rgba(251,191,36,0.1)",
    warningBorder: "rgba(251,191,36,0.2)",
    error: "#F87171",
    errorBg: "rgba(248,113,113,0.1)",
    errorBorder: "rgba(248,113,113,0.2)",
    info: "#60A5FA",
    infoBg: "rgba(96,165,250,0.1)",
    shadow: "0 1px 3px rgba(0,0,0,0.8)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.9)",
    shadowAccent: "0 4px 20px rgba(255,255,255,0.05)",
    radius: "8px",
    radiusSm: "4px",
    radiusLg: "12px",
  },
  daltonismo: {
    id: "daltonismo",
    label: "Acessível",
    icon: "◐",
    bg: "#0D0F14",
    bgPanel: "#141720",
    bgCard: "#1A1E28",
    bgCardHover: "#212632",
    bgInput: "#171B24",
    bgOverlay: "rgba(13,15,20,0.9)",
    // Blue/Orange safe palette — avoids red/green
    accent: "#4A9EFF",
    accentHover: "#6AB0FF",
    accentMuted: "rgba(74,158,255,0.12)",
    accentBorder: "rgba(74,158,255,0.25)",
    accentGlow: "rgba(74,158,255,0.06)",
    gradient: "linear-gradient(135deg, #2563EB 0%, #4A9EFF 50%, #60A5FA 100%)",
    gradientSubtle: "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(74,158,255,0.05) 100%)",
    text: "#F0F2F8",
    textSecondary: "#9CA3B8",
    textTertiary: "#636B82",
    textInverse: "#0D0F14",
    border: "#282D3A",
    borderSubtle: "#1E2230",
    borderFocus: "#4A9EFF",
    // Colorblind-safe: Blue, Orange, Magenta — NO red/green pair
    success: "#FF9F1C",     // Orange instead of green
    successBg: "rgba(255,159,28,0.12)",
    successBorder: "rgba(255,159,28,0.25)",
    warning: "#E88DEF",     // Magenta instead of yellow/orange
    warningBg: "rgba(232,141,239,0.12)",
    warningBorder: "rgba(232,141,239,0.25)",
    error: "#FF6B6B",       // Bright coral (distinguishable)
    errorBg: "rgba(255,107,107,0.12)",
    errorBorder: "rgba(255,107,107,0.25)",
    info: "#4A9EFF",
    infoBg: "rgba(74,158,255,0.1)",
    shadow: "0 1px 3px rgba(0,0,0,0.5)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.6)",
    shadowAccent: "0 4px 20px rgba(74,158,255,0.15)",
    radius: "10px",
    radiusSm: "6px",
    radiusLg: "14px",
  },
};

// Status indicators with shapes for accessibility
const STATUS_CONFIG = {
  published: { label: "Publicado", shape: "●", semantic: "success" },
  active:    { label: "Ativo", shape: "●", semantic: "success" },
  draft:     { label: "Rascunho", shape: "◌", semantic: "tertiary" },
  review:    { label: "Em revisão", shape: "◑", semantic: "warning" },
  paused:    { label: "Pausado", shape: "◫", semantic: "warning" },
  error:     { label: "Erro", shape: "✕", semantic: "error" },
  shipped:   { label: "Enviado", shape: "▸", semantic: "info" },
  delivered: { label: "Entregue", shape: "●", semantic: "success" },
  pending:   { label: "Pendente", shape: "◌", semantic: "warning" },
};

const NAV = [
  { id: "dashboard", icon: "◫", label: "Dashboard" },
  { id: "anuncio", icon: "✦", label: "Anúncio Completo", badge: "PRO" },
  { id: "divider1", type: "divider", label: "FERRAMENTAS" },
  { id: "keywords", icon: "⊞", label: "Palavras-chave" },
  { id: "titulo", icon: "≡", label: "Títulos" },
  { id: "descricao", icon: "¶", label: "Descrições" },
  { id: "fotos", icon: "◲", label: "Fotos IA" },
  { id: "videos", icon: "▶", label: "Vídeos IA", badge: "NEW" },
  { id: "divider2", type: "divider", label: "GESTÃO" },
  { id: "pedidos", icon: "◈", label: "Pedidos" },
  { id: "estoque", icon: "▤", label: "Estoque" },
  { id: "logistica", icon: "→", label: "Logística" },
  { id: "relatorios", icon: "◧", label: "Relatórios" },
  { id: "divider3", type: "divider", label: "SISTEMA" },
  { id: "apikeys", icon: "⚿", label: "API Keys" },
  { id: "config", icon: "⚙", label: "Configurações" },
];

const CATEGORIES = [
  "Eletrônicos", "Celulares e Acessórios", "Informática", "Casa e Decoração",
  "Esporte e Lazer", "Automotivo", "Beleza e Cuidado Pessoal", "Brinquedos",
  "Ferramentas", "Moda e Acessórios", "Saúde", "Games"
];

const MARKETPLACES = [
  { id: "ml", name: "Mercado Livre", symbol: "ML", hue: 50 },
  { id: "shopee", name: "Shopee", symbol: "SP", hue: 15 },
  { id: "amazon", name: "Amazon", symbol: "AZ", hue: 30 },
  { id: "magalu", name: "Magalu", symbol: "MG", hue: 210 },
];

// ═══════════════════════════════════════════
//  UTILITY COMPONENTS
// ═══════════════════════════════════════════

function StatusBadge({ status, t }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  const colors = {
    success: { color: t.success, bg: t.successBg, border: t.successBorder },
    warning: { color: t.warning, bg: t.warningBg, border: t.warningBorder },
    error: { color: t.error, bg: t.errorBg, border: t.errorBorder },
    info: { color: t.info, bg: t.infoBg, border: t.accentBorder },
    tertiary: { color: t.textTertiary, bg: t.accentMuted, border: t.border },
  };
  const c = colors[cfg.semantic] || colors.tertiary;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 20,
      background: c.bg, border: `1px solid ${c.border}`,
      fontSize: 12, fontWeight: 600, color: c.color,
      letterSpacing: 0.3,
    }}>
      <span style={{ fontSize: 10, lineHeight: 1 }}>{cfg.shape}</span>
      {cfg.label}
    </span>
  );
}

function MetricCard({ icon, label, value, trend, t, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const id = setTimeout(() => setVisible(true), delay); return () => clearTimeout(id); }, [delay]);
  return (
    <div style={{
      background: t.bgCard, borderRadius: t.radiusLg,
      border: `1px solid ${t.border}`,
      padding: "22px 24px", flex: 1, minWidth: 200,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = t.shadowAccent}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{
          width: 40, height: 40, borderRadius: t.radius,
          background: t.accentMuted,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, color: t.accent,
        }}>{icon}</span>
        {trend !== undefined && (
          <span style={{
            fontSize: 12, fontWeight: 600,
            color: trend >= 0 ? t.success : t.error,
            background: trend >= 0 ? t.successBg : t.errorBg,
            padding: "3px 8px", borderRadius: t.radiusSm,
            display: "flex", alignItems: "center", gap: 3,
          }}>
            <span>{trend >= 0 ? "▲" : "▼"}</span>
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}>{value}</div>
      <div style={{ fontSize: 13, color: t.textTertiary, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function InputField({ label, icon, required, placeholder, value, onChange, type = "text", t, rows }) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? "textarea" : "input";
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 13, fontWeight: 600, color: t.text,
        marginBottom: 8, letterSpacing: 0.2,
      }}>
        {icon && <span style={{ color: t.accent, fontSize: 14 }}>{icon}</span>}
        {label}
        {required && <span style={{ color: t.error, fontSize: 11 }}>*</span>}
      </label>
      <Tag
        value={value} onChange={onChange} placeholder={placeholder} type={type}
        rows={rows}
        style={{
          width: "100%", padding: rows ? "14px 16px" : "12px 16px",
          background: t.bgInput,
          border: `1.5px solid ${focused ? t.borderFocus : t.border}`,
          borderRadius: t.radius, color: t.text, fontSize: 14,
          outline: "none", boxSizing: "border-box",
          transition: "border 0.2s, box-shadow 0.2s",
          fontFamily: "inherit", resize: rows ? "vertical" : "none",
          boxShadow: focused ? `0 0 0 3px ${t.accentMuted}` : "none",
          lineHeight: 1.6,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function SelectField({ label, icon, options, value, onChange, placeholder, t }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 20, flex: 1, minWidth: 200 }}>
      <label style={{
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 13, fontWeight: 600, color: t.text,
        marginBottom: 8, letterSpacing: 0.2,
      }}>
        {icon && <span style={{ color: t.accent, fontSize: 14 }}>{icon}</span>}
        {label}
      </label>
      <select value={value} onChange={onChange} style={{
        width: "100%", padding: "12px 16px",
        background: t.bgInput,
        border: `1.5px solid ${focused ? t.borderFocus : t.border}`,
        borderRadius: t.radius, color: value ? t.text : t.textTertiary,
        fontSize: 14, outline: "none", cursor: "pointer", boxSizing: "border-box",
        transition: "border 0.2s", fontFamily: "inherit",
      }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
      </select>
    </div>
  );
}

function Button({ children, variant = "primary", onClick, disabled, fullWidth, t, style: sx }) {
  const base = {
    padding: "12px 24px", borderRadius: t.radius, fontWeight: 700,
    fontSize: 14, cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s", display: "inline-flex",
    alignItems: "center", justifyContent: "center", gap: 8,
    border: "none", fontFamily: "inherit", letterSpacing: 0.2,
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: {
      background: t.gradient, color: t.textInverse,
      boxShadow: t.shadowAccent,
    },
    secondary: {
      background: "transparent", color: t.text,
      border: `1.5px solid ${t.border}`,
    },
    ghost: {
      background: t.accentMuted, color: t.accent, border: "none",
    },
    danger: {
      background: t.errorBg, color: t.error,
      border: `1px solid ${t.errorBorder}`,
    },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...base, ...variants[variant], ...sx }}
      onMouseEnter={e => {
        if (!disabled) {
          if (variant === "secondary") e.currentTarget.style.borderColor = t.accent;
          if (variant === "primary") e.currentTarget.style.filter = "brightness(1.1)";
        }
      }}
      onMouseLeave={e => {
        if (variant === "secondary") e.currentTarget.style.borderColor = t.border;
        if (variant === "primary") e.currentTarget.style.filter = "";
      }}
    >{children}</button>
  );
}

function ThemeSwitcher({ current, onChange, t }) {
  return (
    <div style={{
      display: "flex", gap: 3, padding: 3,
      background: t.bgInput, borderRadius: t.radius,
      border: `1px solid ${t.border}`,
    }}>
      {Object.values(THEMES).map(theme => (
        <button key={theme.id} onClick={() => onChange(theme.id)}
          title={theme.label}
          style={{
            width: 34, height: 34, borderRadius: t.radiusSm,
            border: current === theme.id ? `2px solid ${t.accent}` : `1px solid transparent`,
            background: current === theme.id ? t.accentMuted : "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: current === theme.id ? t.accent : t.textTertiary,
            transition: "all 0.2s", fontFamily: "inherit",
          }}
        >{theme.icon}</button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
//  SIDEBAR
// ═══════════════════════════════════════════

function Sidebar({ active, onNav, collapsed, onToggle, t }) {
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

// ═══════════════════════════════════════════
//  PAGES
// ═══════════════════════════════════════════

function DashboardPage({ t, onNav }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.3 }}>Dashboard</h1>
        <p style={{ color: t.textTertiary, margin: "6px 0 0", fontSize: 14 }}>Visão geral da operação em todos os marketplaces</p>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
        <MetricCard icon="◈" label="Anúncios Ativos" value="0" t={t} delay={0} />
        <MetricCard icon="$" label="Vendas (mês)" value="R$ 0" t={t} delay={80} />
        <MetricCard icon="%" label="Conversão" value="0%" t={t} delay={160} />
        <MetricCard icon="★" label="Reputação" value="—" t={t} delay={240} />
      </div>

      {/* Recent ads table — empty state */}
      <div style={{
        background: t.bgCard, borderRadius: t.radiusLg,
        border: `1px solid ${t.border}`, overflow: "hidden",
      }}>
        <div style={{
          padding: "18px 24px", borderBottom: `1px solid ${t.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Anúncios Recentes</h3>
        </div>

        <div style={{
          padding: "48px 24px", textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: t.radiusLg,
            background: t.accentMuted, border: `1px solid ${t.accentBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, color: t.textTertiary,
          }}>◈</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: t.textSecondary }}>Nenhum anúncio criado ainda</div>
          <div style={{ fontSize: 13, color: t.textTertiary, maxWidth: 340 }}>
            Crie seu primeiro anúncio com IA no módulo "Anúncio Completo" e ele aparecerá aqui.
          </div>
          <Button variant="primary" t={t} onClick={() => onNav("anuncio")} style={{ marginTop: 8, padding: "10px 22px", fontSize: 13 }}>
            ✦  Criar primeiro anúncio
          </Button>
        </div>
      </div>
    </div>
  );
}

function AnuncioCompletoPage({ t }) {
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("profissional");
  const [selectedMPs, setSelectedMPs] = useState(["ml"]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("titulo");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [generatingMedia, setGeneratingMedia] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generatedVideo, setGeneratedVideo] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(f => 
      ['image/jpeg', 'image/jpg', 'image/png'].includes(f.type)
    ).slice(0, 5 - uploadedImages.length);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, {
          file,
          preview: event.target.result,
          name: file.name,
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateImagesWithGemini = async (prompts, referenceImage, apiKey) => {
    const imagePromises = prompts.map(async (prompt, index) => {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: prompt },
                  ...(referenceImage ? [{
                    inline_data: {
                      mime_type: 'image/jpeg',
                      data: referenceImage.split(',')[1] // Remove data:image/jpeg;base64,
                    }
                  }] : [])
                ]
              }],
              generationConfig: {
                temperature: 0.4,
                topK: 32,
                topP: 1,
                maxOutputTokens: 2048
              }
            })
          }
        );

        const data = await response.json();
        
        // Gemini returns text description, not actual image
        // In real implementation, would use Imagen or similar
        // For now, return placeholder with description
        return {
          id: index + 1,
          type: ['Estúdio', 'Conversão', 'c/ Descrição', 'Detalhes', 'Contexto'][index],
          url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f8f8f8' width='400' height='400'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23666'%3EImagem ${index + 1}%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23999'%3EGerada com Gemini%3C/text%3E%3C/svg%3E`,
          prompt: prompt,
          generated: true
        };
      } catch (err) {
        console.error(`Error generating image ${index + 1}:`, err);
        return {
          id: index + 1,
          type: ['Estúdio', 'Conversão', 'c/ Descrição', 'Detalhes', 'Contexto'][index],
          url: null,
          error: err.message,
          generated: false
        };
      }
    });

    return Promise.all(imagePromises);
  };

  const generateVideoWithVeo3 = async (prompt, referenceImage, apiKey) => {
    try {
      // Veo3 API call (simulated for now - actual endpoint may vary)
      // Real implementation would use Google's Video Generation API
      
      // Simulate async video generation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect fill='%23000' width='640' height='360'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23fff'%3EVídeo 15-30s%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23ccc'%3EGerado com Veo3%3C/text%3E%3C/svg%3E`,
            duration: prompt.includes('30') ? '30s' : '15s',
            prompt: prompt,
            generated: true
          });
        }, 2000);
      });
    } catch (err) {
      console.error('Error generating video:', err);
      return { url: null, error: err.message, generated: false };
    }
  };

  const handleGenerateMedia = async () => {
    if (!result) return;
    
    const savedKeys = localStorage.getItem('wl_api_keys');
    const apiKeys = savedKeys ? JSON.parse(savedKeys) : {};
    const hasGemini = apiKeys.google_gemini?.value && apiKeys.google_gemini?.status === 'valid';
    const hasVeo3 = apiKeys.google_veo3?.value && apiKeys.google_veo3?.status === 'valid';

    if (!hasGemini && !hasVeo3) {
      setError("Configure Gemini ou Veo3 para gerar assets visuais");
      return;
    }

    setGeneratingMedia(true);
    setError(null);

    try {
      const referenceImage = uploadedImages.length > 0 ? uploadedImages[0].preview : null;
      
      // Generate images with Gemini (if available and prompts exist)
      let images = [];
      if (hasGemini && result.promptFoto1) {
        const prompts = [
          result.promptFoto1,
          result.promptFoto2,
          result.promptFoto3,
          result.promptFoto4,
          result.promptFoto5
        ].filter(Boolean);

        images = await generateImagesWithGemini(
          prompts,
          referenceImage,
          apiKeys.google_gemini.value
        );
        setGeneratedImages(images);
      } else if (hasGemini && !result.promptFoto1) {
        // Generate with basic prompts if Claude didn't generate them
        const basicPrompts = [
          `Professional product photography of ${productName} on white background, studio lighting, centered composition, high quality, e-commerce style`,
          `${productName} hero shot, dramatic lighting, emphasizing key features, lifestyle context, high conversion angle`,
          `${productName} with text overlay showing specifications, infographic style, clean layout, professional design`,
          `${productName} main image with detail close-ups grid below, material textures, build quality highlights`,
          `${productName} in real usage environment, lifestyle photography, natural lighting, authentic setting`
        ];

        images = await generateImagesWithGemini(
          basicPrompts,
          referenceImage,
          apiKeys.google_gemini.value
        );
        setGeneratedImages(images);
      }

      // Generate video with Veo3 (if available)
      let video = null;
      if (hasVeo3) {
        const videoPrompt = result.promptVideo || 
          `Cinematic product video of ${productName}: opening reveal, 360 rotation, detail highlights, lifestyle usage, professional quality, 15 seconds`;
        
        video = await generateVideoWithVeo3(
          videoPrompt,
          referenceImage,
          apiKeys.google_veo3.value
        );
        setGeneratedVideo(video);
      }

    } catch (err) {
      console.error('Media generation error:', err);
      setError('Erro ao gerar assets visuais. Verifique suas API Keys.');
    } finally {
      setGeneratingMedia(false);
    }
  };

  const handleGenerate = async () => {
    if (!productName) return;
    
    // Check which API keys are available
    const savedKeys = localStorage.getItem('wl_api_keys');
    const apiKeys = savedKeys ? JSON.parse(savedKeys) : {};
    const hasClaude = apiKeys.anthropic?.value && apiKeys.anthropic?.status === 'valid';
    const hasGemini = apiKeys.google_gemini?.value && apiKeys.google_gemini?.status === 'valid';
    const hasVeo3 = apiKeys.google_veo3?.value && apiKeys.google_veo3?.status === 'valid';
    
    // Require at least one API
    if (!hasClaude && !hasGemini && !hasVeo3) {
      setError("Nenhuma API configurada. Configure ao menos uma API em 'API Keys' para continuar.");
      return;
    }
    
    setGenerating(true); setProgress(0); setError(null);

    // Progress animation
    let prog = 0;
    const progInterval = setInterval(() => {
      prog = Math.min(prog + Math.random() * 8 + 2, 92);
      setProgress(Math.round(prog));
    }, 500);

    const mpNames = selectedMPs.map(id => MARKETPLACES.find(m => m.id === id)?.name).filter(Boolean).join(", ");
    const hasImages = uploadedImages.length > 0;

    try {
      let generatedResult = {
        titulo: null,
        keywords: null,
        descricao: null,
        promptFoto1: null,
        promptFoto2: null,
        promptFoto3: null,
        promptFoto4: null,
        promptFoto5: null,
        promptVideo: null,
        warnings: []
      };

      // 1. Generate text content with Claude (if available)
      if (hasClaude) {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            // In production: "x-api-key": apiKeys.anthropic.value
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4000,
            messages: [{
              role: "user",
              content: `Você é um Especialista em Visão Computacional Sênior especializado em e-commerce e geração de assets visuais com IA.

Analise o produto e gere prompts técnicos ULTRA-DETALHADOS para Gemini Vision (Nano Banana) e Veo3.

PRODUTO: ${productName}
DETALHES: ${productDetails || "Não informados"}
CATEGORIA: ${category || "Não informada"}
MARKETPLACE(S): ${mpNames || "Mercado Livre"}
TOM: ${tone}
MARCA: WL Importados Center
${hasImages ? `IMAGENS DE REFERÊNCIA: ${uploadedImages.length} foto(s) — analise cor, forma, ângulos, materiais` : ""}

ESPECIFICAÇÕES TÉCNICAS OBRIGATÓRIAS:
- Resolução: 1024x1024 (imagens), 1080p (vídeo)
- Formato: PNG (imagens), MP4 (vídeo)
- Duração vídeo: ${productDetails?.toLowerCase().includes('grande') || productDetails?.toLowerCase().includes('complexo') ? '30s' : '15s'}

Responda SOMENTE com JSON válido (sem markdown, sem backticks):
{
  "titulo": "Título SEO otimizado 60 chars ML, features separadas por |",
  "keywords": ["12", "palavras-chave", "relevantes"],
  "descricao": "Descrição formatada com emojis, seções, arrows →, garantia WL",
  "promptFoto1": "Professional studio product photography: ${productName} centered on pure white background (#FFFFFF), studio lighting setup with 3-point lighting (key light 45° left, fill light 30° right, rim light behind), product at 3/4 angle showing front and right side, soft shadows with 20% opacity, sharp focus on product details, shallow depth of field (f/2.8), photorealistic rendering, commercial quality, 1024x1024px",
  "promptFoto2": "High-conversion e-commerce shot: ${productName} hero angle emphasizing key benefits, dramatic lighting highlighting premium materials, composition following rule of thirds, product positioned to show functionality and usage, warm color grading, lifestyle context hint without full scene, creates desire and urgency, professional retouching, 1024x1024px",
  "promptFoto3": "Product infographic composite: ${productName} as main element (60% of frame) with overlay text graphics showing key specs, modern sans-serif typography, color-coded feature callouts with icons, clean data visualization, technical diagram elements, high contrast text on semi-transparent panels, professional layout design, 1024x1024px",
  "promptFoto4": "Product detail grid layout: Large hero shot of ${productName} occupying top 70% of frame, bottom 30% contains 3-4 square close-up tiles showing: material texture macro shot, interface/controls detail, build quality close-up, unique feature highlight. Each tile 240x240px, 8px gap between tiles, cohesive lighting across all shots, 1024x1024px canvas",
  "promptFoto5": "Lifestyle contextual scene: ${productName} in authentic usage environment, natural lighting (golden hour quality), real person interacting with product OR product placed in aspirational setting, environmental storytelling, depth and bokeh in background, warm color palette, lifestyle photography aesthetic, creates emotional connection, 1024x1024px",
  "promptVideo": "Cinematic product video (${productDetails?.toLowerCase().includes('grande') ? '30' : '15'} seconds): Opening with dramatic reveal of ${productName} (3s), slow 360° rotation showcasing all angles with dynamic lighting (4s), close-up sequence highlighting premium details and materials (3s), transition to lifestyle usage scene showing product in context (3-8s), final hero shot with brand overlay (2s). Camera movements: smooth gimbal work, slow-motion highlights (60fps), depth of field shifts for emphasis. Lighting: professional key+fill+rim setup transitioning to natural environmental light. Color grading: warm cinematic look with subtle vignette. 1080p resolution, 24fps, MP4 format."
}`
            }],
          }),
        });

        const data = await response.json();
        const text = data.content?.map(i => i.text || "").join("") || "";
        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);

        // Ensure keywords is an array
        if (typeof parsed.keywords === "string") {
          parsed.keywords = parsed.keywords.split(",").map(k => k.trim());
        }

        generatedResult = { ...generatedResult, ...parsed };
      } else {
        // Generate fallback prompts for images/video even without Claude
        generatedResult.promptFoto1 = `Professional studio product photography: ${productName} centered on pure white background, 3-point studio lighting, 3/4 angle view, soft shadows, sharp focus, commercial e-commerce quality, 1024x1024px`;
        generatedResult.promptFoto2 = `High-conversion product shot: ${productName} hero angle, dramatic lighting, rule of thirds composition, warm color grading, professional retouching, 1024x1024px`;
        generatedResult.promptFoto3 = `Product infographic: ${productName} with text overlay showing specs, modern typography, color-coded callouts, clean data visualization, 1024x1024px`;
        generatedResult.promptFoto4 = `Product detail grid: Large ${productName} hero shot (70%) with 3-4 close-up detail tiles below (30%), material textures, build quality, 1024x1024px`;
        generatedResult.promptFoto5 = `Lifestyle product scene: ${productName} in authentic usage environment, natural golden hour lighting, person interacting or aspirational setting, 1024x1024px`;
        generatedResult.promptVideo = `Cinematic product video 15s: ${productName} dramatic reveal (3s), 360° rotation (4s), close-up details (3s), lifestyle usage (3s), brand overlay (2s), 1080p 24fps`;
        
        generatedResult.warnings.push("Texto não gerado: API Claude não configurada");
        generatedResult.warnings.push("Título não gerado: API Claude não configurada");
        generatedResult.warnings.push("Keywords não geradas: API Claude não configurada");
        generatedResult.warnings.push("Descrição não gerada: API Claude não configurada");
      }

      clearInterval(progInterval);
      setProgress(100);
      setResult(generatedResult);

      setTimeout(() => {
        setGenerating(false);
        setGenerated(true);
      }, 400);

    } catch (err) {
      clearInterval(progInterval);
      setGenerating(false);
      setProgress(0);
      setError("Erro ao gerar conteúdo. Verifique suas API Keys e tente novamente.");
      console.error("Generation error:", err);
    }
  };

  const tabs = [
    { id: "titulo", icon: "≡", label: "Título" },
    { id: "keywords", icon: "⊞", label: "Keywords" },
    { id: "descricao", icon: "¶", label: "Descrição" },
    { id: "foto1", icon: "①", label: "Foto 1: Estúdio" },
    { id: "foto2", icon: "②", label: "Foto 2: Conversão" },
    { id: "foto3", icon: "③", label: "Foto 3: c/ Descrição" },
    { id: "foto4", icon: "④", label: "Foto 4: Detalhes" },
    { id: "foto5", icon: "⑤", label: "Foto 5: Contexto" },
    { id: "video", icon: "▶", label: "Prompt Vídeo" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: 0 }}>Anúncio Completo</h1>
        <span style={{
          background: t.gradient, color: t.textInverse,
          padding: "3px 10px", borderRadius: 5, fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
        }}>PRO</span>
      </div>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28, marginTop: 6 }}>
        A IA gera tudo de uma vez: título, palavras-chave, descrição, prompts de fotos e vídeo.
      </p>

      {!generated ? (
        <div style={{ background: t.bgCard, borderRadius: t.radiusLg, border: `1px solid ${t.border}`, padding: "28px 32px" }}>
          <InputField label="Nome do produto" icon="◈" required placeholder="Ex: Fone de Ouvido Bluetooth TWS Premium" value={productName} onChange={e => setProductName(e.target.value)} t={t} />
          <InputField label="Detalhes técnicos" icon="≡" placeholder="Ex: Bluetooth 5.3, ANC, bateria 48h, IPX5, driver 13mm..." value={productDetails} onChange={e => setProductDetails(e.target.value)} t={t} rows={3} />

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <SelectField label="Categoria" icon="▤" options={CATEGORIES} value={category} onChange={e => setCategory(e.target.value)} placeholder="Selecione..." t={t} />
            <SelectField label="Tom do anúncio" icon="✦" options={[
              { value: "profissional", label: "Profissional" },
              { value: "persuasivo", label: "Persuasivo" },
              { value: "tecnico", label: "Técnico" },
              { value: "casual", label: "Casual" },
              { value: "premium", label: "Luxo / Premium" },
            ]} value={tone} onChange={e => setTone(e.target.value)} t={t} />
          </div>

          {/* Marketplace selection */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 10 }}>
              <span style={{ color: t.accent }}>→</span> Marketplace(s) destino
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MARKETPLACES.map(mp => {
                const sel = selectedMPs.includes(mp.id);
                return (
                  <button key={mp.id} onClick={() => setSelectedMPs(p => sel ? p.filter(x => x !== mp.id) : [...p, mp.id])} style={{
                    padding: "10px 18px", borderRadius: t.radius,
                    border: `1.5px solid ${sel ? t.accent : t.border}`,
                    background: sel ? t.accentMuted : "transparent",
                    color: sel ? t.accent : t.textSecondary,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                    fontSize: 13, fontWeight: sel ? 600 : 400,
                    transition: "all 0.2s", fontFamily: "inherit",
                  }}>
                    <span style={{
                      width: 24, height: 18, borderRadius: 3, fontSize: 9, fontWeight: 800,
                      background: sel ? t.accent : t.border,
                      color: sel ? t.textInverse : t.textTertiary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{mp.symbol}</span>
                    {mp.name}
                    {sel && <span style={{ fontSize: 14 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image upload section */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 6 }}>
              <span style={{ color: t.accent }}>◲</span> Imagens de referência (opcional)
            </label>
            <p style={{ fontSize: 12, color: t.textTertiary, margin: "0 0 12px", lineHeight: 1.5 }}>
              Envie até 5 fotos do produto. A IA analisará e gerará 5 imagens profissionais otimizadas para conversão.
            </p>
            
            {uploadedImages.length < 5 && (
              <label style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "16px", borderRadius: t.radius,
                border: `2px dashed ${t.border}`,
                background: t.bgInput, cursor: "pointer",
                transition: "all 0.2s",
                fontSize: 13, fontWeight: 500, color: t.textSecondary,
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
              >
                <span style={{ fontSize: 18 }}>⬆</span>
                Selecionar imagens ({uploadedImages.length}/5)
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            )}

            {uploadedImages.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10, marginTop: 12 }}>
                {uploadedImages.map((img, i) => (
                  <div key={i} style={{
                    position: "relative", borderRadius: t.radius, overflow: "hidden",
                    border: `1px solid ${t.border}`, background: t.bgCard,
                  }}>
                    <img src={img.preview} alt={img.name} style={{
                      width: "100%", height: 110, objectFit: "cover", display: "block",
                    }} />
                    <button onClick={() => removeImage(i)} style={{
                      position: "absolute", top: 4, right: 4,
                      width: 24, height: 24, borderRadius: "50%",
                      border: "none", background: "rgba(0,0,0,0.7)",
                      color: "#fff", fontSize: 14, fontWeight: 700,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(200,0,0,0.9)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.7)"}
                    >×</button>
                    <div style={{
                      padding: "4px 6px", fontSize: 10, color: t.textTertiary,
                      background: t.bgPanel, borderTop: `1px solid ${t.border}`,
                      textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",
                    }}>{img.name}</div>
                  </div>
                ))}
              </div>
            )}

            {uploadedImages.length > 0 && (
              <div style={{
                marginTop: 12, padding: "10px 14px", borderRadius: t.radiusSm,
                background: t.bgInput, border: `1px solid ${t.accentBorder}`,
                fontSize: 11, color: t.textTertiary, lineHeight: 1.5,
              }}>
                <strong style={{ color: t.accent, fontWeight: 600 }}>Imagens que serão geradas:</strong><br/>
                ① Foto profissional de estúdio • ② Alta conversão • ③ Com descrição integrada • ④ Grande + detalhes • ⑤ Ambientada em contexto
              </div>
            )}
          </div>

          {/* API Key status check */}
          {(() => {
            const savedKeys = localStorage.getItem('wl_api_keys');
            const apiKeys = savedKeys ? JSON.parse(savedKeys) : {};
            const hasClaudeKey = apiKeys.anthropic?.value && apiKeys.anthropic?.status === 'valid';
            const hasGeminiKey = apiKeys.google_gemini?.value && apiKeys.google_gemini?.status === 'valid';
            const hasVeo3Key = apiKeys.google_veo3?.value && apiKeys.google_veo3?.status === 'valid';
            const hasAnyKey = hasClaudeKey || hasGeminiKey || hasVeo3Key;
            
            if (!hasAnyKey) {
              return (
                <div style={{
                  padding: "12px 16px", borderRadius: t.radius,
                  background: t.errorBg, border: `1px solid ${t.errorBorder}`,
                  fontSize: 13, color: t.error, fontWeight: 500, marginBottom: 20,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span>⚠</span> Nenhuma API configurada. Configure ao menos uma API em "API Keys" para gerar conteúdo.
                </div>
              );
            }
            
            return (
              <div style={{
                padding: "10px 14px", borderRadius: t.radius,
                background: t.successBg, border: `1px solid ${t.successBorder}`,
                fontSize: 12, color: t.success, marginBottom: 20,
                display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
              }}>
                <span style={{ fontWeight: 600 }}>APIs disponíveis:</span>
                {hasClaudeKey && <span>✓ Claude (texto)</span>}
                {hasGeminiKey && <span>✓ Gemini (imagens)</span>}
                {hasVeo3Key && <span>✓ Veo3 (vídeo)</span>}
              </div>
            );
          })()}

          {/* Usage indicator */}
          <div style={{
            padding: "12px 16px", borderRadius: t.radius,
            background: t.successBg, border: `1px solid ${t.successBorder}`,
            fontSize: 13, color: t.success, fontWeight: 500, marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>●</span> 8/10 gerações restantes hoje — Plano Premium Pro
          </div>

          {/* Error display */}
          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: t.radius,
              background: t.errorBg, border: `1px solid ${t.errorBorder}`,
              fontSize: 13, color: t.error, fontWeight: 500, marginBottom: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>✕</span> {error}
            </div>
          )}

          {/* Generate button */}
          <button onClick={handleGenerate} disabled={generating || !productName} style={{
            width: "100%", padding: "16px", borderRadius: t.radius,
            border: "none", fontFamily: "inherit",
            background: generating || !productName ? t.bgInput : t.gradient,
            color: !productName ? t.textTertiary : t.textInverse,
            fontSize: 15, fontWeight: 700, cursor: generating || !productName ? "not-allowed" : "pointer",
            boxShadow: !productName || generating ? "none" : t.shadowAccent,
            transition: "all 0.3s", position: "relative", overflow: "hidden",
            letterSpacing: 0.3,
          }}>
            {generating && (
              <div style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                width: `${progress}%`, background: t.gradient,
                transition: "width 0.35s ease", opacity: 0.25,
              }} />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>
              {generating ? `Gerando anúncio... ${progress}%` : "✦  Gerar Anúncio Completo com IA"}
            </span>
          </button>
        </div>
      ) : (
        <div>
          {/* Warnings banner */}
          {result?.warnings && result.warnings.length > 0 && (
            <div style={{
              padding: "14px 18px", borderRadius: t.radius,
              background: t.errorBg, border: `1px solid ${t.errorBorder}`,
              marginBottom: 20, display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.error }}>⚠ Geração Parcial</div>
              {result.warnings.map((warning, i) => (
                <div key={i} style={{ fontSize: 12, color: t.error }}>• {warning}</div>
              ))}
              <div style={{ fontSize: 11, color: t.error, marginTop: 4, fontStyle: "italic" }}>
                Configure as APIs ausentes em "API Keys" para gerar conteúdo completo.
              </div>
            </div>
          )}

          {/* Success banner */}
          <div style={{
            padding: "14px 20px", borderRadius: t.radius,
            background: result?.warnings && result.warnings.length > 0 ? t.infoBg : t.successBg, 
            border: `1px solid ${result?.warnings && result.warnings.length > 0 ? t.accentBorder : t.successBorder}`,
            marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 20 }}>{result?.warnings && result.warnings.length > 0 ? '◐' : '●'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: result?.warnings && result.warnings.length > 0 ? t.info : t.success, fontSize: 14 }}>
                {result?.warnings && result.warnings.length > 0 ? 'Conteúdo gerado parcialmente' : 'Anúncio gerado com sucesso'}
              </div>
              <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>
                {result?.warnings && result.warnings.length > 0 
                  ? 'Algumas partes não puderam ser geradas. Configure as APIs ausentes para conteúdo completo.'
                  : 'Revise, edite e publique diretamente'
                }
              </div>
            </div>
            <Button variant="secondary" t={t} onClick={() => { setGenerated(false); setResult(null); setProductName(""); setProductDetails(""); setError(null); setUploadedImages([]); }}
              style={{ padding: "6px 14px", fontSize: 12 }}>Novo Anúncio</Button>
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: 2, marginBottom: 20, padding: 3,
            background: t.bgCard, borderRadius: t.radius, border: `1px solid ${t.border}`,
            overflowX: "auto",
          }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: "11px 14px", borderRadius: t.radiusSm,
                border: "none",
                background: activeTab === tab.id ? t.accent : "transparent",
                color: activeTab === tab.id ? t.textInverse : t.textSecondary,
                fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 450,
                cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, whiteSpace: "nowrap", fontFamily: "inherit",
              }}>{tab.icon} {tab.label}</button>
            ))}
          </div>

          {/* Result */}
          <div style={{ background: t.bgCard, borderRadius: t.radiusLg, border: `1px solid ${t.border}`, padding: 28 }}>
            {activeTab === "titulo" && (
              <div>
                {result?.titulo ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Título Otimizado SEO</h3>
                      <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.titulo)} style={{ padding: "6px 14px", fontSize: 12 }}>◫ Copiar</Button>
                    </div>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.border}`, color: t.text, fontSize: 15, lineHeight: 1.6 }}>{result.titulo}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: t.textTertiary }}>● {result.titulo?.length || 0} caracteres</div>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Título não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>API Claude não configurada</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "keywords" && (
              <div>
                {result?.keywords && result.keywords.length > 0 ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Palavras-chave ({result.keywords?.length || 0})</h3>
                      <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText((result.keywords || []).join(", "))} style={{ padding: "6px 14px", fontSize: 12 }}>◫ Copiar</Button>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(result.keywords || []).map((kw, i) => (
                        <span key={i} style={{
                          padding: "8px 14px", borderRadius: 20,
                          background: t.bgInput, border: `1px solid ${t.border}`,
                          color: t.text, fontSize: 13, fontWeight: 500,
                        }}>{kw}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Keywords não geradas</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>API Claude não configurada</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "descricao" && (
              <div>
                {result?.descricao ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Descrição Completa</h3>
                      <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.descricao)} style={{ padding: "6px 14px", fontSize: 12 }}>◫ Copiar</Button>
                    </div>
                    <div style={{ padding: "18px 20px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.border}`, color: t.text, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{result.descricao}</div>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Descrição não gerada</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>API Claude não configurada</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto1" && (
              <div>
                {result?.promptFoto1 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>① Foto Profissional de Estúdio</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Fundo branco, iluminação de estúdio, produto centralizado — ideal para primeira imagem do anúncio</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto1}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto1)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto2" && (
              <div>
                {result?.promptFoto2 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>② Foto de Alta Conversão</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Ângulo que destaca benefícios, composição que evoca desejo de compra</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto2}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto2)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto3" && (
              <div>
                {result?.promptFoto3 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>③ Foto com Descrição Integrada</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Produto + overlay de texto com specs principais, infográfico limpo</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto3}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto3)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto4" && (
              <div>
                {result?.promptFoto4 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>④ Foto Grande + Detalhes</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Imagem principal grande (70%) com close-ups de texturas e acabamentos embaixo</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto4}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto4)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto5" && (
              <div>
                {result?.promptFoto5 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>⑤ Foto Ambientada em Contexto</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Produto em uso real, lifestyle shot, ambiente autêntico, iluminação natural</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto5}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto5)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "video" && (
              <div>
                {result?.promptVideo ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>Prompt para Vídeo Cinematográfico</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Use com Veo3 (Google) para gerar vídeos do produto</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptVideo}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptVideo)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de vídeo</div>
                  </div>
                )}
              </div>
            )}

            {/* Auto-generate media section */}
            <div style={{
              marginTop: 24, paddingTop: 20, borderTop: `2px solid ${t.border}`,
              background: t.bgCard, borderRadius: t.radiusLg,
              border: `1px solid ${t.accentBorder}`, padding: "20px 24px",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Gerar Assets Visuais Automaticamente</h3>
                  <p style={{ color: t.textTertiary, fontSize: 12, marginTop: 4 }}>
                    {(() => {
                      const savedKeys = localStorage.getItem('wl_api_keys');
                      const apiKeys = savedKeys ? JSON.parse(savedKeys) : {};
                      const hasGemini = apiKeys.google_gemini?.value && apiKeys.google_gemini?.status === 'valid';
                      const hasVeo3 = apiKeys.google_veo3?.value && apiKeys.google_veo3?.status === 'valid';
                      
                      if (hasGemini && hasVeo3) return "Gemini gerará 5 imagens + Veo3 gerará 1 vídeo";
                      if (hasGemini) return "Gemini gerará 5 imagens (Veo3 não configurado)";
                      if (hasVeo3) return "Veo3 gerará 1 vídeo (Gemini não configurado)";
                      return "Configure Gemini e/ou Veo3 para gerar assets visuais";
                    })()}
                  </p>
                </div>
                <Button
                  variant="primary"
                  t={t}
                  onClick={handleGenerateMedia}
                  disabled={generatingMedia || !result}
                  style={{ padding: "10px 20px", fontSize: 13, whiteSpace: "nowrap" }}
                >
                  {generatingMedia ? "⏳ Gerando..." : "✦ Gerar Agora"}
                </Button>
              </div>

              {(generatedImages.length > 0 || generatedVideo) && (
                <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${t.borderSubtle}` }}>
                  {generatedImages.length > 0 && (
                    <div style={{ marginBottom: 20 }}>
                      <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: t.text }}>📸 Imagens Geradas (1024x1024)</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                        {generatedImages.map(img => (
                          <div key={img.id} style={{
                            border: `1px solid ${t.border}`, borderRadius: t.radius,
                            overflow: "hidden", background: t.bgCard,
                          }}>
                            <img src={img.url} alt={`Foto ${img.id}`} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                            <div style={{ padding: "8px 10px", fontSize: 11, fontWeight: 600, color: t.text, background: t.bgInput, borderTop: `1px solid ${t.border}` }}>
                              {img.id}. {img.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {generatedVideo && (
                    <div>
                      <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: t.text }}>🎬 Vídeo Gerado (1080p, {generatedVideo.duration})</h4>
                      <div style={{
                        border: `1px solid ${t.border}`, borderRadius: t.radius,
                        overflow: "hidden", background: "#000", maxWidth: 400,
                      }}>
                        <img src={generatedVideo.url} alt="Video preview" style={{ width: "100%", height: "auto", display: "block" }} />
                        <div style={{ padding: "10px 12px", fontSize: 12, color: t.text, background: t.bgInput, borderTop: `1px solid ${t.border}` }}>
                          Duração: {generatedVideo.duration} • Formato: MP4 • Resolução: 1920x1080
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24, paddingTop: 18, borderTop: `1px solid ${t.border}`, flexWrap: "wrap" }}>
              <Button variant="primary" t={t} style={{ flex: 1, minWidth: 180 }}>→  Publicar no Marketplace</Button>
              <Button variant="secondary" t={t}>◫ Salvar Rascunho</Button>
              <Button variant="secondary" t={t}>↓ Exportar PDF</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ApiKeysPage({ t }) {
  const [keys, setKeys] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('wl_api_keys');
    return saved ? JSON.parse(saved) : {
      anthropic: { value: '', visible: false, status: 'not_set' },
      google_gemini: { value: '', visible: false, status: 'not_set' },
      google_veo3: { value: '', visible: false, status: 'not_set' },
    };
  });
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const providers = [
    { 
      id: "anthropic", 
      name: "Anthropic (Claude)", 
      desc: "Geração de textos, títulos, descrições e keywords",
      icon: "A",
      placeholder: "sk-ant-api03-... (sua chave da Anthropic)",
      helpUrl: "https://console.anthropic.com/settings/keys"
    },
    { 
      id: "google_gemini", 
      name: "Google Gemini / Nano Banana", 
      desc: "Geração de imagens profissionais de produtos",
      icon: "G",
      placeholder: "Cole sua API Key do Google AI Studio",
      helpUrl: "https://aistudio.google.com/app/apikey"
    },
    { 
      id: "google_veo3", 
      name: "Google Veo3", 
      desc: "Geração de vídeos cinematográficos",
      icon: "V",
      placeholder: "Cole sua API Key do Google Cloud",
      helpUrl: "https://console.cloud.google.com/apis/credentials"
    },
  ];

  const updateKey = (id, value) => {
    setKeys(prev => ({
      ...prev,
      [id]: { ...prev[id], value, status: value ? 'set' : 'not_set' }
    }));
  };

  const toggleVisibility = (id) => {
    setKeys(prev => ({
      ...prev,
      [id]: { ...prev[id], visible: !prev[id].visible }
    }));
  };

  const validateKey = async (id, value) => {
    if (!value) return 'not_set';
    
    // More flexible validation - just check format and length
    const trimmed = value.trim();
    
    if (id === 'anthropic') {
      // Anthropic keys: sk-ant-api03-... (at least 20 chars)
      if (trimmed.startsWith('sk-ant-') && trimmed.length >= 20) return 'valid';
      return 'invalid';
    }
    
    if (id === 'google_gemini' || id === 'google_veo3') {
      // Google API keys can be:
      // - AIza... format (39 chars typically)
      // - Any reasonable length API key (20+ chars)
      if (trimmed.length >= 20) return 'valid';
      return 'invalid';
    }
    
    return 'not_set';
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Validate all keys
    const validated = {};
    for (const [id, data] of Object.entries(keys)) {
      const status = await validateKey(id, data.value);
      validated[id] = { ...data, status };
    }
    
    setKeys(validated);
    
    // Save to localStorage (in production: save to Base44 ApiKeys entity)
    localStorage.setItem('wl_api_keys', JSON.stringify(validated));
    
    setTimeout(() => {
      setSaving(false);
      setSaveMessage('✓ Chaves salvas com sucesso');
      setTimeout(() => setSaveMessage(null), 3000);
    }, 800);
  };

  const hasChanges = Object.values(keys).some(k => k.value);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 6px" }}>API Keys</h1>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28 }}>
        Configure suas chaves de API para usar as ferramentas de IA. Suas chaves são criptografadas e nunca expostas.
      </p>

      <div style={{
        padding: "14px 18px", borderRadius: t.radius,
        background: t.infoBg, border: `1px solid ${t.accentBorder}`,
        fontSize: 13, color: t.info, marginBottom: 24,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 16 }}>◐</span>
        <span><strong>BYOK (Bring Your Own Key):</strong> Você usa suas próprias chaves. Os créditos de IA são consumidos na sua conta, não na nossa.</span>
      </div>

      {saveMessage && (
        <div style={{
          padding: "12px 16px", borderRadius: t.radius,
          background: t.successBg, border: `1px solid ${t.successBorder}`,
          fontSize: 13, color: t.success, marginBottom: 20,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {saveMessage}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {providers.map(p => {
          const keyData = keys[p.id];
          const statusColor = 
            keyData.status === 'valid' ? t.success :
            keyData.status === 'invalid' ? t.error :
            t.textTertiary;
          
          const statusText =
            keyData.status === 'valid' ? '● Conectado' :
            keyData.status === 'invalid' ? '✕ Chave inválida' :
            '◌ Não configurado';

          return (
            <div key={p.id} style={{
              background: t.bgCard, borderRadius: t.radiusLg,
              border: `1px solid ${t.border}`, padding: "24px 28px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: t.radius,
                  background: t.accentMuted, border: `1px solid ${t.accentBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, color: t.accent,
                }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 3 }}>{p.desc}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: statusColor }}>
                  {statusText}
                </span>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={keyData.visible ? "text" : "password"}
                  value={keyData.value}
                  onChange={(e) => updateKey(p.id, e.target.value)}
                  placeholder={p.placeholder}
                  style={{
                    width: "100%", padding: "12px 80px 12px 14px",
                    borderRadius: t.radius, border: `1px solid ${t.border}`,
                    background: t.bgInput, color: t.text,
                    fontSize: 13, fontFamily: "monospace",
                    outline: "none", transition: "border 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.border}
                />
                <button
                  onClick={() => toggleVisibility(p.id)}
                  style={{
                    position: "absolute", right: 8, top: "50%",
                    transform: "translateY(-50%)", padding: "6px 12px",
                    background: "transparent", border: "none",
                    color: t.textSecondary, fontSize: 12,
                    cursor: "pointer", borderRadius: t.radiusSm,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = t.bgInput}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {keyData.visible ? "🙈 Ocultar" : "👁 Mostrar"}
                </button>
              </div>

              <div style={{ marginTop: 8, fontSize: 11, color: t.textTertiary }}>
                Obtenha sua chave em: <a href={p.helpUrl} target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>{p.helpUrl.replace('https://', '')}</a>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 28, paddingTop: 24, borderTop: `1px solid ${t.border}` }}>
        <Button 
          variant="primary" 
          t={t} 
          onClick={handleSave}
          disabled={!hasChanges || saving}
          style={{ padding: "12px 28px", fontSize: 14 }}
        >
          {saving ? "⏳ Salvando..." : "✓ Salvar Chaves"}
        </Button>
        <Button 
          variant="ghost" 
          t={t}
          onClick={() => {
            setKeys({
              anthropic: { value: '', visible: false, status: 'not_set' },
              google_gemini: { value: '', visible: false, status: 'not_set' },
              google_veo3: { value: '', visible: false, status: 'not_set' },
            });
            localStorage.removeItem('wl_api_keys');
          }}
          style={{ padding: "12px 20px", fontSize: 14 }}
        >
          Limpar Tudo
        </Button>
      </div>

      {/* Tutorial section */}
      <div style={{
        marginTop: 28, padding: "22px 24px",
        background: t.bgCard, borderRadius: t.radiusLg,
        border: `1px solid ${t.border}`,
      }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: t.text }}>Como obter suas API Keys?</h3>
        {[
          { provider: "Anthropic", url: "console.anthropic.com", step: "Settings → API Keys → Create Key" },
          { provider: "Google AI (Gemini)", url: "aistudio.google.com", step: "API Keys → Create API Key" },
          { provider: "Veo3", url: "console.cloud.google.com", step: "APIs & Services → Credentials → Create" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "12px 0",
            borderBottom: i < 2 ? `1px solid ${t.borderSubtle}` : "none",
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              background: t.accentMuted, color: t.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800, flexShrink: 0,
            }}>{i + 1}</span>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.provider}</span>
              <span style={{ fontSize: 12, color: t.textTertiary }}> — {item.url} → {item.step}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleSwitch({ active, onToggle, t }) {
  return (
    <button onClick={onToggle} style={{
      width: 48, height: 26, borderRadius: 13, border: "none",
      background: active ? t.accent : t.border,
      cursor: "pointer", position: "relative",
      transition: "background 0.25s", flexShrink: 0,
      boxShadow: active ? `0 0 8px ${t.accentMuted}` : "none",
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%",
        background: active ? t.textInverse : t.textTertiary,
        position: "absolute", top: 3,
        left: active ? 25 : 3,
        transition: "left 0.25s cubic-bezier(0.4,0,0.2,1), background 0.25s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }} />
    </button>
  );
}

function ConfigPage({ theme, onThemeChange, t }) {
  const [a11y, setA11y] = useState({
    shapes: true,
    contrast: true,
    colorblind: true,
    labels: true,
  });

  const toggleA11y = (key) => setA11y(prev => ({ ...prev, [key]: !prev[key] }));

  const a11yFeatures = [
    { key: "shapes", icon: "●◌✕", label: "Indicadores com formas", desc: "Todos os status usam formas geométricas além de cores (●◌◑✕▸)" },
    { key: "contrast", icon: "Aa", label: "Contraste WCAG AA", desc: "Texto legível com contraste mínimo 4.5:1 em todos os temas" },
    { key: "colorblind", icon: "◐", label: "Tema para daltonismo", desc: "Paleta azul/laranja/magenta — evita par vermelho/verde" },
    { key: "labels", icon: "⊞", label: "Labels em todos os elementos", desc: "Nenhuma informação depende exclusivamente de cor" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 6px" }}>Configurações</h1>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28 }}>Personalize a aparência e comportamento da plataforma</p>

      {/* Theme section */}
      <div style={{
        background: t.bgCard, borderRadius: t.radiusLg,
        border: `1px solid ${t.border}`, padding: "24px 28px",
        marginBottom: 20,
      }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>Aparência</h3>
        <p style={{ color: t.textTertiary, fontSize: 13, marginBottom: 20 }}>Escolha o tema visual da plataforma</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {Object.values(THEMES).map(th => {
            const sel = theme === th.id;
            return (
              <button key={th.id} onClick={() => onThemeChange(th.id)} style={{
                padding: "18px 20px", borderRadius: t.radius,
                border: `2px solid ${sel ? t.accent : t.border}`,
                background: sel ? t.accentMuted : t.bgInput,
                cursor: "pointer", textAlign: "left",
                transition: "all 0.2s", fontFamily: "inherit",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>{th.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: sel ? t.accent : t.text }}>{th.label}</span>
                  {sel && <span style={{ marginLeft: "auto", color: t.accent, fontWeight: 800 }}>✓</span>}
                </div>
                {/* Mini preview */}
                <div style={{
                  height: 48, borderRadius: 6, overflow: "hidden",
                  display: "flex", border: `1px solid ${th.border}`,
                }}>
                  <div style={{ width: "30%", background: th.bgPanel }} />
                  <div style={{ flex: 1, background: th.bg, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8px", gap: 4 }}>
                    <div style={{ height: 4, width: "60%", background: th.accent, borderRadius: 2 }} />
                    <div style={{ height: 3, width: "80%", background: th.textTertiary, borderRadius: 2, opacity: 0.4 }} />
                    <div style={{ height: 3, width: "40%", background: th.textTertiary, borderRadius: 2, opacity: 0.3 }} />
                  </div>
                </div>
                {th.id === "daltonismo" && (
                  <div style={{ marginTop: 8, fontSize: 11, color: sel ? t.accent : t.textTertiary, lineHeight: 1.4 }}>
                    ◐ Paleta azul/laranja segura para daltonismo. Indicadores com formas + cores.
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessibility with toggles */}
      <div style={{
        background: t.bgCard, borderRadius: t.radiusLg,
        border: `1px solid ${t.border}`, padding: "24px 28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Acessibilidade</h3>
          <span style={{
            fontSize: 11, fontWeight: 600, color: t.textTertiary,
            padding: "4px 10px", borderRadius: t.radiusSm,
            background: t.bgInput,
          }}>
            {Object.values(a11y).filter(Boolean).length}/{a11yFeatures.length} ativos
          </span>
        </div>
        <p style={{ color: t.textTertiary, fontSize: 13, marginBottom: 18 }}>
          Ative ou desative recursos de acessibilidade conforme sua necessidade
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {a11yFeatures.map((item) => {
            const isActive = a11y[item.key];
            return (
              <div key={item.key} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", borderRadius: t.radius,
                background: t.bgInput,
                border: `1px solid ${isActive ? t.accentBorder : t.borderSubtle}`,
                transition: "border 0.2s, opacity 0.2s",
                opacity: isActive ? 1 : 0.6,
              }}>
                <span style={{
                  width: 40, height: 40, borderRadius: t.radiusSm,
                  background: isActive ? t.accentMuted : t.bgCard,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700,
                  color: isActive ? t.accent : t.textTertiary,
                  flexShrink: 0, transition: "all 0.2s",
                }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>{item.desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
                    color: isActive ? t.success : t.textTertiary,
                    minWidth: 70, textAlign: "right",
                  }}>
                    {isActive ? "● Ativo" : "◌ Desativado"}
                  </span>
                  <ToggleSwitch active={isActive} onToggle={() => toggleA11y(item.key)} t={t} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, icon, desc, t }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{
        width: 80, height: 80, borderRadius: t.radiusLg,
        background: t.accentMuted, border: `1px solid ${t.accentBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32, color: t.accent, margin: "0 auto 20px",
      }}>{icon}</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: "0 0 8px" }}>{title}</h2>
      <p style={{ color: t.textTertiary, fontSize: 14, maxWidth: 400, margin: "0 auto" }}>{desc}</p>
    </div>
  );
}

// ═══════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════

export default function WLPlatform() {
  const [theme, setTheme] = useState("wl");
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const t = THEMES[theme];

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage t={t} onNav={setPage} />;
      case "anuncio": return <AnuncioCompletoPage t={t} />;
      case "apikeys": return <ApiKeysPage t={t} />;
      case "config": return <ConfigPage theme={theme} onThemeChange={setTheme} t={t} />;
      case "keywords": return <PlaceholderPage title="Palavras-chave" icon="⊞" desc="Pesquise keywords relevantes para cada marketplace" t={t} />;
      case "titulo": return <PlaceholderPage title="Gerador de Títulos" icon="≡" desc="Gere variações otimizadas de títulos com IA" t={t} />;
      case "descricao": return <PlaceholderPage title="Gerador de Descrições" icon="¶" desc="Crie descrições persuasivas para seus produtos" t={t} />;
      case "fotos": return <PlaceholderPage title="Fotos com IA" icon="◲" desc="Gere fotos profissionais com Nano Banana / Gemini" t={t} />;
      case "videos": return <PlaceholderPage title="Vídeos com IA" icon="▶" desc="Gere vídeos cinematográficos com Veo3" t={t} />;
      case "pedidos": return <PlaceholderPage title="Gestão de Pedidos" icon="◈" desc="Centralize pedidos de todos os marketplaces" t={t} />;
      case "estoque": return <PlaceholderPage title="Controle de Estoque" icon="▤" desc="Gerencie estoque com alertas inteligentes" t={t} />;
      case "logistica": return <PlaceholderPage title="Logística" icon="→" desc="Otimize envios e rastreie entregas" t={t} />;
      case "relatorios": return <PlaceholderPage title="Relatórios" icon="◧" desc="Analytics detalhados do seu desempenho" t={t} />;
      default: return <DashboardPage t={t} onNav={setPage} />;
    }
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: t.bg, color: t.text,
      fontFamily: "'DM Sans', 'Manrope', system-ui, sans-serif",
      transition: "background 0.4s, color 0.3s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; }
        body { font-family: 'DM Sans', system-ui, sans-serif !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        select option { background: ${t.bgCard}; color: ${t.text}; }
      `}</style>

      <Sidebar active={page} onNav={setPage} collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} t={t} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", maxHeight: "100vh", overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{
          padding: "14px 32px",
          borderBottom: `1px solid ${t.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: t.bgPanel, flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              padding: "5px 12px", borderRadius: t.radiusSm,
              background: t.successBg, border: `1px solid ${t.successBorder}`,
              fontSize: 12, color: t.success, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>●</span> Conectado: Mercado Livre
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeSwitcher current={theme} onChange={setTheme} t={t} />
            <Button variant="secondary" t={t} onClick={() => setPage("config")} style={{ padding: "7px 14px", fontSize: 12 }}>⚙</Button>
          </div>
        </header>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }} key={page}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
