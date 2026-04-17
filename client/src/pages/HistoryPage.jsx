import { useEffect, useState } from "react";
import { apiGetGenerations } from "../lib/api";

export function HistoryPage({ t }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetGenerations().then(data => setItems(data.generations || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 6px" }}>Histórico</h1>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28 }}>Gerações salvas no banco de dados por usuário autenticado.</p>
      <div style={{ background: t.bgCard, borderRadius: t.radiusLg, border: `1px solid ${t.border}`, overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${t.border}`, fontWeight: 700 }}>Anúncios Gerados</div>
        {loading && <div style={{ padding: 24, color: t.textTertiary }}>Carregando...</div>}
        {!loading && items.length === 0 && <div style={{ padding: 42, textAlign: "center", color: t.textTertiary }}>Nenhuma geração salva ainda.</div>}
        {items.map(item => (
          <div key={item.id} style={{ padding: "18px 24px", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", gap: 18 }}>
            <div>
              <div style={{ color: t.text, fontWeight: 700 }}>{item.product_name}</div>
              <div style={{ color: t.textTertiary, fontSize: 12, marginTop: 4 }}>{item.category || "Sem categoria"} • {new Date(item.created_at).toLocaleString("pt-BR")}</div>
            </div>
            <div style={{ color: t.accent, fontSize: 12, fontWeight: 700 }}>{item.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
