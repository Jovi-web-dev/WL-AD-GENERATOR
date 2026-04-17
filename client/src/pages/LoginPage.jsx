import { useState } from "react";
import { apiLogin, apiRegister, saveAuth } from "../lib/api";
import { Button, InputField } from "../components/ui";

export function LoginPage({ t, onAuth }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("Wellington");
  const [email, setEmail] = useState("admin@wlimportados.local");
  const [password, setPassword] = useState("wlimportados123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = mode === "register"
        ? await apiRegister({ name, email, password })
        : await apiLogin({ email, password });
      saveAuth(payload.token, payload.user);
      onAuth(payload.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, color: t.text, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 460, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: t.radiusLg, padding: "32px 34px", boxShadow: t.shadowLg }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: t.radius, background: t.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: t.textInverse }}>WL</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>WL Importados Center</div>
            <div style={{ fontSize: 12, color: t.textTertiary, letterSpacing: 1.8 }}>PLATAFORMA FULL-STACK</div>
          </div>
        </div>

        <h1 style={{ fontSize: 24, margin: "0 0 6px", fontWeight: 800 }}>{mode === "register" ? "Criar acesso" : "Entrar"}</h1>
        <p style={{ color: t.textTertiary, fontSize: 13, marginBottom: 24 }}>Autenticação agora passa pelo back-end e pelo banco de dados.</p>

        {mode === "register" && <InputField label="Nome" icon="◈" value={name} onChange={e => setName(e.target.value)} t={t} />}
        <InputField label="E-mail" icon="@" value={email} onChange={e => setEmail(e.target.value)} t={t} />
        <InputField label="Senha" icon="⚿" type="password" value={password} onChange={e => setPassword(e.target.value)} t={t} />

        {error && <div style={{ padding: 12, background: t.errorBg, border: `1px solid ${t.errorBorder}`, color: t.error, borderRadius: t.radius, fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <Button fullWidth t={t} disabled={loading || !email || !password} onClick={submit}>{loading ? "Processando..." : mode === "register" ? "Criar conta" : "Entrar"}</Button>

        <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ width: "100%", marginTop: 16, background: "transparent", border: "none", color: t.accent, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
          {mode === "login" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
        </button>
      </div>
    </div>
  );
}
