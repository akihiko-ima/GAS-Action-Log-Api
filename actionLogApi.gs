// --------------------------------------------------
// google Apps Scrip(GAS) + Spread sheetで実行
// --------------------------------------------------

function doGet(e) {
  // レスポンスとしてOKのメッセージを返す
  return ContentService.createTextOutput("Connection OK").setMimeType(
    ContentService.MimeType.TEXT
  );
}

function doPost(e) {
  const SHEET_ID = "Your spreadsheet ID";
  const SHEET_NAME = "Your spreadsheet NAME";

  try {
    // POSTリクエストで送信されたJSONデータをパース
    var jsonData = JSON.parse(e.postData.contents);

    // スプレッドシートのIDを指定
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // スプレッドシートにデータを追加
    jsonData.forEach(function (data) {
      sheet.appendRow([data.count, data.time]);
    });

    // レスポンスを返す
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // エラーハンドリング
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
