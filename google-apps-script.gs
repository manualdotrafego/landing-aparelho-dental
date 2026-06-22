/**
 * GOOGLE APPS SCRIPT — Recebe os leads do formulário e grava na planilha.
 *
 * COMO USAR (passo a passo):
 * 1. Crie uma planilha nova no Google Sheets.
 * 2. Menu: Extensões > Apps Script.
 * 3. Apague o conteúdo padrão e cole TODO este arquivo.
 * 4. Clique em "Implantar" (Deploy) > "Nova implantação".
 * 5. Tipo: "App da Web" (Web app).
 *      - Executar como: "Eu" (sua conta)
 *      - Quem tem acesso: "Qualquer pessoa" (Anyone)
 * 6. Copie a URL gerada (termina em /exec) e cole em CONFIG.SHEETS_URL no index.html.
 *
 * A cada lead, uma linha é adicionada com: Data | Nome | Telefone | Origem
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads")
             || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");

    // cria cabeçalho na primeira vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data/Hora", "Nome", "Telefone", "Origem"]);
    }

    var dados = JSON.parse(e.postData.contents);
    var data = dados.data ? new Date(dados.data) : new Date();

    sheet.appendRow([
      Utilities.formatDate(data, "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss"),
      dados.nome || "",
      dados.telefone || "",
      dados.origem || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "erro", msg: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite testar abrindo a URL no navegador
function doGet() {
  return ContentService.createTextOutput("Webhook do formulário ativo ✅");
}
