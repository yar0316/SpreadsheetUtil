
/**
 * フォーム回答のようなデータベース型の表から、最新のデータを返す
 * @param dataSheet　取得対象のシート
 * return 最新のデータ（最終行）
 */
function getLatestData(dataSheet){
  const lastRow = dataSheet.getLastRow();
  const lastColumn = dataSheet.getLastColumn();
  
  //データの入った最終行を取得
  const dataRange = dataSheet.getRange(lastRow, 1, 1, lastColumn);
  //データ範囲のすべてのデータを取得
  const values = dataRange.getValues()[0];
  //要素数[1][n]の二次元配列として帰ってくるので、1次元配列として返す
  return values;
}

/**
 * データ行検索　主キー（1列目）の値を指定し、該当行のデータを返す
 * @param key 主キー
 * @param subjectSheet 取得先のシートオブジェクト
 * return データ行（1行のみ）
 */
function getRecord(subjectSheet, key){
  const dataRow = findRow(subjectSheet, key, 0);
  
  //データ行の行数取得が成功していればデータ行を返す
  if(dataRow != 404){
    const values = subjectSheet.getDataRange().getValues();
    const dataArray = values[dataRow];
    return dataArray;
  }else{
    return null;
  }  
}

/**
 * テーブルのタイトル行を取得する
 * @param subjectSheet 対象のテーブルを扱うシート
 * return タイトル行のデータ配列
 */
function getTitleRow(subjectSheet){
  const titleRow = subjectSheet.getValues()[0];
  return titleRow;
}
