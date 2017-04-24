function addCategory(form) {
  Logger.log("called function addCategory()");
  var formLength = 0
  for (var key in form) {
    Logger.log(key + " -> " + form[key]);
    formLength += 1;
  }
  if (form.nameOfItem.length<1 || formLength<4 || form.nameOfCategory.length<1) {
    broken();
    return;
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var height = ss.getSheetByName("Actual Inventory").getDataRange().getHeight();
  setCategoryForTabsSimple(height,form);
  setCategoryForTabsComplex(height,form);
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Category added successfully");
  Logger.log("finished function addCategory()");
}


function setCategoryForTabsSimple(rowIndex,form) {
  Logger.log("called function setCategoryForTabsSimple()");
  var numberOfLanguages = getNumberOfLanguages();
  var Languages = getLanguages();
  var tabsSimple = getTabs()[0];
  rowIndex = rowIndex+2;
  Logger.log(rowIndex);
  for (i=0; i<tabsSimple.length; i++) {
    tabsSimple[i].insertRowAfter(rowIndex-1);
    tabsSimple[i].insertRowAfter(rowIndex);
    
    tabsSimple[i].getRange(rowIndex,1).setValue(form.nameOfCategory)
      .setHorizontalAlignment("center")
      .setFontStyle("italic");
    tabsSimple[i].getRange(rowIndex,2)
      .setValue("1 Set =")
      .setHorizontalAlignment("center")
      .setFontStyle("italic");
    
    tabsSimple[i].getRange(rowIndex,3,1,numberOfLanguages)
      .merge()
      .setValue("How many sets?")
      .setFontStyle("italic")
      .setHorizontalAlignment("center");
  }
  setDataForTabsSimple(rowIndex+1,form);
  Logger.log("finished function setCategoryForTabsSimple()");
}


function setCategoryForTabsComplex(rowIndex,form) {
  Logger.log("called function setCategoryForTabsComplex()");
  var tabsComplex = getTabs()[1];
  var Languages = getLanguages();
  var numberOfLanguages = getNumberOfLanguages();
  rowIndex = rowIndex+2
  for (i=0; i<tabsComplex.length; i++) {
    tabsComplex[i].insertRowAfter(rowIndex-1);
    tabsComplex[i].insertRowAfter(rowIndex);
    
    tabsComplex[i].getRange(rowIndex,1).setValue(form.nameOfCategory)
      .setHorizontalAlignment("center")
      .setFontStyle("italic");
    tabsComplex[i].getRange(rowIndex,2)
      .setValue("1 Set =")
      .setHorizontalAlignment("center")
      .setFontStyle("italic");
    
    for (b=0; b<numberOfLanguages; b++) {
      tabsComplex[i].getRange(rowIndex,4+(3*b),1,2)
        .setValues([["Sets","Individuals"]])
        .setHorizontalAlignment("center")
        .setFontStyle("italic");
    }
  }
  setDataForTabsComplex(rowIndex+1,form);
  Logger.log("finished function setCategoryForTabsComplex()");
}