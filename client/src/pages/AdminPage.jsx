import { useEffect, useState } from "react";
import { apiGetAdminOverview } from "../lib/api";

export function AdminPage({ t }) {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGetAdminOverview().then(setOverview).catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 6px" }}>Painel Admin</h1>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28 }}>Visão operacional inicial para usuários, créditos e gerações.</p>
      {error && <div style={{ padding: 16, background: t.errorBg, border: `1px solid ${t.errorBorder}`, borderRadius: t.radius, color: t.error }}>{error}</div>}
      {overview && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
          {[
            ["Usuários", overview.users],
            ["Gerações", overview.generations],
            ["Assets", overview.assets],
            ["Créditos usados", overview.creditsUsed]
          ].map(([label, value]) => (
            <div key={label} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: t.radiusLg, padding: 22 }}>
              <div style={{ color: t.textTertiary, fontSize: 12 }}>{label}</div>
              <div style={{ color: t.text, fontSize: 28, fontWeight: 900, marginTop: 8 }}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
