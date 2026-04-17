export function PlansPage({ t, user }) {
  const plans = [
    { name: "Starter", credits: 50, price: "R$ 49/mês" },
    { name: "Premium Pro", credits: 500, price: "R$ 149/mês" },
    { name: "Scale", credits: 2500, price: "R$ 499/mês" }
  ];

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: "0 0 6px" }}>Planos & Créditos</h1>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28 }}>Estrutura inicial para controlar uso de IA por geração.</p>
      <div style={{ padding: 18, background: t.successBg, border: `1px solid ${t.successBorder}`, borderRadius: t.radius, color: t.success, marginBottom: 22 }}>
        Plano atual: <strong>{user?.plan || "Premium Pro"}</strong> • Créditos usados: <strong>{user?.credits_used || 0}/{user?.credits_total || 500}</strong>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ background: t.bgCard, border: `1px solid ${plan.name === (user?.plan || "Premium Pro") ? t.accent : t.border}`, borderRadius: t.radiusLg, padding: 24 }}>
            <div style={{ color: t.accent, fontWeight: 800, fontSize: 18 }}>{plan.name}</div>
            <div style={{ color: t.text, fontSize: 28, fontWeight: 900, marginTop: 12 }}>{plan.credits}</div>
            <div style={{ color: t.textTertiary, fontSize: 12 }}>créditos/mês</div>
            <div style={{ marginTop: 18, color: t.textSecondary, fontWeight: 700 }}>{plan.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
