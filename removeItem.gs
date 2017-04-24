//Removes an item from all tabs of the spreadsheet.
function removeItem(form) {
  Logger.log("called function removeItem()");
  var formLength = 0
  for (var key in form) {
    Logger.log(key + " -> " + form[key]);
    formLength += 1;
  }
  if (form.nameOfItem.length<1 || formLength<2) {
    broken();
    return;
  }
  var rowIndex = findItem(form);
  if (rowIndex == 0) {
    broken();
    return;
  }
  var tabs = getTabs();
  for (i=0; i<tabs[0].length; i++) {
    tabs[0][i].deleteRow(rowIndex);
  }
  for (i=0; i<tabs[1].length; i++) {
    tabs[1][i].deleteRow(rowIndex);
  }
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Item removed successfully");
  Logger.log("Finished!");
}

//finds the location of the item that needs to be removed
function findItem(form) {
  Logger.log("called function findItem");
  var columnA = getColumnA();
  var columnAValues = columnA.getValues();
  var isCorrectCategory = false;
  var rowIndex = 0;
  
  for (i=1; i<500; i++) {
    
    if (columnAValues[i-1] == form.category) {
      isCorrectCategory = true;
    }
    
    if (columnAValues[i-1] == form.nameOfItem && isCorrectCategory == true) {
      rowIndex = i;
      break;
    }
  }
  return rowIndex;
}