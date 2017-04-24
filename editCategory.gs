function editCategory(form) {
  Logger.log("called function editCategory()");
  var rowIndex = 0;
  var values = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getDataRange().getValues();
  for (x in values){
    for (y in values[x]) {
      Logger.log(values[x][y] +' '+ form.category);
      if (values[x][y] == form.category) {
        rowIndex = parseInt(x)+1;
        break;
      }
    }
    if (rowIndex !== 0) {
      break;
    }
  }
  Logger.log(rowIndex);
  var tabs = getTabs();
  for (i=0; i<tabs[0].length; i++) {
    tabs[0][i].getRange(rowIndex,1).setValue(form.newCategoryName);
  }
  for (i=0; i<tabs[1].length; i++) {
    tabs[1][i].getRange(rowIndex,1).setValue(form.newCategoryName);
  }
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Category edited successfully");
  Logger.log("finished function editCategory()");
}
