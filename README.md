# Landing — Captura de Leads (Aparelho Dental)

Formulário dinâmico estilo *inlead*, mobile-first, 100% estático (só `index.html`).
Fluxo: **Boas-vindas → Nome → WhatsApp/Número → Sucesso → botão p/ WhatsApp**.
Os leads caem numa planilha do Google Sheets via Google Apps Script.

## 1. Conectar a planilha (Google Sheets)
1. Crie uma planilha nova no Google Sheets.
2. `Extensões > Apps Script`.
3. Apague tudo e cole o conteúdo de `google-apps-script.gs`.
4. `Implantar > Nova implantação > App da Web`:
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
5. Copie a URL gerada (termina em `/exec`).

## 2. Configurar o formulário
Abra `index.html` e edite o bloco `CONFIG` no topo:
```js
const CONFIG = {
  SHEETS_URL: "URL_DO_APPS_SCRIPT_/exec",
  WHATSAPP: "5511999999999",   // só números, com 55
  WHATSAPP_MSG: "Olá! Acabei de garantir minha vaga...",
};
```

## 3. Publicar no GitHub Pages
1. Suba esta pasta num repositório no GitHub.
2. `Settings > Pages > Source: Deploy from a branch` → branch `main`, pasta `/root` (ou `/docs`).
3. A landing fica disponível em `https://SEU-USUARIO.github.io/SEU-REPO/`.

## Testar localmente
```bash
cd landing-aparelho
python3 -m http.server 8901
# abra http://localhost:8901/index.html
```

## Ajustes finos possíveis (próxima etapa)
- Trocar logo/cores (variáveis CSS em `:root`).
- Adicionar campos (e-mail, idade, "qual seu objetivo?").
- Pixel do Meta/Google Ads para conversão.
- Validação mais forte de telefone / DDD.
