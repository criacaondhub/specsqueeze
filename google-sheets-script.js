/**
 * Google Apps Script — Spec Squeeze Leads
 *
 * COMO INSTALAR:
 * 1. Abra a planilha: https://docs.google.com/spreadsheets/d/1ayBBC09GsT5GLvKKu8qPTa4ib1qf595zSV96RDrJqaQ
 * 2. Menu → Extensões → Apps Script
 * 3. Apague o conteúdo padrão e cole TODO este arquivo
 * 4. Salve (Ctrl+S)
 * 5. Menu → Implantar → Nova implantação
 *    - Tipo: App da Web
 *    - Executar como: Eu (sua conta Google)
 *    - Quem tem acesso: Qualquer pessoa (anônimo)
 * 6. Clique em "Implantar" e copie a URL gerada
 * 7. No projeto React, adicione ao .env:
 *    VITE_GOOGLE_SHEETS_URL=<URL copiada acima>
 * 8. Na aba "Leads" da planilha, crie os cabeçalhos na linha 1:
 *    Data | Nome | E-mail | WhatsApp | Cidade/UF
 */

const SHEET_NAME = "Leads";
const SPREADSHEET_ID = "1ayBBC09GsT5GLvKKu8qPTa4ib1qf595zSV96RDrJqaQ";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: `Aba "${SHEET_NAME}" não encontrada.` }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    const row = [
      new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      data.nome || "",
      data.email || "",
      data.whatsapp || "",
      data.cidadeUf || "",
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite testar via GET no navegador sem quebrar
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Spec Squeeze Sheets endpoint ativo." }))
    .setMimeType(ContentService.MimeType.JSON);
}
