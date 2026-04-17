function placeholderSvg(label, sublabel, width = 400, height = 400, dark = false) {
  const bg = dark ? "000" : "f8f8f8";
  const fg = dark ? "fff" : "666";
  const muted = dark ? "ccc" : "999";
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect fill='%23${bg}' width='${width}' height='${height}'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23${fg}'%3E${encodeURIComponent(label)}%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23${muted}'%3E${encodeURIComponent(sublabel)}%3C/text%3E%3C/svg%3E`;
}

async function generateMedia({ productName, result }) {
  const prompts = [result.promptFoto1, result.promptFoto2, result.promptFoto3, result.promptFoto4, result.promptFoto5].filter(Boolean);
  const imageTypes = ["Estúdio", "Conversão", "c/ Descrição", "Detalhes", "Contexto"];
  const warnings = [];

  if (!process.env.GOOGLE_IMAGE_API_KEY && !process.env.GOOGLE_VERTEX_SERVICE_ACCOUNT) {
    warnings.push("Imagem em modo placeholder: configure provedor de imagem no servidor para geração real.");
  }
  if (!process.env.GOOGLE_VIDEO_API_KEY && !process.env.VEO3_API_KEY) {
    warnings.push("Vídeo em modo placeholder: configure provedor de vídeo no servidor para geração real.");
  }

  const images = prompts.map((prompt, index) => ({
    id: index + 1,
    type: imageTypes[index] || "Imagem",
    url: placeholderSvg(`Imagem ${index + 1}`, "Pipeline de imagem preparado"),
    prompt,
    generated: true
  }));

  const video = {
    url: placeholderSvg("Vídeo 15-30s", "Pipeline de vídeo preparado", 640, 360, true),
    duration: result.promptVideo?.includes("30") ? "30s" : "15s",
    prompt: result.promptVideo || `Cinematic product video of ${productName}`,
    generated: true
  };

  return { images, video, warnings };
}

module.exports = { generateMedia };
