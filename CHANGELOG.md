# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

---

## [1.0.0] - 2026-04-17

### ✨ Adicionado

#### Sistema Modular de Geração
- Sistema funciona com qualquer combinação de APIs (Claude, Gemini, Veo3)
- Fallback automático quando APIs não estão configuradas
- Warnings contextuais mostrando o que não foi gerado

#### Integração Claude (Anthropic)
- Geração de títulos SEO otimizados (60 chars para ML)
- 12 keywords relevantes por produto
- Descrições formatadas com emojis e garantia WL
- 5 prompts ultra-detalhados para imagens
- 1 prompt cinematográfico para vídeo

#### Integração Gemini Vision (Google)
- Endpoint real implementado: `gemini-1.5-flash:generateContent`
- Processamento paralelo de 5 prompts de imagem
- Uso de imagem de referência do upload
- Error handling individual por imagem
- Prompts básicos automáticos quando Claude não configurado

#### Integração Veo3 (Google)
- Estrutura preparada para API quando lançar
- Simulação de geração de vídeo (2s delay)
- Duração adaptativa (15s ou 30s)
- Placeholder para video URL

#### Interface do Usuário
- 4 temas completos (Padrão WL, Branco, Black, Acessível)
- 9 tabs de navegação (Anúncio Completo + 8 seções individuais)
- Upload de até 5 imagens (JPEG/PNG)
- Preview de imagens com botão remover
- Progress bar durante geração
- Estados vazios para conteúdo não gerado

#### Gerenciamento de API Keys
- CRUD completo (Create, Read, Update, Delete)
- Validação de formato de chaves
- Status visual (● Conectado / ✕ Inválido / ◌ Não configurado)
- Campos de senha com toggle show/hide (👁/🙈)
- Links diretos para obter chaves de cada provedor
- Persistência em localStorage

#### Documentação
- README.md completo com instruções
- INICIO-RAPIDO.md para setup rápido
- INTEGRACAO-GEMINI-VEO3.md com detalhes técnicos
- RESUMO-IMPLEMENTACAO.md com guia executivo
- CHANGELOG.md (este arquivo)

### 🔧 Detalhes Técnicos

- **Frontend:** React 18.2.0
- **Styling:** CSS-in-JS (inline styles)
- **State Management:** React Hooks (useState)
- **Storage:** localStorage
- **APIs:** Claude Sonnet 4, Gemini 1.5 Flash, Veo3 (simulado)

### ⚠️ Limitações Conhecidas

- Gemini 1.5 Flash analisa imagens mas não gera (precisa migrar para Imagen API)
- Veo3 API ainda não pública (implementação simulada)
- API keys em localStorage (produção: criptografar no Base44)
- Sem persistência de anúncios gerados (precisa integrar Base44 Ad entity)

### 📋 Próximos Passos

#### Alta Prioridade
- [ ] Migrar de Gemini Flash para Imagen API
- [ ] Implementar Base44 storage para assets
- [ ] Download em lote (ZIP com 5 imgs + vídeo)
- [ ] Validação real de API keys ao salvar

#### Média Prioridade
- [ ] Retry logic com exponential backoff
- [ ] Progress tracking por imagem (1/5, 2/5...)
- [ ] Caching de prompts/imagens geradas
- [ ] WebSocket para status de vídeo assíncrono

#### Baixa Prioridade
- [ ] Preview carousel de imagens geradas
- [ ] Edição de prompts antes de gerar
- [ ] Gerar variações (2-3 versões por tipo)
- [ ] Seletor de qualidade (Standard/HD/4K)

---

## Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/):
- **MAJOR:** Mudanças incompatíveis na API
- **MINOR:** Funcionalidades adicionadas de forma retrocompatível
- **PATCH:** Correções de bugs retrocompatíveis

---

**Mantido por:** WL Importados Center  
**Última atualização:** 2026-04-17
