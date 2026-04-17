import { useEffect, useState } from "react";
import { Button, MetricCard } from "../components/ui";
import { apiGetGenerations } from "../lib/api";

export function DashboardPage({ t, onNav }) {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    apiGetGenerations()
      .then(data => setGenerations(data.generations || []))
      .catch(() => setGenerations([]));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.3 }}>Dashboard</h1>
        <p style={{ color: t.textTertiary, margin: "6px 0 0", fontSize: 14 }}>Visão geral da operação em todos os marketplaces</p>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
        <MetricCard icon="◈" label="Anúncios Gerados" value={String(generations.length)} t={t} delay={0} />
        <MetricCard icon="$" label="Vendas (mês)" value="R$ 0" t={t} delay={80} />
        <MetricCard icon="%" label="Conversão" value="0%" t={t} delay={160} />
        <MetricCard icon="★" label="Reputação" value="—" t={t} delay={240} />
      </div>

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

        {generations.length === 0 ? (
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
        ) : (
          generations.slice(0, 5).map(item => (
            <div key={item.id} style={{ padding: "16px 24px", borderBottom: `1px solid ${t.borderSubtle}`, display: "flex", justifyContent: "space-between", gap: 18 }}>
              <div>
                <div style={{ color: t.text, fontWeight: 700 }}>{item.product_name}</div>
                <div style={{ color: t.textTertiary, fontSize: 12, marginTop: 4 }}>{new Date(item.created_at).toLocaleString("pt-BR")}</div>
              </div>
              <Button variant="ghost" t={t} onClick={() => onNav("historico")} style={{ padding: "7px 12px", fontSize: 12 }}>
                Ver histórico
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

