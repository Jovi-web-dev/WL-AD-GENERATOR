import { useEffect, useState } from "react";
import { STATUS_CONFIG, THEMES } from "../theme/themes";

export function StatusBadge({ status, t }) {
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

export function MetricCard({ icon, label, value, trend, t, delay = 0 }) {
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

export function InputField({ label, icon, required, placeholder, value, onChange, type = "text", t, rows }) {
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

export function SelectField({ label, icon, options, value, onChange, placeholder, t }) {
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

export function Button({ children, variant = "primary", onClick, disabled, fullWidth, t, style: sx }) {
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

export function ThemeSwitcher({ current, onChange, t }) {
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
