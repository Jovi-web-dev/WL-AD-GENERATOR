# Interface do Usuário - WL Importados Platform

## Layout Principal

```
┌─────────────────────────────────────────────────────────────────┐
│  WL IMPORTADOS     Anúncio | Título | Keywords | ... | 🎨 | 🔑  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📝 Anúncio Completo                                             │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Nome do Produto *                                        │    │
│  │ Smartwatch Fitness Tracker                               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Detalhes Adicionais                                      │    │
│  │ À prova d'água, monitor cardíaco, 7 dias bateria...      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Categoria: [Eletrônicos ▼]  Marketplace: [☑ ML] [☑ Shopee]    │
│  Tom: [● Profissional]  [○ Casual]  [○ Persuasivo]             │
│                                                                   │
│  📤 Upload de Imagens (até 5)                                    │
│  [+] Adicionar Fotos                                             │
│  ┌───┐ ┌───┐                                                    │
│  │img│ │img│  [×]                                                │
│  └───┘ └───┘                                                    │
│                                                                   │
│            [Gerar Anúncio Completo com IA]                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Resultado da Geração

```
┌─────────────────────────────────────────────────────────────────┐
│  ● Anúncio gerado com sucesso                                   │
│  Revise, edite e publique diretamente                            │
│                                                                   │
│  [Título] [Keywords] [Descrição] [Foto1] [Foto2] ... [Vídeo]   │
│  ────────────────────────────────────────────────────────────   │
│                                                                   │
│  Título Otimizado SEO                            [◫ Copiar]     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Smartwatch Fitness | Monitor Cardíaco | À Prova D'água  │    │
│  │ | 7 Dias Bateria                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│  ● 60 caracteres                                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## API Keys Configuration

```
┌─────────────────────────────────────────────────────────────────┐
│  🔑 API Keys                                                     │
│                                                                   │
│  Gerencie suas chaves de API para os serviços de IA             │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Anthropic (Claude)                                       │    │
│  │ [sk-ant-api03-XXXXXXXXXXXX]               [👁]  ● Conec │    │
│  │ Obter chave: https://console.anthropic.com               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Google Gemini (Nano Banana)                              │    │
│  │ [●●●●●●●●●●●●●●●●●●●●]                  [🙈]  ● Conec │    │
│  │ Obter chave: https://aistudio.google.com                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Google Veo3                                              │    │
│  │ [                                    ]      [👁]  ◌ Não  │    │
│  │ Solicitar acesso ao preview                              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│      [Limpar Tudo]                      [Salvar Chaves]         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Temas Disponíveis

### 1. Padrão WL (Azul/Roxo)
```
Background: #f8f9fa
Primary: #6366f1 (Indigo)
Accent: #8b5cf6 (Purple)
Text: #1f2937
```

### 2. Branco (Minimalista)
```
Background: #ffffff
Primary: #3b82f6 (Blue)
Accent: #10b981 (Green)
Text: #111827
```

### 3. Black (Escuro)
```
Background: #0f0f0f
Primary: #818cf8 (Light Indigo)
Accent: #a78bfa (Light Purple)
Text: #f9fafb
```

### 4. Acessível (Alto Contraste)
```
Background: #ffffff
Primary: #1e40af (Dark Blue)
Accent: #047857 (Dark Green)
Text: #000000
Font Size: 16px (vs 14px default)
```

## Geração de Assets Visuais

```
┌─────────────────────────────────────────────────────────────────┐
│  📸 Geração de Imagens e Vídeo                                  │
│                                                                   │
│  ℹ Gemini gerará 5 imagens + Veo3 gerará 1 vídeo               │
│                                                                   │
│                    [✦ Gerar Agora]                               │
│                                                                   │
│  ─────────────────────────────────────────────────────────────  │
│                                                                   │
│  📸 Imagens Geradas (1024x1024)                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │ Img 1  │ │ Img 2  │ │ Img 3  │ │ Img 4  │ │ Img 5  │        │
│  │Estúdio │ │Conver  │ │c/ Desc │ │Detalh  │ │Context │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                   │
│  🎬 Vídeo Gerado (15-30s)                                       │
│  ┌──────────────────────────────────────────┐                   │
│  │                                            │                   │
│  │        Vídeo Cinematográfico               │                   │
│  │        Gerado com Veo3 - 15s               │                   │
│  │                                            │                   │
│  └──────────────────────────────────────────┘                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Estados de Erro/Aviso

### Geração Parcial
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠ Geração Parcial                                              │
│  • Texto não gerado: API Claude não configurada                 │
│  Configure as APIs ausentes em "API Keys" para conteúdo         │
│  completo.                                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Conteúdo Não Gerado
```
┌─────────────────────────────────────────────────────────────────┐
│                          ✕                                       │
│                   Título não gerado                              │
│            Configure a API Claude para gerar títulos             │
└─────────────────────────────────────────────────────────────────┘
```

### API Não Configurada
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠ Nenhuma API configurada. Configure ao menos uma API em       │
│  "API Keys" para gerar conteúdo.                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Responsividade

### Desktop (> 1024px)
- Layout em 2 colunas onde aplicável
- Tabs horizontais
- Upload de imagens em grid 2-3 colunas

### Tablet (768px - 1024px)
- Layout single column
- Tabs ainda horizontais com scroll
- Upload grid 2 colunas

### Mobile (< 768px)
- Stack vertical completo
- Tabs com scroll horizontal
- Upload 1 coluna
- Botões full width

---

**Documentação Visual v1.0**  
**Última atualização:** 2026-04-17
