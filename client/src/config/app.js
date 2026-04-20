// ===============================================================
// IDENTIDADE DA PLATAFORMA
// ---------------------------------------------------------------
// Ponto unico de configuracao do nome comercial.
// Quando o nome definitivo for escolhido (ex.: "Anuncia", "AdForge"),
// basta alterar abaixo. Nenhum texto de marca deve ser hardcoded
// em paginas ou componentes.
// ===============================================================
export const BRAND = {
  // Nome curto, usado em logo e header
  shortName: "AdGen",
  // Nome completo, usado em titulos e texto descritivo
  fullName: "AdGen Platform",
  // Sigla de 2 caracteres para o selo do logo (substituivel por <img> depois)
  mark: "AG",
  // Tagline opcional para tela de login / landing
  tagline: "Geracao de anuncios completos para marketplaces"
};

export const NAV = [
  { id: "dashboard", icon: "◫", label: "Dashboard" },
  { id: "anuncio", icon: "✦", label: "Anúncio Completo", badge: "PRO" },
  { id: "divider1", type: "divider", label: "FERRAMENTAS" },
  { id: "keywords", icon: "⊞", label: "Palavras-chave" },
  { id: "titulo", icon: "≡", label: "Títulos" },
  { id: "descricao", icon: "¶", label: "Descrições" },
  { id: "fotos", icon: "◲", label: "Fotos IA" },
  { id: "videos", icon: "▶", label: "Vídeos IA", badge: "NEW" },
  { id: "divider2", type: "divider", label: "GESTÃO" },
  { id: "pedidos", icon: "◈", label: "Pedidos" },
  { id: "estoque", icon: "▤", label: "Estoque" },
  { id: "logistica", icon: "→", label: "Logística" },
  { id: "relatorios", icon: "◧", label: "Relatórios" },
  { id: "historico", icon: "◷", label: "Histórico" },
  { id: "planos", icon: "$", label: "Planos & Créditos" },
  { id: "admin", icon: "◬", label: "Admin", badge: "ADM" },
  { id: "divider3", type: "divider", label: "SISTEMA" },
  { id: "apikeys", icon: "⚿", label: "API Keys" },
  { id: "config", icon: "⚙", label: "Configurações" },
];

export const CATEGORIES = [
  "Eletrônicos", "Celulares e Acessórios", "Informática", "Casa e Decoração",
  "Esporte e Lazer", "Automotivo", "Beleza e Cuidado Pessoal", "Brinquedos",
  "Ferramentas", "Moda e Acessórios", "Saúde", "Games"
];

export const MARKETPLACES = [
  { id: "ml", name: "Mercado Livre", symbol: "ML", hue: 50 },
  { id: "shopee", name: "Shopee", symbol: "SP", hue: 15 },
  { id: "amazon", name: "Amazon", symbol: "AZ", hue: 30 },
  { id: "magalu", name: "Magalu", symbol: "MG", hue: 210 },
];
