const getToken = () => localStorage.getItem("wl_auth_token");

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(path, { ...options, headers });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Falha na comunicação com o servidor.");
  }

  return payload;
}

export async function apiRegister(data) {
  return request("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
}

export async function apiLogin(data) {
  return request("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
}

export async function apiMe() {
  return request("/api/auth/me");
}

export async function apiGetGenerations() {
  return request("/api/generations");
}

export async function apiGenerateAd(data) {
  return request("/api/generations", { method: "POST", body: JSON.stringify(data) });
}

export async function apiGenerateMedia(data) {
  return request("/api/generations/media", { method: "POST", body: JSON.stringify(data) });
}

export async function apiGetProviderStatus() {
  return request("/api/ai/providers");
}

export async function apiGetAdminOverview() {
  return request("/api/admin/overview");
}

export function saveAuth(token, user) {
  localStorage.setItem("wl_auth_token", token);
  localStorage.setItem("wl_auth_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("wl_auth_token");
  localStorage.removeItem("wl_auth_user");
}

export function readCachedUser() {
  const raw = localStorage.getItem("wl_auth_user");
  return raw ? JSON.parse(raw) : null;
}
