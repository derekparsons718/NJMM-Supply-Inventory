function removeCategory(form) {
  Logger.log("called function removeCategory()");
  
  var formLength = 0
  for (var key in form) {
    Logger.log(key + " -> " + form[key]);
    formLength += 1;
  }
  if (formLength<1) {
    broken();
    return;
  }
  
  var rows = findCategoryRows(form);
  if (rows[0] == 0) {
    broken();
    return;
  }
  
  var items = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(rows[0]+1,1,rows[1]-2).getValues();
  var confirmed = confirmRemoveCategory(items);
  if (confirmed == false) {
    return;
  }
  
  var tabs = getTabs();
  for (i=0; i<tabs[0].length; i++) {
    tabs[0][i].deleteRows(rows[0],rows[1]);
  }
  for (i=0; i<tabs[1].length; i++) {
    tabs[1][i].deleteRows(rows[0],rows[1]);
  }
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Category removed successfully");
  Logger.log("finished function removeCategory()");
}


function findCategoryRows(form) {
  Logger.log("called function findCategoryRows");
  var template = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("template");
  var rowIndex = 0;
  
  for (i=1; i<500; i++) {
    var range = template.getRange(i,1);
    if (range.getBackground() !== "#efefef" && range.getValue() == form.category) {
      rowIndex = i;
      Logger.log(rowIndex);
    }
    var range2 = template.getRange(i+1,1);
    if (rowIndex !== 0 && range2.getBackground() !== "#efefef") {
      var length = i-rowIndex+2;
      Logger.log(length);
      break;
    }
  }
  var categoryRows = [rowIndex, length];
  Logger.log("finished function findCategoryRows()");
  return categoryRows;
}


function confirmRemoveCategory(items) {
  Logger.log("called function confirmRemoveCategory()");
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
     'Please confirm',
     'Removing this category will also remove all of the items it contains. Do you still want to remove this category? The item(s) that will be deleted are: ' + items + '.',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    Logger.log("finished function confirmRemoveCategory()");
    return true;
  } else {
    Logger.log("finished function confirmRemoveCategory()");
    return false;
  }
}