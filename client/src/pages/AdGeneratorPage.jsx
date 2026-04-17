import { useState } from "react";
import { Button, InputField, SelectField } from "../components/ui";
import { CATEGORIES, MARKETPLACES } from "../config/app";
import { apiGenerateAd, apiGenerateMedia } from "../lib/api";

export function AnuncioCompletoPage({ t }) {
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("profissional");
  const [selectedMPs, setSelectedMPs] = useState(["ml"]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("titulo");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [generatingMedia, setGeneratingMedia] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generatedVideo, setGeneratedVideo] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(f => 
      ['image/jpeg', 'image/jpg', 'image/png'].includes(f.type)
    ).slice(0, 5 - uploadedImages.length);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, {
          file,
          preview: event.target.result,
          name: file.name,
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerateMedia = async () => {
    if (!result) return;
    setGeneratingMedia(true);
    setError(null);

    try {
      const media = await apiGenerateMedia({
        generationId: result.id,
        productName,
        result,
        referenceImage: uploadedImages[0]?.preview || null
      });
      setGeneratedImages(media.images || []);
      setGeneratedVideo(media.video || null);
      if (media.warnings?.length) setError(media.warnings.join(" • "));
    } catch (err) {
      setError(err.message || "Erro ao gerar assets visuais.");
    } finally {
      setGeneratingMedia(false);
    }
  };

  const handleGenerate = async () => {
    if (!productName.trim()) {
      setError("Informe o nome do produto para gerar o anúncio.");
      return;
    }

    setGenerating(true);
    setProgress(0);
    setError(null);

    let prog = 0;
    const progInterval = setInterval(() => {
      prog = Math.min(prog + Math.random() * 8 + 2, 92);
      setProgress(Math.round(prog));
    }, 500);

    try {
      const generatedResult = await apiGenerateAd({
        productName,
        productDetails,
        category,
        tone,
        marketplaces: selectedMPs,
        imageCount: uploadedImages.length
      });

      clearInterval(progInterval);
      setProgress(100);
      setResult(generatedResult);
      setTimeout(() => {
        setGenerating(false);
        setGenerated(true);
      }, 400);
    } catch (err) {
      clearInterval(progInterval);
      setGenerating(false);
      setProgress(0);
      setError(err.message || "Erro ao gerar conteúdo. Tente novamente.");
    }
  };

  const tabs = [
    { id: "titulo", icon: "≡", label: "Título" },
    { id: "keywords", icon: "⊞", label: "Keywords" },
    { id: "descricao", icon: "¶", label: "Descrição" },
    { id: "foto1", icon: "①", label: "Foto 1: Estúdio" },
    { id: "foto2", icon: "②", label: "Foto 2: Conversão" },
    { id: "foto3", icon: "③", label: "Foto 3: c/ Descrição" },
    { id: "foto4", icon: "④", label: "Foto 4: Detalhes" },
    { id: "foto5", icon: "⑤", label: "Foto 5: Contexto" },
    { id: "video", icon: "▶", label: "Prompt Vídeo" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: 0 }}>Anúncio Completo</h1>
        <span style={{
          background: t.gradient, color: t.textInverse,
          padding: "3px 10px", borderRadius: 5, fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
        }}>PRO</span>
      </div>
      <p style={{ color: t.textTertiary, fontSize: 14, marginBottom: 28, marginTop: 6 }}>
        A IA gera tudo de uma vez: título, palavras-chave, descrição, prompts de fotos e vídeo.
      </p>

      {!generated ? (
        <div style={{ background: t.bgCard, borderRadius: t.radiusLg, border: `1px solid ${t.border}`, padding: "28px 32px" }}>
          <InputField label="Nome do produto" icon="◈" required placeholder="Ex: Fone de Ouvido Bluetooth TWS Premium" value={productName} onChange={e => setProductName(e.target.value)} t={t} />
          <InputField label="Detalhes técnicos" icon="≡" placeholder="Ex: Bluetooth 5.3, ANC, bateria 48h, IPX5, driver 13mm..." value={productDetails} onChange={e => setProductDetails(e.target.value)} t={t} rows={3} />

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <SelectField label="Categoria" icon="▤" options={CATEGORIES} value={category} onChange={e => setCategory(e.target.value)} placeholder="Selecione..." t={t} />
            <SelectField label="Tom do anúncio" icon="✦" options={[
              { value: "profissional", label: "Profissional" },
              { value: "persuasivo", label: "Persuasivo" },
              { value: "tecnico", label: "Técnico" },
              { value: "casual", label: "Casual" },
              { value: "premium", label: "Luxo / Premium" },
            ]} value={tone} onChange={e => setTone(e.target.value)} t={t} />
          </div>

          {/* Marketplace selection */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 10 }}>
              <span style={{ color: t.accent }}>→</span> Marketplace(s) destino
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MARKETPLACES.map(mp => {
                const sel = selectedMPs.includes(mp.id);
                return (
                  <button key={mp.id} onClick={() => setSelectedMPs(p => sel ? p.filter(x => x !== mp.id) : [...p, mp.id])} style={{
                    padding: "10px 18px", borderRadius: t.radius,
                    border: `1.5px solid ${sel ? t.accent : t.border}`,
                    background: sel ? t.accentMuted : "transparent",
                    color: sel ? t.accent : t.textSecondary,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                    fontSize: 13, fontWeight: sel ? 600 : 400,
                    transition: "all 0.2s", fontFamily: "inherit",
                  }}>
                    <span style={{
                      width: 24, height: 18, borderRadius: 3, fontSize: 9, fontWeight: 800,
                      background: sel ? t.accent : t.border,
                      color: sel ? t.textInverse : t.textTertiary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{mp.symbol}</span>
                    {mp.name}
                    {sel && <span style={{ fontSize: 14 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image upload section */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 6 }}>
              <span style={{ color: t.accent }}>◲</span> Imagens de referência (opcional)
            </label>
            <p style={{ fontSize: 12, color: t.textTertiary, margin: "0 0 12px", lineHeight: 1.5 }}>
              Envie até 5 fotos do produto. A IA analisará e gerará 5 imagens profissionais otimizadas para conversão.
            </p>
            
            {uploadedImages.length < 5 && (
              <label style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "16px", borderRadius: t.radius,
                border: `2px dashed ${t.border}`,
                background: t.bgInput, cursor: "pointer",
                transition: "all 0.2s",
                fontSize: 13, fontWeight: 500, color: t.textSecondary,
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
              >
                <span style={{ fontSize: 18 }}>⬆</span>
                Selecionar imagens ({uploadedImages.length}/5)
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            )}

            {uploadedImages.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10, marginTop: 12 }}>
                {uploadedImages.map((img, i) => (
                  <div key={i} style={{
                    position: "relative", borderRadius: t.radius, overflow: "hidden",
                    border: `1px solid ${t.border}`, background: t.bgCard,
                  }}>
                    <img src={img.preview} alt={img.name} style={{
                      width: "100%", height: 110, objectFit: "cover", display: "block",
                    }} />
                    <button onClick={() => removeImage(i)} style={{
                      position: "absolute", top: 4, right: 4,
                      width: 24, height: 24, borderRadius: "50%",
                      border: "none", background: "rgba(0,0,0,0.7)",
                      color: "#fff", fontSize: 14, fontWeight: 700,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(200,0,0,0.9)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.7)"}
                    >×</button>
                    <div style={{
                      padding: "4px 6px", fontSize: 10, color: t.textTertiary,
                      background: t.bgPanel, borderTop: `1px solid ${t.border}`,
                      textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",
                    }}>{img.name}</div>
                  </div>
                ))}
              </div>
            )}

            {uploadedImages.length > 0 && (
              <div style={{
                marginTop: 12, padding: "10px 14px", borderRadius: t.radiusSm,
                background: t.bgInput, border: `1px solid ${t.accentBorder}`,
                fontSize: 11, color: t.textTertiary, lineHeight: 1.5,
              }}>
                <strong style={{ color: t.accent, fontWeight: 600 }}>Imagens que serão geradas:</strong><br/>
                ① Foto profissional de estúdio • ② Alta conversão • ③ Com descrição integrada • ④ Grande + detalhes • ⑤ Ambientada em contexto
              </div>
            )}
          </div>

          <div style={{
            padding: "10px 14px", borderRadius: t.radius,
            background: t.infoBg, border: `1px solid ${t.accentBorder}`,
            fontSize: 12, color: t.info, marginBottom: 20,
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
          }}>
            <span style={{ fontWeight: 600 }}>APIs seguras:</span>
            <span>As chamadas agora passam pelo back-end. Sem chaves expostas no navegador.</span>
          </div>

          {/* Usage indicator */}
          <div style={{
            padding: "12px 16px", borderRadius: t.radius,
            background: t.successBg, border: `1px solid ${t.successBorder}`,
            fontSize: 13, color: t.success, fontWeight: 500, marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>●</span> 8/10 gerações restantes hoje — Plano Premium Pro
          </div>

          {/* Error display */}
          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: t.radius,
              background: t.errorBg, border: `1px solid ${t.errorBorder}`,
              fontSize: 13, color: t.error, fontWeight: 500, marginBottom: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>✕</span> {error}
            </div>
          )}

          {/* Generate button */}
          <button onClick={handleGenerate} disabled={generating || !productName} style={{
            width: "100%", padding: "16px", borderRadius: t.radius,
            border: "none", fontFamily: "inherit",
            background: generating || !productName ? t.bgInput : t.gradient,
            color: !productName ? t.textTertiary : t.textInverse,
            fontSize: 15, fontWeight: 700, cursor: generating || !productName ? "not-allowed" : "pointer",
            boxShadow: !productName || generating ? "none" : t.shadowAccent,
            transition: "all 0.3s", position: "relative", overflow: "hidden",
            letterSpacing: 0.3,
          }}>
            {generating && (
              <div style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                width: `${progress}%`, background: t.gradient,
                transition: "width 0.35s ease", opacity: 0.25,
              }} />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>
              {generating ? `Gerando anúncio... ${progress}%` : "✦  Gerar Anúncio Completo com IA"}
            </span>
          </button>
        </div>
      ) : (
        <div>
          {/* Warnings banner */}
          {result?.warnings && result.warnings.length > 0 && (
            <div style={{
              padding: "14px 18px", borderRadius: t.radius,
              background: t.errorBg, border: `1px solid ${t.errorBorder}`,
              marginBottom: 20, display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.error }}>⚠ Geração Parcial</div>
              {result.warnings.map((warning, i) => (
                <div key={i} style={{ fontSize: 12, color: t.error }}>• {warning}</div>
              ))}
              <div style={{ fontSize: 11, color: t.error, marginTop: 4, fontStyle: "italic" }}>
                Configure as APIs ausentes em "API Keys" para gerar conteúdo completo.
              </div>
            </div>
          )}

          {/* Success banner */}
          <div style={{
            padding: "14px 20px", borderRadius: t.radius,
            background: result?.warnings && result.warnings.length > 0 ? t.infoBg : t.successBg, 
            border: `1px solid ${result?.warnings && result.warnings.length > 0 ? t.accentBorder : t.successBorder}`,
            marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 20 }}>{result?.warnings && result.warnings.length > 0 ? '◐' : '●'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: result?.warnings && result.warnings.length > 0 ? t.info : t.success, fontSize: 14 }}>
                {result?.warnings && result.warnings.length > 0 ? 'Conteúdo gerado parcialmente' : 'Anúncio gerado com sucesso'}
              </div>
              <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>
                {result?.warnings && result.warnings.length > 0 
                  ? 'Algumas partes não puderam ser geradas. Configure as APIs ausentes para conteúdo completo.'
                  : 'Revise, edite e publique diretamente'
                }
              </div>
            </div>
            <Button variant="secondary" t={t} onClick={() => { setGenerated(false); setResult(null); setProductName(""); setProductDetails(""); setError(null); setUploadedImages([]); }}
              style={{ padding: "6px 14px", fontSize: 12 }}>Novo Anúncio</Button>
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: 2, marginBottom: 20, padding: 3,
            background: t.bgCard, borderRadius: t.radius, border: `1px solid ${t.border}`,
            overflowX: "auto",
          }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: "11px 14px", borderRadius: t.radiusSm,
                border: "none",
                background: activeTab === tab.id ? t.accent : "transparent",
                color: activeTab === tab.id ? t.textInverse : t.textSecondary,
                fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 450,
                cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, whiteSpace: "nowrap", fontFamily: "inherit",
              }}>{tab.icon} {tab.label}</button>
            ))}
          </div>

          {/* Result */}
          <div style={{ background: t.bgCard, borderRadius: t.radiusLg, border: `1px solid ${t.border}`, padding: 28 }}>
            {activeTab === "titulo" && (
              <div>
                {result?.titulo ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Título Otimizado SEO</h3>
                      <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.titulo)} style={{ padding: "6px 14px", fontSize: 12 }}>◫ Copiar</Button>
                    </div>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.border}`, color: t.text, fontSize: 15, lineHeight: 1.6 }}>{result.titulo}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: t.textTertiary }}>● {result.titulo?.length || 0} caracteres</div>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Título não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>API Claude não configurada</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "keywords" && (
              <div>
                {result?.keywords && result.keywords.length > 0 ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Palavras-chave ({result.keywords?.length || 0})</h3>
                      <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText((result.keywords || []).join(", "))} style={{ padding: "6px 14px", fontSize: 12 }}>◫ Copiar</Button>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(result.keywords || []).map((kw, i) => (
                        <span key={i} style={{
                          padding: "8px 14px", borderRadius: 20,
                          background: t.bgInput, border: `1px solid ${t.border}`,
                          color: t.text, fontSize: 13, fontWeight: 500,
                        }}>{kw}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Keywords não geradas</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>API Claude não configurada</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "descricao" && (
              <div>
                {result?.descricao ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Descrição Completa</h3>
                      <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.descricao)} style={{ padding: "6px 14px", fontSize: 12 }}>◫ Copiar</Button>
                    </div>
                    <div style={{ padding: "18px 20px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.border}`, color: t.text, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{result.descricao}</div>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Descrição não gerada</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>API Claude não configurada</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto1" && (
              <div>
                {result?.promptFoto1 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>① Foto Profissional de Estúdio</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Fundo branco, iluminação de estúdio, produto centralizado — ideal para primeira imagem do anúncio</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto1}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto1)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto2" && (
              <div>
                {result?.promptFoto2 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>② Foto de Alta Conversão</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Ângulo que destaca benefícios, composição que evoca desejo de compra</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto2}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto2)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto3" && (
              <div>
                {result?.promptFoto3 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>③ Foto com Descrição Integrada</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Produto + overlay de texto com specs principais, infográfico limpo</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto3}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto3)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto4" && (
              <div>
                {result?.promptFoto4 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>④ Foto Grande + Detalhes</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Imagem principal grande (70%) com close-ups de texturas e acabamentos embaixo</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto4}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto4)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "foto5" && (
              <div>
                {result?.promptFoto5 ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>⑤ Foto Ambientada em Contexto</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Produto em uso real, lifestyle shot, ambiente autêntico, iluminação natural</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptFoto5}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptFoto5)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de imagens</div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "video" && (
              <div>
                {result?.promptVideo ? (
                  <>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text }}>Prompt para Vídeo Cinematográfico</h3>
                    <p style={{ color: t.textTertiary, fontSize: 12, marginBottom: 14 }}>Use com Veo3 (Google) para gerar vídeos do produto</p>
                    <div style={{ padding: "16px 18px", background: t.bgInput, borderRadius: t.radius, border: `1px solid ${t.accentBorder}`, color: t.accent, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{result.promptVideo}</div>
                    <Button variant="ghost" t={t} onClick={() => navigator.clipboard.writeText(result.promptVideo)} style={{ marginTop: 12, padding: "8px 16px", fontSize: 12 }}>◫ Copiar prompt</Button>
                  </>
                ) : (
                  <div style={{ padding: "32px", textAlign: "center", background: t.bgInput, borderRadius: t.radius, border: `1px dashed ${t.border}` }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>✕</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6 }}>Prompt não gerado</div>
                    <div style={{ fontSize: 12, color: t.textTertiary }}>Configure a API Claude para gerar prompts de vídeo</div>
                  </div>
                )}
              </div>
            )}

            {/* Auto-generate media section */}
            <div style={{
              marginTop: 24, paddingTop: 20, borderTop: `2px solid ${t.border}`,
              background: t.bgCard, borderRadius: t.radiusLg,
              border: `1px solid ${t.accentBorder}`, padding: "20px 24px",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.text }}>Gerar Assets Visuais Automaticamente</h3>
                  <p style={{ color: t.textTertiary, fontSize: 12, marginTop: 4 }}>
                    O back-end prepara os assets visuais e salva o histórico. Integrações reais com imagem/vídeo ficam isoladas no servidor.
                  </p>
                </div>
                <Button
                  variant="primary"
                  t={t}
                  onClick={handleGenerateMedia}
                  disabled={generatingMedia || !result}
                  style={{ padding: "10px 20px", fontSize: 13, whiteSpace: "nowrap" }}
                >
                  {generatingMedia ? "⏳ Gerando..." : "✦ Gerar Agora"}
                </Button>
              </div>

              {(generatedImages.length > 0 || generatedVideo) && (
                <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${t.borderSubtle}` }}>
                  {generatedImages.length > 0 && (
                    <div style={{ marginBottom: 20 }}>
                      <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: t.text }}>📸 Imagens Geradas (1024x1024)</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                        {generatedImages.map(img => (
                          <div key={img.id} style={{
                            border: `1px solid ${t.border}`, borderRadius: t.radius,
                            overflow: "hidden", background: t.bgCard,
                          }}>
                            <img src={img.url} alt={`Foto ${img.id}`} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                            <div style={{ padding: "8px 10px", fontSize: 11, fontWeight: 600, color: t.text, background: t.bgInput, borderTop: `1px solid ${t.border}` }}>
                              {img.id}. {img.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {generatedVideo && (
                    <div>
                      <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: t.text }}>🎬 Vídeo Gerado (1080p, {generatedVideo.duration})</h4>
                      <div style={{
                        border: `1px solid ${t.border}`, borderRadius: t.radius,
                        overflow: "hidden", background: "#000", maxWidth: 400,
                      }}>
                        <img src={generatedVideo.url} alt="Video preview" style={{ width: "100%", height: "auto", display: "block" }} />
                        <div style={{ padding: "10px 12px", fontSize: 12, color: t.text, background: t.bgInput, borderTop: `1px solid ${t.border}` }}>
                          Duração: {generatedVideo.duration} • Formato: MP4 • Resolução: 1920x1080
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24, paddingTop: 18, borderTop: `1px solid ${t.border}`, flexWrap: "wrap" }}>
              <Button variant="primary" t={t} style={{ flex: 1, minWidth: 180 }}>→  Publicar no Marketplace</Button>
              <Button variant="secondary" t={t}>◫ Salvar Rascunho</Button>
              <Button variant="secondary" t={t}>↓ Exportar PDF</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
