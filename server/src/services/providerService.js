function providerStatus() {
  return [
    {
      id: "anthropic",
      name: "Anthropic Claude",
      description: "Geração de títulos, descrições, keywords e prompts técnicos.",
      icon: "A",
      envKey: "ANTHROPIC_API_KEY",
      configured: Boolean(process.env.ANTHROPIC_API_KEY)
    },
    {
      id: "google_image",
      name: "Google Imagen / Vertex AI",
      description: "Geração futura de imagens profissionais de produto.",
      icon: "G",
      envKey: "GOOGLE_IMAGE_API_KEY ou GOOGLE_VERTEX_SERVICE_ACCOUNT",
      configured: Boolean(process.env.GOOGLE_IMAGE_API_KEY || process.env.GOOGLE_VERTEX_SERVICE_ACCOUNT)
    },
    {
      id: "veo3",
      name: "Google Veo3 / Vídeo",
      description: "Geração futura de vídeos cinematográficos assíncronos.",
      icon: "V",
      envKey: "VEO3_API_KEY ou GOOGLE_VIDEO_API_KEY",
      configured: Boolean(process.env.VEO3_API_KEY || process.env.GOOGLE_VIDEO_API_KEY)
    }
  ];
}

module.exports = { providerStatus };
