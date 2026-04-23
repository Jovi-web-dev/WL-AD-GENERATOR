// ===============================================================
// CONFIGURACAO DE TIERS / PLANOS (servidor)
// ---------------------------------------------------------------
// Espelho de client/src/config/tiers.js em CommonJS.
// Fonte da verdade do enforcement de cotas.
//
// IMPORTANTE: se alterar valores aqui, alterar tambem em
// client/src/config/tiers.js. Na Etapa 3 iremos unificar atraves
// de um pacote shared/ empacotado corretamente.
// ===============================================================

const TIERS = {
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
  },
};

const DEFAULT_TIER_ID = "starter";

function getTier(planId) {
  if (!planId) return TIERS[DEFAULT_TIER_ID];
  const key = String(planId).toLowerCase();
  return TIERS[key] || TIERS[DEFAULT_TIER_ID];
}

module.exports = { TIERS, DEFAULT_TIER_ID, getTier };
