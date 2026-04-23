import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ThemeSwitcher, Button } from "./components/ui";
import { THEMES } from "./theme/themes";
import { DashboardPage } from "./pages/DashboardPage";
import { AnuncioCompletoPage } from "./pages/AdGeneratorPage";
import { ApiKeysPage } from "./pages/ApiKeysPage";
import { ConfigPage } from "./pages/ConfigPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { HistoryPage } from "./pages/HistoryPage";
import { PlansPage } from "./pages/PlansPage";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { apiMe, clearAuth, readCachedUser } from "./lib/api";

export default function AdGeneratorApp() {
  const [theme, setTheme] = useState("wl");
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(readCachedUser());
  const [checkingAuth, setCheckingAuth] = useState(Boolean(localStorage.getItem("wl_auth_token")));

  const t = THEMES[theme];

  useEffect(() => {
    if (!localStorage.getItem("wl_auth_token")) return;
    apiMe()
      .then(data => setUser(data.user))
      .catch(() => {
        clearAuth();
        setUser(null);
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
    setPage("dashboard");
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage t={t} onNav={setPage} />;
      case "anuncio": return <AnuncioCompletoPage t={t} user={user} />;
      case "historico": return <HistoryPage t={t} />;
      case "planos": return <PlansPage t={t} user={user} />;
      case "admin": return <AdminPage t={t} />;
      case "apikeys": return <ApiKeysPage t={t} />;
      case "config": return <ConfigPage theme={theme} onThemeChange={setTheme} t={t} />;
      case "keywords": return <PlaceholderPage title="Palavras-chave" icon="⊞" desc="Pesquise keywords relevantes para cada marketplace" t={t} />;
      case "titulo": return <PlaceholderPage title="Gerador de Títulos" icon="≡" desc="Gere variações otimizadas de títulos com IA" t={t} />;
      case "descricao": return <PlaceholderPage title="Gerador de Descrições" icon="¶" desc="Crie descrições persuasivas para seus produtos" t={t} />;
      case "fotos": return <PlaceholderPage title="Fotos com IA" icon="◲" desc="Gere fotos profissionais com integrações de imagem no back-end" t={t} />;
      case "videos": return <PlaceholderPage title="Vídeos com IA" icon="▶" desc="Gere vídeos cinematográficos com provedores assíncronos no back-end" t={t} />;
      case "pedidos": return <PlaceholderPage title="Gestão de Pedidos" icon="◈" desc="Centralize pedidos de todos os marketplaces" t={t} />;
      case "estoque": return <PlaceholderPage title="Controle de Estoque" icon="▤" desc="Gerencie estoque com alertas inteligentes" t={t} />;
      case "logistica": return <PlaceholderPage title="Logística" icon="→" desc="Otimize envios e rastreie entregas" t={t} />;
      case "relatorios": return <PlaceholderPage title="Relatórios" icon="◧" desc="Analytics detalhados do seu desempenho" t={t} />;
      default: return <DashboardPage t={t} onNav={setPage} />;
    }
  };

  if (checkingAuth) {
    return <div style={{ minHeight: "100vh", background: t.bg, color: t.text, display: "flex", alignItems: "center", justifyContent: "center" }}>Carregando sessão...</div>;
  }

  if (!user) return <LoginPage t={t} onAuth={setUser} />;

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: t.bg, color: t.text,
      fontFamily: "'DM Sans', 'Manrope', system-ui, sans-serif",
      transition: "background 0.4s, color 0.3s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; }
        body { font-family: 'DM Sans', system-ui, sans-serif !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        select option { background: ${t.bgCard}; color: ${t.text}; }
      `}</style>

      <Sidebar active={page} onNav={setPage} collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} t={t} user={user} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", maxHeight: "100vh", overflow: "hidden" }}>
        <header style={{
          padding: "14px 32px",
          borderBottom: `1px solid ${t.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: t.bgPanel, flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              padding: "5px 12px", borderRadius: t.radiusSm,
              background: t.successBg, border: `1px solid ${t.successBorder}`,
              fontSize: 12, color: t.success, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>●</span> Conectado: {user.name}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeSwitcher current={theme} onChange={setTheme} t={t} />
            <Button variant="secondary" t={t} onClick={() => setPage("config")} style={{ padding: "7px 14px", fontSize: 12 }}>⚙</Button>
            <Button variant="ghost" t={t} onClick={logout} style={{ padding: "7px 14px", fontSize: 12 }}>Sair</Button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }} key={page}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
