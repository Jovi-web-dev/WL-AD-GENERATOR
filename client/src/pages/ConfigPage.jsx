import { useState } from "react";
import { THEMES } from "../theme/themes";

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

export function ConfigPage({ theme, onThemeChange, t }) {
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
