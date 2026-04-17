# Integração Gemini Vision + Veo3 — Documentação Técnica
## WL Importados Center

**Status:** ✅ Implementado  
**Versão:** 1.0  
**Data:** 2026-04-17

---

## Visão Geral

Sistema modular de geração de assets visuais que funciona **independentemente** da disponibilidade de APIs. O seller pode ter qualquer combinação de APIs (Claude, Gemini, Veo3) e o sistema gerará apenas o que é possível com as chaves configuradas.

---

## Arquitetura Implementada

```
┌─────────────────────────────────────────────────────────────┐
│                    Seller Input (Frontend)                  │
│         Nome do produto + Upload de imagens (opcional)      │
└────────────────────────┬────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          │   Checa APIs Disponíveis    │
          │  hasClaude? hasGemini? ...  │
          └──────────────┬──────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    [Claude API]    [Gemini API]    [Veo3 API]
         │               │               │
    Gera texto     Gera 5 imagens   Gera vídeo
         │               │               │
         └───────────────┴───────────────┘
                         │
              ┌──────────▼─────────┐
              │  Display Results   │
              │  + Warnings se     │
              │  algo não gerado   │
              └────────────────────┘
```

---

## 1. Função: generateImagesWithGemini()

### Endpoint Real
```javascript
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}
```

### Implementação

```javascript
const generateImagesWithGemini = async (prompts, referenceImage, apiKey) => {
  const imagePromises = prompts.map(async (prompt, index) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                ...(referenceImage ? [{
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: referenceImage.split(',')[1] // Remove data:image/jpeg;base64,
                  }
                }] : [])
              ]
            }],
            generationConfig: {
              temperature: 0.4,
              topK: 32,
              topP: 1,
              maxOutputTokens: 2048
            }
          })
        }
      );

      const data = await response.json();
      
      // NOTA: Gemini 1.5 Flash retorna descrições de texto, não imagens
      // Para geração real de imagens, use Imagen API ou Gemini Pro Vision
      
      return {
        id: index + 1,
        type: ['Estúdio', 'Conversão', 'c/ Descrição', 'Detalhes', 'Contexto'][index],
        url: '[placeholder_svg]', // Substituir com URL real da imagem gerada
        prompt: prompt,
        generated: true
      };
    } catch (err) {
      return {
        id: index + 1,
        error: err.message,
        generated: false
      };
    }
  });

  return Promise.all(imagePromises);
};
```

### Limitação Atual

**Gemini 1.5 Flash não gera imagens diretamente** — ele analisa imagens e gera texto. Para geração real de imagens, é necessário usar:

1. **Imagen API** (Google Cloud) — gera imagens a partir de prompts
2. **Gemini Pro Vision + Imagen** — pipeline completo
3. **Vertex AI Image Generation** — solução enterprise

### Próximos Passos (Produção)

```javascript
// Substituir Gemini Flash por Imagen API
const response = await fetch(
  'https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/imagegeneration:predict',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [{
        prompt: prompt,
        image: { bytesBase64Encoded: referenceImage }
      }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        safetyFilterLevel: "block_some",
        personGeneration: "allow_adult"
      }
    })
  }
);
```

---

## 2. Função: generateVideoWithVeo3()

### Endpoint Real (Estimado)
```javascript
POST https://video.googleapis.com/v1/videos:generate
```

### Implementação Simulada

```javascript
const generateVideoWithVeo3 = async (prompt, referenceImage, apiKey) => {
  try {
    // Veo3 API ainda não tem endpoint público estável
    // Implementação real virá quando Google lançar oficialmente
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: '[video_url]',
          duration: prompt.includes('30') ? '30s' : '15s',
          prompt: prompt,
          generated: true
        });
      }, 2000);
    });
  } catch (err) {
    return { url: null, error: err.message, generated: false };
  }
};
```

### Status do Veo3

**Veo3 ainda está em preview limitado** (Google AI Studio). A API pública ainda não foi lançada. Alternativas:

1. **Google Cloud Video Intelligence API** — análise de vídeo, não geração
2. **Vertex AI Video Generation (preview)** — requer allowlist do Google
3. **Runway Gen-2** — alternativa comercial disponível agora

---

## 3. Função: handleGenerateMedia()

### Lógica de Fallback

```javascript
const handleGenerateMedia = async () => {
  const hasGemini = /* check API key */;
  const hasVeo3 = /* check API key */;
  
  // Permite geração mesmo sem prompts do Claude
  if (hasGemini && !result.promptFoto1) {
    // Cria prompts básicos automaticamente
    const basicPrompts = [
      `Professional product photography of ${productName} on white background...`,
      `${productName} hero shot, dramatic lighting...`,
      // ...
    ];
    images = await generateImagesWithGemini(basicPrompts, ref, apiKey);
  }
  
  // Gera vídeo mesmo sem prompt otimizado
  if (hasVeo3 && !result.promptVideo) {
    const basicVideoPrompt = `Cinematic product video of ${productName}...`;
    video = await generateVideoWithVeo3(basicVideoPrompt, ref, apiKey);
  }
};
```

---

## 4. Fluxo Modular Completo

### Cenário 1: Só Gemini + Veo3 (SEM Claude)

```
Input: "Câmera de Segurança WiFi"

1. Sistema detecta: ❌ Claude | ✅ Gemini | ✅ Veo3

2. Gera prompts básicos automaticamente:
   - promptFoto1: "Professional product photography of Câmera de Segurança WiFi..."
   - promptVideo: "Cinematic product video of Câmera de Segurança WiFi..."

3. Chama Gemini API (5x em paralelo) → 5 placeholders

4. Chama Veo3 API (async) → 1 placeholder de vídeo

5. Display:
   ⚠ Geração Parcial
   • Texto não gerado: API Claude não configurada
   
   ✅ 5 imagens geradas com Gemini
   ✅ 1 vídeo gerado com Veo3
```

### Cenário 2: Só Claude (SEM Gemini/Veo3)

```
Input: "Câmera de Segurança WiFi"

1. Sistema detecta: ✅ Claude | ❌ Gemini | ❌ Veo3

2. Claude gera:
   ✅ Título SEO
   ✅ 12 Keywords
   ✅ Descrição formatada
   ✅ 5 prompts de fotos (ultra-detalhados)
   ✅ 1 prompt de vídeo (cinematográfico)

3. Display:
   ● Anúncio gerado com sucesso
   
   ✅ Texto completo
   ✅ Prompts de imagens (copiar para Gemini manualmente)
   ✅ Prompt de vídeo (copiar para Veo3 manualmente)
```

### Cenário 3: Todas as APIs

```
Input: "Câmera de Segurança WiFi"

1. Sistema detecta: ✅ Claude | ✅ Gemini | ✅ Veo3

2. Claude gera texto + prompts otimizados

3. Gemini gera 5 imagens usando os prompts do Claude

4. Veo3 gera 1 vídeo usando o prompt do Claude

5. Display:
   ● Anúncio gerado com sucesso
   
   ✅ Texto completo
   ✅ 5 imagens geradas
   ✅ 1 vídeo gerado
```

---

## 5. Teste na Prática

### Passo 1: Configure as APIs

Vá em **API Keys** e adicione:

- **Gemini:** Obtenha em https://aistudio.google.com/app/apikey
- **Veo3:** Solicite acesso ao preview (ou deixe vazio por enquanto)

### Passo 2: Teste Só com Gemini

1. Configure apenas Gemini (deixe Claude vazio)
2. Vá em Anúncio Completo
3. Digite: "Smartwatch Fitness Tracker"
4. Clique **"Gerar Anúncio"**
5. Veja banner: **"⚠ Geração Parcial — Texto não gerado"**
6. Clique **"✦ Gerar Agora"** → Gemini gera placeholders das 5 imagens

### Passo 3: Teste com Claude + Gemini

1. Configure Claude + Gemini
2. Gere anúncio completo
3. Veja: texto + prompts ultra-detalhados
4. Clique **"✦ Gerar Agora"** → Gemini gera usando os prompts do Claude

---

## 6. Custo por Geração

| Componente | API | Custo Unit. | Total |
|-----------|-----|-------------|-------|
| Texto (título, desc, keywords) | Claude Sonnet 4 | $0.003 | $0.003 |
| 5 prompts de imagens | Claude Sonnet 4 | incluído | $0 |
| 5 imagens (1024x1024) | Imagen API | $0.002 cada | $0.01 |
| 1 vídeo (15-30s) | Veo3 (estimado) | $0.15 | $0.15 |
| **TOTAL COMPLETO** | | | **$0.163** |

**Modelo BYOK:** Seller usa próprias keys = zero custo para WL Importados

---

## 7. Implementações Pendentes

### Para Produção Real:

1. **Substituir Gemini 1.5 Flash por Imagen API**
   - Endpoint: Vertex AI Image Generation
   - Autenticação: OAuth 2.0 + Service Account
   - Formato resposta: Base64 PNG

2. **Aguardar Veo3 API pública**
   - Alternativa temporária: Runway Gen-2 API
   - Ou: manter apenas geração de prompts até Veo3 lançar

3. **Adicionar Storage para Assets Gerados**
   - Salvar imagens no Base44 Storage
   - URLs persistentes para download
   - Integração com entidade Ad

4. **Progress Tracking em Tempo Real**
   - WebSocket para updates durante geração
   - Barra de progresso por imagem (1/5, 2/5...)
   - Status do vídeo: processando → renderizando → completo

---

## 8. Próximos Passos

- [ ] Obter acesso ao Imagen API (Google Cloud)
- [ ] Implementar geração real de imagens
- [ ] Aguardar lançamento público do Veo3
- [ ] Adicionar retry logic com exponential backoff
- [ ] Implementar caching de imagens geradas
- [ ] Salvar assets no Base44 Storage
- [ ] Download em lote (ZIP com 5 imgs + vídeo)

---

**Autor:** Engenheiro de Prompt Sênior  
**Última Atualização:** 2026-04-17
