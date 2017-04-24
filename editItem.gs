function editItem(form) {
  Logger.log("called function editItem()");
  
  //counts and logs the form entries.
  var formLength = 0;
  for (var key in form) {
    Logger.log(key + " -> " + form[key]);
    formLength += 1;
  }
  
  //validates the form.
  if (form.nameOfItem.length<1 || form.newName.length<1 || form.newSet.length<1 || formLength<5) {
    broken();
    return;
  }
  
  //gets the row number of the specified item.
  var rowIndex = findItem(form);
  if (rowIndex == 0) {
    broken();
    return;
  }
  
  //sets the new name and new set number in all applicable spreadsheets.
  var tabs = getTabs();
  for (i=0; i<tabs[0].length; i++) {
    tabs[0][i].getRange(rowIndex,1).setValue(form.newName);
    tabs[0][i].getRange(rowIndex,2).setValue(form.newSet);
  }
  for (i=0; i<tabs[1].length; i++) {
    tabs[1][i].getRange(rowIndex,1).setValue(form.newName);
    var oldSet = tabs[0][i].getRange(rowIndex,2).getValue();
    var tabsComplex = getTabs()[1];
    var numberOfLanguages = getNumberOfLanguages();
    if (oldSet !== form.newSet) {
      for (a=0; a<numberOfLanguages; a++) {
        tabsComplex[i].getRange(rowIndex,4+(3*a)).setValue(tabsComplex[i].getRange(rowIndex,5+(3*a)).getValue() / form.newSet); //fixes any discrepencies between the old number of actual sets and the new number of actual sets.
      }
    }
    tabs[1][i].getRange(rowIndex,2).setValue(form.newSet);
  }
  
  //sets all language cells in the specified row to black.
  var tabsSimple = getTabs()[0];
  var availableLanguages = getLanguages()[0];
  for (i=0; i<tabsSimple.length; i++) {
    tabsSimple[i].getRange(rowIndex,3,1,numberOfLanguages).setBackground("black");
    for (a=0; a<numberOfLanguages; a++) {
      tabsComplex[i].getRange(rowIndex,4+(3*a),1,2).setBackground("black");
    }
  }
  
  //prepares an array in case the form.languages object returns a single string.
  var formLanguages = [];
  if (typeof form.languages == "string") {
    formLanguages.push(form.languages);
  } else {
    formLanguages = form.languages;
  }
  
  //colors the appropriate cells white.
  for (var x in formLanguages) {
    for (var y in availableLanguages) {
      if (formLanguages[x]==availableLanguages[y]) {
        var column = availableLanguages.indexOf(availableLanguages[y]) + 3;
        for (i=0; i<tabsSimple.length; i++) {
          tabsSimple[i].getRange(rowIndex,column).setBackground("white");
        }
        column = 4+(3*availableLanguages.indexOf(availableLanguages[y]));
        for (i=0; i<tabsSimple.length; i++) {
          tabsComplex[i].getRange(rowIndex,column,1,2).setBackground("white");
        }
      }
    }
  }
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Item edited successfully");
  Logger.log("Finished!");
}