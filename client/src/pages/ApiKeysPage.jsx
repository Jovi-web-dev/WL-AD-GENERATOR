import { useEffect, useState } from "react";
import { apiGetProviderStatus } from "../lib/api";

export function ApiKeysPage({ t }) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetProviderStatus().then(data => setProviders(data.providers || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 6px" }}>API Keys</h1>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28 }}>As chaves de IA não são mais salvas no navegador. Elas devem ficar como segredos do servidor.</p>

      <div style={{ padding: "14px 18px", borderRadius: t.radius, background: t.infoBg, border: `1px solid ${t.accentBorder}`, fontSize: 13, color: t.info, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
        <span>◐</span>
        <span><strong>Segurança:</strong> o front-end só consulta o status das integrações. Valores secretos nunca são retornados pela API.</span>
      </div>

      {loading && <div style={{ color: t.textTertiary }}>Carregando integrações...</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {providers.map(provider => (
          <div key={provider.id} style={{ background: t.bgCard, borderRadius: t.radiusLg, border: `1px solid ${t.border}`, padding: "22px 26px", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 46, height: 46, borderRadius: t.radius, background: t.accentMuted, border: `1px solid ${t.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: t.accent }}>{provider.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{provider.name}</div>
              <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 3 }}>{provider.description}</div>
              <div style={{ fontSize: 11, color: t.textTertiary, marginTop: 7 }}>Variável: <code>{provider.envKey}</code></div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: provider.configured ? t.success : t.warning }}>
              {provider.configured ? "● Configurado" : "◌ Pendente"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
