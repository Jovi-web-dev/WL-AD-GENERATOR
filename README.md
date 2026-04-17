# WL Importados Center - Plataforma SaaS de Geração de Anúncios com IA

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/react-18.2.0-61dafb)
![Status](https://img.shields.io/badge/status-prototype-orange)

**Plataforma completa para gerar anúncios de e-commerce usando IA generativa.**

---

## 🎯 Visão Geral

Sistema modular que integra Claude (Anthropic), Gemini Vision (Google) e Veo3 (Google) para criar automaticamente:

- ✅ **Títulos SEO otimizados** (60 caracteres para Mercado Livre)
- ✅ **12 keywords** relevantes para busca
- ✅ **Descrições formatadas** com emojis e garantia
- ✅ **5 prompts de imagens** (profissional, conversão, infográfico, detalhes, contexto)
- ✅ **1 prompt de vídeo cinematográfico** (15-30s)
- ✅ **Geração automática de assets visuais** (quando APIs configuradas)

---

## 🚀 Instalação Rápida

```bash
# 1. Extrair o ZIP
unzip wl-importados-platform.zip
cd wl-importados-platform

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm start
```

O navegador abrirá automaticamente em `http://localhost:3000`

---

## 🔑 Configuração de API Keys

### Obter Chaves:

1. **Claude (Anthropic):** https://console.anthropic.com/
   - Crie uma conta → API Keys → Create Key
   - Formato: `sk-ant-api03-...`

2. **Gemini (Google):** https://aistudio.google.com/app/apikey
   - Google Account → Get API Key
   - Formato: qualquer chave com 20+ caracteres

3. **Veo3 (Google):** Solicitar acesso ao preview
   - Status: API ainda não pública
   - Alternativa: Runway Gen-2

### Configurar no App:

1. Abra a plataforma
2. Vá em **"API Keys"** (navegação superior)
3. Cole suas chaves
4. Clique **"Salvar Chaves"**
5. Veja status: ● Conectado / ✕ Chave inválida

---

## 📖 Como Usar

### Gerar Anúncio Completo:

```
1. Navegação → "Anúncio Completo"
2. Preencha:
   - Nome do produto: "Smartwatch Fitness Tracker"
   - Detalhes (opcional): "À prova d'água, monitor cardíaco, 7 dias bateria"
   - Categoria: Eletrônicos
   - Marketplace: Mercado Livre, Shopee
   - Tom: Profissional
3. Upload de imagens (opcional, até 5 fotos)
4. Clique "Gerar Anúncio Completo com IA"
5. Aguarde geração (texto + prompts)
6. Clique "✦ Gerar Agora" para criar imagens/vídeo
```

### Navegação:

- **Anúncio Completo:** Gera tudo de uma vez
- **Título:** Apenas título SEO
- **Keywords:** Apenas palavras-chave
- **Descrição:** Apenas texto descritivo
- **Fotos 1-5:** Prompts individuais de imagens
- **Vídeo:** Prompt cinematográfico
- **API Keys:** Gerenciar credenciais
- **Temas:** 4 opções de aparência

---

## 🎨 Temas Disponíveis

1. **Padrão WL** - Azul/roxo, design moderno
2. **Branco** - Minimalista, foco no conteúdo
3. **Black** - Escuro, contraste alto
4. **Acessível** - Alto contraste, fonte maior (WCAG AAA)

---

## 🧩 Sistema Modular

O sistema funciona com **qualquer combinação de APIs**:

| APIs Configuradas | O Que é Gerado |
|-------------------|----------------|
| Só Claude | Texto + Prompts (sem assets visuais) |
| Só Gemini | 5 imagens (sem texto) |
| Só Veo3 | 1 vídeo (sem texto) |
| Claude + Gemini | Texto + 5 imagens |
| Claude + Veo3 | Texto + 1 vídeo |
| Gemini + Veo3 | 5 imagens + 1 vídeo (sem texto) |
| **Todas** | **Experiência completa** |

### Warnings Automáticos:

Quando algo não é gerado, o sistema mostra:

```
⚠ Geração Parcial
• Texto não gerado: API Claude não configurada
• Configure as APIs ausentes em "API Keys"
```

---

## 📁 Estrutura do Projeto

```
wl-importados-platform/
├── package.json          # Dependências e scripts
├── README.md             # Este arquivo
├── .gitignore            # Arquivos ignorados pelo Git
│
├── public/
│   └── index.html        # HTML base
│
├── src/
│   ├── index.js          # Entry point React
│   ├── App.jsx           # Componente principal (2,009 linhas)
│   └── assets/
│       └── logo.svg      # Logo WL Importados
│
└── docs/
    ├── INTEGRACAO-GEMINI-VEO3.md     # Documentação técnica de APIs
    ├── RESUMO-IMPLEMENTACAO.md       # Resumo executivo
    └── WL-Visao-Computacional-Spec.md # Especificação pipeline CV
```

---

## 🔧 Tecnologias

- **Frontend:** React 18.2.0
- **Styling:** CSS-in-JS (inline styles)
- **State:** React Hooks (useState)
- **Storage:** localStorage (API keys)
- **APIs Integradas:**
  - Claude Sonnet 4 (Anthropic)
  - Gemini 1.5 Flash (Google)
  - Veo3 (Google - preview)

---

## 💰 Modelo de Custo (BYOK)

**Bring Your Own Key:** Seller usa próprias API keys = zero custo para WL Importados.

| Componente | API | Custo/Unidade |
|-----------|-----|---------------|
| Texto + Prompts | Claude Sonnet 4 | $0.003 |
| 5 Imagens (1024x1024) | Imagen API* | $0.01 |
| Vídeo 15-30s | Veo3* | ~$0.15 |
| **TOTAL** | | **$0.163/anúncio** |

*Implementação em produção requer migração para Imagen API (Gemini Flash só analisa imagens) e aguardar lançamento do Veo3.

---

## ⚠️ Limitações Atuais

### Gemini 1.5 Flash

O endpoint atual (`gemini-1.5-flash:generateContent`) **analisa imagens**, mas **NÃO gera imagens**.

**Solução:** Migrar para **Imagen API** (Google Cloud Vertex AI)

### Veo3

API ainda não é pública. Alternativas:
- Aguardar lançamento oficial
- Usar Runway Gen-2 ($0.75 por 15s)

---

## 🚧 Roadmap de Produção

### Alta Prioridade
- [ ] Migrar para Imagen API
- [ ] Implementar Base44 storage para assets
- [ ] Download em lote (ZIP com 5 imgs + vídeo)
- [ ] Validação real de API keys

### Média Prioridade
- [ ] Retry logic com exponential backoff
- [ ] Progress tracking por imagem (1/5, 2/5...)
- [ ] Caching de prompts/imagens
- [ ] WebSocket para status de vídeo

### Baixa Prioridade
- [ ] Preview carousel de imagens
- [ ] Edição de prompts antes de gerar
- [ ] Gerar variações (2-3 versões por tipo)
- [ ] Seletor de qualidade (Standard/HD/4K)

---

## 📚 Documentação Completa

Veja a pasta `/docs` para:

- **INTEGRACAO-GEMINI-VEO3.md** - Endpoints reais, exemplos de código
- **RESUMO-IMPLEMENTACAO.md** - Guia executivo, testes
- **WL-Visao-Computacional-Spec.md** - Pipeline de computer vision

---

## 🐛 Problemas Conhecidos

1. **Gemini Flash não gera imagens** - precisa migrar para Imagen
2. **Veo3 API não disponível** - implementação simulada
3. **API keys em localStorage** - produção: criptografar no Base44
4. **Sem persistência de anúncios** - precisa salvar na entidade Ad

---

## 📞 Suporte

**Desenvolvedor:** Engenheiro de Prompt Sênior  
**Versão:** 1.0.0 (Prototype)  
**Data:** 2026-04-17

---

## 📝 Licença

Uso privado - WL Importados Center. Todos os direitos reservados.
