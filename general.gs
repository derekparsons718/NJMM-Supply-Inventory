//adds a menu to the spreadsheet.
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('NJMM')
  .addItem('Submit Intake and Outtake forms', 'compile')
  .addSeparator()
  .addSubMenu(ui.createMenu('Supply Orders')
              .addItem('Mark that the supplies have been ordered', 'ordered'))
  .addSeparator()
  .addSubMenu(ui.createMenu('Edit Inventory')
              .addItem('Add Item to Inventory', 'addItemDialogue')
              .addItem('Edit Item in Inventory', 'editItemDialogue')
              .addItem('Remove Item from Inventory', 'removeItemDialogue')
              .addItem('Change Item Position', 'moveRow')
              .addSeparator()
              .addItem('Add Category', 'addCategoryDialogue')
              .addItem('Edit Category', 'editCategoryDialogue')
              .addItem('Remove Category', 'removeCategoryDialogue')
              .addSeparator()
              .addItem('Add Language', 'addLanguageDialogue')
              .addItem('Remove Language', 'removeLanguageDialogue'))
  .addToUi();
}


//gets the number of languages in the sheet.
function getNumberOfLanguages() {
  Logger.log("called function getNumberOfLanguages()");
  var width = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getDataRange().getWidth();
  return width-2;
}


//gets the names of the languages in the sheet.
function getLanguages() {
  Logger.log("called function getLanguages()");
  var numberOfLanguages = getNumberOfLanguages();
  var Languages = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(2,3,1,numberOfLanguages).getValues();
  Logger.log("finished function getLanguages()");
  return Languages;
}


function getCategories() {
  Logger.log("called function getCategories()");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template");
  var columnA = getColumnA();
  var columnAValues = columnA.getValues();
  var categories = [];
  for (i=0; i<columnAValues.length; i++) {
    var background1 = sheet.getRange(i+1,1).getBackground();
    var background2 = sheet.getRange(i+2,1).getBackground();
    if (background1 !== "#efefef" && background2 == "#efefef") {
      categories.push(columnAValues[i]);
    }
  }
  Logger.log(categories);
  Logger.log("finished function getCategories()");
  return categories;
}


//Retrieves the tabs containing items that could be deleted or added.
function getTabs() {
  Logger.log("called function getTabs()");
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tabsSimple = [ss.getSheetByName("Desired Inventory"),
                    ss.getSheetByName("Template"),
                    ss.getSheetByName("Needs to be Ordered")];
  var tabsComplex = [ss.getSheetByName("Actual Inventory"),
                     ss.getSheetByName("Intake"),
                     ss.getSheetByName("Outtake")];
  var tabs = [tabsSimple,tabsComplex];
  Logger.log("finished function getTabs()");
  return tabs;
}


//gets a list of the inventory items listed in the template sheet.
function getColumnA() {
  Logger.log("called function getColumnA()");
  var template = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template");
  var height = template.getDataRange().getHeight();
  var columnA = template.getRange(1,1,height);
  Logger.log("finished function getColumnA()");
  return columnA;
}


function broken() {
  SpreadsheetApp.getUi().alert('The request was not completed. Make sure you entered all necessary information.');
}


function getStatus() {
  Logger.log("called function getStatus()");
  var values = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1048NpRJi_9SQbjFQNthethTz7ws83bAknFCG4z_eZlU/edit#gid=1066641144").getSheetByName("Code Data").getDataRange().getValues();
  var x;
  var y;
  var status = 0;
  for (x in values) {
    for (y in values[x]) {
      if (values[x][y] == 1) {
        status = values[x][y-1];
      }
    }
  }
  Logger.log("finished function getStatus(), returning '" + status + "'");
  return status;
}


function fixRedTab() {
  Logger.log("called function fixRedTab()");
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formulas = []
  var red = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Needs to be Ordered").getDataRange();
  var redBackgrounds = red.getBackgrounds();
  var height = red.getHeight();
  var width = red.getWidth();
  var special = false;
  for (row=0; row<height; row++) {
    var farLeftBackground = redBackgrounds[row][0];
    if (farLeftBackground == "#efefef") {
      if (row > 0 && ss.getSheetByName("Needs to Be Ordered").getRange(row,1).getValue() == "Special Requests") {
        special = true;
      }
      if (special == true) {
        for (i=0; i<2; i++) {
          var cell0 = ss.getSheetByName("Needs to be Ordered").getRange(row+1,i+1);
          var cell0A1 = cell0.getA1Notation();
          var formula0 = "='Monthly Order'!" + cell0A1;
          cell0.setFormula(formula0);
        }
      }
      for (cell=0; cell<width-2; cell++) {
        var cell1 = ss.getSheetByName("Needs to be Ordered").getRange(row+1,cell+3);
        var cell2 = ss.getSheetByName("Actual Inventory").getRange(row+1,4+(3*cell));
        var cell1A1 = cell1.getA1Notation();
        var cell2A1 = cell2.getA1Notation();
        var formula = "='Desired Inventory'!" + cell1A1 + "+'Monthly Order'!" + cell1A1 + "-'Actual Inventory'!" + cell2A1;
        cell1.setFormula(formula);
      }
    }
  }
  Logger.log("finished function fixRedTab()");
}


function ordered() {
  Logger.log("called function ordered()");
  var status = getStatus();
  if (status !== "Submitted") {
    SpreadsheetApp.getUi().alert('The supplies have not yet been submitted by the Office Elders. Please wait until the supplies are submitted before ordering.');
    return;
  }
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Monthly Order").getDataRange().clear();
  SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1048NpRJi_9SQbjFQNthethTz7ws83bAknFCG4z_eZlU/edit#gid=1066641144").getSheetByName("Code Data").getRange(1,2,2,1).setValue(0);
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Function complete. Thank you for ordering the supplies!");
  Logger.log("finished function ordered()");
}


function getItems() {
  Logger.log("called function getItems()");
  var template = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template");
  var height = template.getDataRange().getHeight();
  var items = []
  for (i=0; i<height; i++) {
    var range = template.getRange(i+1,1);
    var background = range.getBackground();
    var isBlank = range.isBlank();
    if (background == "#efefef" && isBlank == false) {
      items.push(range.getValue())
    }
  }
  Logger.log("finished function getItems()");
  return items;
}