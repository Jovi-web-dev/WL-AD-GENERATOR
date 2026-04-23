import { TIERS, getTier } from "../config/tiers";

// Feature labels exibidos em cada plano. Derivados de tier.features.
function featureList(tier) {
  const items = [];
  if (tier.features.titleTraditional) items.push("Titulo tradicional");
  if (tier.features.titleCatalog) items.push("Titulo de catalogo");
  if (tier.features.longTail) items.push("Titulo long-tail");
  if (tier.features.keywords) items.push("Palavras-chave");
  if (tier.features.tags) items.push("Tags otimizadas");
  if (tier.features.description) items.push("Descricao completa");
  if (tier.features.images > 0) items.push(`${tier.features.images} imagens com IA`);
  if (tier.features.video) items.push("1 clipe de 15–30s");
  return items;
}

export function PlansPage({ t, user }) {
  const currentTier = getTier(user?.plan);
  const plans = [TIERS.starter, TIERS.pro, TIERS.premium];

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 6px" }}>Planos</h1>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28 }}>
        Assinaturas liberam acesso a diferentes volumes de geracao por dia. O custo das APIs de IA
        e pago diretamente pelo cliente atraves das chaves cadastradas (BYOK).
      </p>

      <div style={{
        padding: 18, background: t.successBg, border: `1px solid ${t.successBorder}`,
        borderRadius: t.radius, color: t.success, marginBottom: 22,
      }}>
        Plano atual: <strong>{currentTier.label}</strong>
        {" • "}
        Uso hoje: <strong>{user?.daily_used ?? 0}/{currentTier.dailyQuota}</strong>
        {" • "}
        No mes: <strong>{user?.monthly_used ?? 0}/{currentTier.monthlyQuota}</strong>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {plans.map(plan => {
          const isCurrent = plan.id === currentTier.id;
          return (
            <div key={plan.id} style={{
              background: t.bgCard,
              border: `1px solid ${isCurrent ? t.accent : t.border}`,
              borderRadius: t.radiusLg, padding: 24,
              position: "relative",
            }}>
              {isCurrent && (
                <span style={{
                  position: "absolute", top: 12, right: 12,
                  padding: "3px 8px", borderRadius: t.radiusSm,
                  background: t.accentMuted, border: `1px solid ${t.accentBorder}`,
                  fontSize: 10, fontWeight: 700, color: t.accent, letterSpacing: 1,
                }}>ATUAL</span>
              )}
              <div style={{ color: t.accent, fontWeight: 800, fontSize: 18 }}>{plan.label}</div>
              <div style={{ color: t.text, fontSize: 28, fontWeight: 900, marginTop: 12 }}>
                {plan.dailyQuota}
                <span style={{ fontSize: 14, fontWeight: 500, color: t.textTertiary, marginLeft: 6 }}>
                  / dia
                </span>
              </div>
              <div style={{ color: t.textTertiary, fontSize: 12, marginTop: 2 }}>
                ate {plan.monthlyQuota} anuncios no mes
              </div>

              <div style={{ marginTop: 18, borderTop: `1px solid ${t.border}`, paddingTop: 14 }}>
                {featureList(plan).map((feat, i) => (
                  <div key={i} style={{
                    fontSize: 12, color: t.textSecondary,
                    marginBottom: 6, display: "flex", gap: 8,
                  }}>
                    <span style={{ color: t.accent }}>✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 28, padding: "14px 18px", borderRadius: t.radius,
        background: t.bgCard, border: `1px dashed ${t.border}`,
        fontSize: 12, color: t.textTertiary, lineHeight: 1.6,
      }}>
        <strong style={{ color: t.textSecondary }}>Observacao:</strong>{" "}
        Precos e fluxo de pagamento serao habilitados em etapa posterior.
        Hoje a mudanca de plano e feita manualmente pela equipe.
      </div>
    </div>
  );
}
