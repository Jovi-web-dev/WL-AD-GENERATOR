// ===============================================================
// CONFIGURACAO DE TIERS / PLANOS
// ---------------------------------------------------------------
// Fonte unica de verdade para os 3 planos do produto.
// Usada tanto pela UI (exibicao de cota, upsell, gating visual)
// quanto como referencia para o backend (ver server/src/config/tiers.js
// quando este for criado na Etapa 3).
//
// Regras:
// - Tier chaveia pelo id minusculo (coincide com users.plan no banco).
// - dailyQuota e monthlyQuota sao aplicados em conjunto (AND):
//   o que estourar primeiro bloqueia a geracao.
// - features = quais blocos do anuncio completo sao entregues por
//   uma chamada de "gerar anuncio completo" neste tier.
// ===============================================================

export const TIERS = {
  starter: {
    id: "starter",
    label: "Starter",
    dailyQuota: 1,
    monthlyQuota: 30,
    features: {
      titleTraditional: true,
      titleCatalog: false,
      longTail: true,
      keywords: true,
      tags: false,
      description: true,
      images: 0,
      video: false,
    },
    // Numero de imagens geradas quando features.images > 0
    imageCount: 0,
    // Curto upsell para mostrar em cards bloqueados
    upsellTarget: "pro",
  },
  pro: {
    id: "pro",
    label: "Pro",
    dailyQuota: 2,
    monthlyQuota: 60,
    features: {
      titleTraditional: true,
      titleCatalog: true,
      longTail: true,
      keywords: true,
      tags: true,
      description: true,
      images: 4,
      video: false,
    },
    imageCount: 4,
    upsellTarget: "premium",
  },
  premium: {
    id: "premium",
    label: "Premium",
    dailyQuota: 3,
    monthlyQuota: 90,
    features: {
      titleTraditional: true,
      titleCatalog: true,
      longTail: true,
      keywords: true,
      tags: true,
      description: true,
      images: 5,
      video: true,
    },
    imageCount: 5,
    upsellTarget: null,
  },
};

// Tier default quando users.plan nao bate com nenhum conhecido
export const DEFAULT_TIER_ID = "starter";

export function getTier(planId) {
  if (!planId) return TIERS[DEFAULT_TIER_ID];
  const key = String(planId).toLowerCase();
  return TIERS[key] || TIERS[DEFAULT_TIER_ID];
}
