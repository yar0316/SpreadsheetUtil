/**
 * 指定シートのコピーを、同一スプレッドシート内に作成する
 * @param sheetId スプレッドシートID
 * @param sheetName 作成するコピーのシート名
 * @param master コピー元のシート名
 * return 指定のシート
 */
function getCopySheet(sheetId, sheetName, master){
  //コピー元を取得
  const templateSpreadsheet = SpreadsheetApp.openById(sheetId);
  var masterSheet = templateSpreadsheet.getSheetByName(master);
  masterSheet.activate();
  //コピーを作成
  var copySheet = templateSpreadsheet.duplicateActiveSheet();
  try{
    copySheet.setName(sheetName);
  }catch(e){
    const altName = Browser.inputBox(sheetName + 'は使えません。別の名前を入力してください。', Browser.Buttons.OK_CANCEL);
    copySheet.setName(altName);
  }
  return copySheet;
}

/**
 * 対象スプレッドシートのIDと取得したいシート名からシートを取得
 * @param sheetId スプレッドシートのID
 * @param sheetName 取得したいシートのシート名
 * return 指定のシート
 */
function getSheet(sheetId, sheetName){
  const templateSpreadsheet = SpreadsheetApp.openById(sheetId);
  return templateSpreadsheet.getSheetByName(sheetName);
}

/**
 * 書き込み用関数を返す
 * @param 書き込み先ファイル
 */
function getWriter(subjectSheet){
  /**
  * セルにデータの書き込みを行う
  * @param rangeAddress 書き込み対象セルのアドレス
  * @param input 入力する値
  */
  const writer = function(destination, input){
    var subject = subjectSheet.getRange(destination);
    subject.setValue(input);
  };
  
  return writer;
}

/*
 * 指定したシート、指定列から指定したデータの入った行のインデックスを取得
 * @param sheet 対象シート
 * @param val 検索する値
 * @param col 指定列インデックス
 * return 値の入った行のインデックス
 */
function findRow(sheet,val,col){
 
  var dat = sheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得
 
  //指定列から該当データを検索して行のインデックスを返す
  for(var i=1;i<dat.length;i++){
    if(dat[i][col] === val){
      return i;
    }
  }
  //存在しなければ404を返す(まぎらわしい？)
  return 404;
}

/*
 * 指定したシート、指定行から指定したデータの入った列のインデックスを取得
 * @param sheet 対象シート
 * @param val 検索する値
 * @param row 指定行インデックス
 * return 値の入った列のインデックス
 */
function findColumn(sheet, val, row){
  var dat = sheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得
 
  //指定列から該当データを検索して行のインデックスを返す
  for(var i=1;i<dat.length;i++){
    if(dat[row][i] === val){
      return i;
    }
  }
  //存在しなければ404を返す(まぎらわしい？)
  return 404;
}

/**
 * 指定したセル範囲に、チェックボックスを設定する。
 * @param subjectSheet 対象シート
 * @param startRowIndex 開始行インデックス
 * @param endRowIndex 終了行インデックス
 * @param startColumnIndex 開始列インデックス
 * @param endColumnIndex 終了列インデックス
 */
function setCheckBoxes(subjectSheet, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex){
  const thisSpreadsheet = subjectSheet.getParent();
  const ssId = subjecetSheet.getId();
  const resource = {"requests":[
    {
      "replaceCell":{
        "cell": {"dataValidation": {"condition": {"type": "BOOLEAN"}}},
        "range": {"sheetId": ssId, "startRowIndex": startRowIndex, "endRowIndex": endRowIndex, "startColumnIndex": startColumnIndex, "endColumnIndex": endColumnIndex},
        "fields": "dataValidation",
      }
    }
  ]};
  Sheets.Spreadsheets.batchUpdate(resource, thisSpreadsheet.getId());
}
