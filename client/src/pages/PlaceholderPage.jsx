export function PlaceholderPage({ title, icon, desc, t }) {
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
