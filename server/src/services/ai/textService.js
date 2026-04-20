function fallbackContent(input) {
  const productName = input.productName;
  const marketplaces = Array.isArray(input.marketplaces) && input.marketplaces.length ? input.marketplaces.join(", ") : "Mercado Livre";
  const titleBase = `${productName} - Qualidade Premium`;
  const titulo = titleBase.length > 60 ? titleBase.slice(0, 57) + "..." : titleBase;

  return {
    titulo,
    keywords: [
      productName,
      "produto premium",
      "mercado livre",
      "oferta",
      "garantia",
      "qualidade",
      "envio rapido",
      "melhor preco",
      "pronta entrega",
      input.category || "ecommerce",
      input.tone || "profissional"
    ].filter(Boolean).slice(0, 12),
    descricao: `${productName}\n\nDisponivel para venda em ${marketplaces}.\n\nDestaques principais:\n- Qualidade premium\n- Excelente custo-beneficio\n- Ideal para quem busca praticidade e confianca\n\nSuporte e atendimento pos-venda.`,
    promptFoto1: `Professional studio product photography: ${productName} centered on pure white background, 3-point studio lighting, 3/4 angle view, soft shadows, sharp focus, commercial e-commerce quality, 1024x1024px`,
    promptFoto2: `High-conversion product shot: ${productName} hero angle, dramatic lighting, rule of thirds composition, warm color grading, professional retouching, 1024x1024px`,
    promptFoto3: `Product infographic: ${productName} with text overlay showing specs, modern typography, color-coded callouts, clean data visualization, 1024x1024px`,
    promptFoto4: `Product detail grid: Large ${productName} hero shot with close-up detail tiles, material textures, build quality, 1024x1024px`,
    promptFoto5: `Lifestyle product scene: ${productName} in authentic usage environment, natural golden hour lighting, aspirational setting, 1024x1024px`,
    promptVideo: `Cinematic product video 15s: ${productName} dramatic reveal, 360 degree rotation, close-up details, lifestyle usage, brand overlay, 1080p 24fps`,
    warnings: ["Conteúdo gerado em modo seguro local: configure ANTHROPIC_API_KEY no servidor para usar IA real."]
  };
}

async function generateTextContent(input) {
  if (!process.env.ANTHROPIC_API_KEY) return fallbackContent(input);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest",
      max_tokens: 3000,
      messages: [{
        role: "user",
        content: `Responda somente JSON válido para anúncio de e-commerce. Produto: ${input.productName}. Detalhes: ${input.productDetails || "Não informado"}. Categoria: ${input.category || "Não informada"}. Tom: ${input.tone || "profissional"}. Gere titulo, keywords array, descricao, promptFoto1..promptFoto5 e promptVideo.`
      }]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    const err = new Error(`Falha Anthropic: ${text}`);
    err.status = 502;
    throw err;
  }

  const data = await response.json();
  const text = data.content?.map(item => item.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  if (typeof parsed.keywords === "string") parsed.keywords = parsed.keywords.split(",").map(k => k.trim());
  return { ...parsed, warnings: parsed.warnings || [] };
}

module.exports = { generateTextContent };
