# Guia de Deploy - WL Importados Platform

## Opções de Hospedagem

### 1. Vercel (Recomendado - Grátis)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
cd wl-importados-platform
vercel

# Seguir prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? wl-importados-platform
# - Directory? ./
# - Override settings? No

# URL estará disponível em segundos
# Exemplo: https://wl-importados-platform.vercel.app
```

**Vantagens:**
- ✅ Deploy em segundos
- ✅ SSL automático
- ✅ CDN global
- ✅ Atualizações automáticas via Git
- ✅ Preview de branches

---

### 2. Netlify (Alternativa Grátis)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build do projeto
npm run build

# Deploy
netlify deploy

# Seguir prompts:
# - Create new site? Yes
# - Team? Your team
# - Site name? wl-importados
# - Publish directory? build

# Deploy de produção
netlify deploy --prod
```

---

### 3. GitHub Pages (Grátis)

```bash
# 1. Adicionar ao package.json:
"homepage": "https://seu-usuario.github.io/wl-importados-platform"

# 2. Instalar gh-pages
npm install --save-dev gh-pages

# 3. Adicionar scripts ao package.json:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# 4. Deploy
npm run deploy

# 5. Configurar no GitHub:
# Settings → Pages → Source: gh-pages branch
```

---

### 4. Servidor VPS (Digital Ocean, AWS, etc.)

```bash
# Build do projeto
npm run build

# Copiar para servidor
scp -r build/* user@seu-servidor:/var/www/wl-importados

# Configurar Nginx
sudo nano /etc/nginx/sites-available/wl-importados

# Adicionar configuração:
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/wl-importados;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Ativar site
sudo ln -s /etc/nginx/sites-available/wl-importados /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL com Let's Encrypt (opcional)
sudo certbot --nginx -d seu-dominio.com
```

---

## Variáveis de Ambiente (Produção)

### Criar arquivo .env

```bash
# Copiar template
cp .env.example .env

# Editar com suas chaves REAIS
nano .env
```

### Para Vercel/Netlify

```bash
# Vercel
vercel env add REACT_APP_CLAUDE_API_KEY
vercel env add REACT_APP_GEMINI_API_KEY

# Netlify
netlify env:set REACT_APP_CLAUDE_API_KEY "sua-chave-aqui"
netlify env:set REACT_APP_GEMINI_API_KEY "sua-chave-aqui"
```

**⚠️ IMPORTANTE:** Em produção, **NÃO** use variáveis de ambiente para API keys no frontend (elas ficam expostas no código). Use o sistema de API Keys da interface, que armazena as chaves com segurança no Base44.

---

## Checklist de Deploy

### Antes do Deploy

- [ ] Testar localmente (`npm start`)
- [ ] Build sem erros (`npm run build`)
- [ ] Testar build local (`npx serve -s build`)
- [ ] Verificar todas as funcionalidades
- [ ] Remover console.logs e comentários
- [ ] Atualizar README com URL de produção

### Após Deploy

- [ ] Verificar SSL (https://)
- [ ] Testar em diferentes navegadores
- [ ] Testar em mobile
- [ ] Verificar carregamento de assets
- [ ] Testar API integrations
- [ ] Configurar domínio customizado (opcional)

---

## Domínio Customizado

### Vercel

```bash
# 1. Adicionar domínio
vercel domains add seu-dominio.com

# 2. Configurar DNS no seu registrador:
# A record: @ → 76.76.21.21
# CNAME: www → cname.vercel-dns.com

# 3. Verificar
vercel domains verify seu-dominio.com
```

### Netlify

```bash
# 1. Settings → Domain management → Add custom domain
# 2. Seguir instruções de DNS
# 3. SSL automático em poucos minutos
```

---

## Performance Optimization

### 1. Code Splitting

```javascript
// Lazy load components pesados
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. Image Optimization

```bash
# Comprimir imagens antes de adicionar ao projeto
# Usar ferramentas como:
# - TinyPNG (https://tinypng.com)
# - ImageOptim (Mac)
# - Squoosh (https://squoosh.app)
```

### 3. Bundle Analysis

```bash
# Analisar tamanho do bundle
npm install --save-dev webpack-bundle-analyzer

# Adicionar ao package.json:
"analyze": "source-map-explorer 'build/static/js/*.js'"

npm run build
npm run analyze
```

---

## Monitoramento

### Google Analytics (Opcional)

```javascript
// 1. Criar conta: https://analytics.google.com
// 2. Adicionar ao public/index.html antes de </head>:

<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Sentry (Rastreamento de Erros)

```bash
npm install @sentry/react

# Adicionar ao src/index.js:
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://xxxxxx@sentry.io/xxxxxx",
  environment: "production"
});
```

---

## Backup e Versionamento

### Git Setup

```bash
# Inicializar Git
git init
git add .
git commit -m "Initial commit - v1.0.0"

# Conectar ao GitHub
git remote add origin https://github.com/seu-usuario/wl-importados-platform.git
git branch -M main
git push -u origin main
```

### Tags de Versão

```bash
# Criar tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Listar tags
git tag -l
```

---

## Troubleshooting

### Build falha com "out of memory"

```bash
# Aumentar memória do Node
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### Rotas não funcionam após deploy

```bash
# Criar arquivo public/_redirects (Netlify):
/*    /index.html   200

# Ou vercel.json (Vercel):
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Assets não carregam (404)

```bash
# Verificar homepage no package.json
# Para subpasta: "homepage": "/wl-importados"
# Para raiz: "homepage": "."
```

---

## Custos Estimados

### Hospedagem Grátis
- **Vercel:** Grátis (100GB bandwidth/mês)
- **Netlify:** Grátis (100GB bandwidth/mês)
- **GitHub Pages:** Grátis (1GB storage, 100GB bandwidth/mês)

### Hospedagem Paga (se precisar escalar)
- **Vercel Pro:** $20/mês (1TB bandwidth)
- **Netlify Pro:** $19/mês (400GB bandwidth)
- **Digital Ocean:** $5-10/mês (VPS básico)
- **AWS/Azure:** Pay-as-you-go (~$5-50/mês)

### APIs (BYOK - seller paga)
- **Claude:** $0.003/anúncio
- **Gemini/Imagen:** $0.01/anúncio
- **Veo3:** ~$0.15/anúncio
- **Total:** ~$0.163/anúncio

---

## Recomendação Final

**Para começar:** Vercel (grátis, simples, rápido)  
**Para produção:** Vercel Pro ou servidor VPS dedicado  
**Para escala:** AWS/Azure com CDN

---

**Guia de Deploy v1.0**  
**Última atualização:** 2026-04-17
