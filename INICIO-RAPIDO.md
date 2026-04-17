# 🚀 INÍCIO RÁPIDO

## Instalação em 3 Passos

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm start

# 3. Abrir no navegador
# Automático: http://localhost:3000
```

---

## ⚡ Primeiros Passos

### 1. Configure suas API Keys

Vá em **"API Keys"** e adicione:

- **Claude:** https://console.anthropic.com/
- **Gemini:** https://aistudio.google.com/app/apikey
- **Veo3:** (opcional - API ainda não pública)

### 2. Teste o Gerador

1. Clique em **"Anúncio Completo"**
2. Digite: **"Smartwatch Fitness"**
3. Clique **"Gerar Anúncio"**
4. Veja o resultado em tempo real!

---

## 📦 Build para Produção

```bash
# Criar build otimizado
npm run build

# Arquivos gerados em /build
# Pronto para deploy em qualquer servidor
```

---

## 🎨 Personalização

### Trocar Tema
Clique no ícone de paleta (🎨) no canto superior direito:
- Padrão WL
- Branco
- Black
- Acessível

### Adicionar Novos Marketplaces
Edite `src/App.jsx` linha ~99:
```javascript
const MARKETPLACES = [
  { id: "ml", name: "Mercado Livre" },
  { id: "shopee", name: "Shopee" },
  // Adicione aqui:
  { id: "amazon", name: "Amazon" },
];
```

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 já em uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [NUMBER] /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### API Keys não salvam
- Verifique o console do navegador (F12)
- localStorage deve estar habilitado
- Não use modo anônimo/privado

---

## 📞 Suporte

Problemas? Consulte:
- `/docs/INTEGRACAO-GEMINI-VEO3.md` - Documentação técnica
- `/docs/RESUMO-IMPLEMENTACAO.md` - Guia completo
- `README.md` - Documentação principal

---

**Desenvolvido por:** Engenheiro de Prompt Sênior  
**Versão:** 1.0.0  
**Data:** 2026-04-17
