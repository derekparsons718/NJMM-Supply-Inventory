function moveRow() {
  var ui = SpreadsheetApp.getUi();
  var result1 = ui.prompt(
    'Enter the row number of the item you want to move:',
    ui.ButtonSet.OK_CANCEL);
  var button1 = result1.getSelectedButton();
  var row1 = result1.getResponseText();
  if (row1.match(/^\d+$/) || row1.match(/^\d+\.\d+$/)) {
  } else {
    ui.alert("The system did not accept your entry. Please enter a valid row number.");
    return;
  }
  var background = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(row1,1).getBackground()
  if (background !== "#efefef") {
    ui.alert("There is no item in that row. please enter a row that has an item in it.");
    return;
  }
  if (button1 == ui.Button.OK) {
    var start = parseInt(row1);
  } else {
    return;
  }
  var result2 = ui.prompt(
      "Enter the row number of the item's new position.",
      ui.ButtonSet.OK_CANCEL);
  var button2 = result2.getSelectedButton();
  var row2 = result2.getResponseText();
  if (row2.match(/^\d+$/) || row2.match(/^\d+\.\d+$/)) {
  } else {
    ui.alert("The system did not accept your entry. Please enter a valid row number.");
    return;
  }
  if (button2 == ui.Button.OK) {
    var end = parseInt(row2);
  } else {
    return;
  }
  if (start > end) {
    start+=1;
  } else if (end > start) {
    end+=1;
  } else if (end==start) {
    ui.alert("You entered the same number for both positions. The item will remain where it is.");
    return;
  }
  var background = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(row2,1).getBackground()
  if (background !== "#efefef") {
    ui.alert("That is not a row that you can move an item to. Please choose a valid destination.");
    return;
  }
  Logger.log("start = " + start);
  Logger.log("end = " + end);
  var tabsSimple = getTabs()[0];
  for (i=0; i<tabsSimple.length; i++) {
    tabsSimple[i].insertRowBefore(end);
    var lastColumn = tabsSimple[i].getLastColumn();
    var range1 = tabsSimple[i].getRange(start,1,1,lastColumn);
    var range2 = tabsSimple[i].getRange(end,1,1,lastColumn);
    range1.moveTo(range2);
    tabsSimple[i].deleteRow(start);
    Logger.log("tabsSimple loop = " + i);
  }
  var tabsComplex = getTabs()[1];
  for (i=0; i<tabsSimple.length; i++) {
    tabsComplex[i].insertRowBefore(end);
    var lastColumn = tabsComplex[i].getLastColumn();
    var range1 = tabsComplex[i].getRange(start,1,1,lastColumn);
    var range2 = tabsComplex[i].getRange(end,1,1,lastColumn);
    range1.moveTo(range2);
    tabsComplex[i].deleteRow(start);
    Logger.log("tabsComplex loop = " + i);
  }
  ui.alert("The item was moved successfully.");
}