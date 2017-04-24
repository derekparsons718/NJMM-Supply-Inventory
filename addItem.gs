//finds the row in which a new item may be inserted.
function findRow(form) {
  Logger.log("called function findRow");
  var columnA = getColumnA();
  var columnAValues = columnA.getValues();
  var isCorrectCategory = false;
  var rowIndex = 0;
  
  for (i=1; i<500; i++) {
    var location = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template").getRange(i,1);
    
    if (columnAValues[i-1] == form.category) {
      isCorrectCategory = true;;
    }
    
    if (location.isBlank() && isCorrectCategory == true) {
      rowIndex = i;
      break;
    }
  }
  return rowIndex;
}


//Adds an item to all tabs of the spreadsheet.
function addItem(form) {
  Logger.log("called function addItem()");
  var isValid = false;
  var formLength = 0;
  for (var key in form) {
    Logger.log(key + " -> " + form[key]);
    formLength += 1;
  }
  if (form.nameOfItem.length>0 && form.category.length>0 && form.set.length>0 && formLength>3) {
    isValid = true;
  } else {
    broken();
  }
  if (isValid = false) {
    return;
  }
  var rowIndex = findRow(form);
  if (rowIndex == 0) {
    broken();
    return;
  }
  setDataForTabsSimple(rowIndex,form);
  setDataForTabsComplex(rowIndex,form);
  fixRedTab();
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Item added successfully");
  Logger.log("Finished!");
}



function setDataForTabsSimple(rowIndex,form) {
  Logger.log("called function setDataForTabsSimple()");
  var numberOfLanguages = getNumberOfLanguages();
  var Languages = getLanguages();
  var tabsSimple = getTabs()[0];
  for (i=0; i<tabsSimple.length; i++) {
    tabsSimple[i].insertRowAfter(rowIndex-1);
    
    tabsSimple[i].getRange(rowIndex,1)
      .setValue(form.nameOfItem)
      .setHorizontalAlignment("left")
      .setFontStyle("normal");
    tabsSimple[i].getRange(rowIndex,2)
      .setValue(form.set)
      .setHorizontalAlignment("center");
    
    tabsSimple[i].getRange(rowIndex,1,1,2)
      .setBackground("#efefef")
      .setBorder(true,true,true,true,true,true);
    
    tabsSimple[i].getRange(rowIndex,3,1,numberOfLanguages)
      .setBackground("black")
      .setBorder(true,true,true,true,true,true)
      .setHorizontalAlignment("right");
      
    for (a=0; a<form.language.length; a++) {
      var column = parseInt(form.language[a]) +3;
      tabsSimple[i].getRange(rowIndex,column).setBackground("white");
    }
  }
}



function setDataForTabsComplex(rowIndex,form) {
  Logger.log("called function setDataForTabsComplex()");
  var tabsComplex = getTabs()[1];
  var Languages = getLanguages();
  var numberOfLanguages = getNumberOfLanguages();
  for (i=0; i<tabsComplex.length; i++) {
    tabsComplex[i].insertRowAfter(rowIndex-1);
    
    tabsComplex[i].getRange(rowIndex,1)
      .setValue(form.nameOfItem)
      .setHorizontalAlignment("left")
      .setFontStyle("normal");
    tabsComplex[i].getRange(rowIndex,2)
      .setValue(form.set)
      .setHorizontalAlignment("center");
    
    tabsComplex[i].getRange(rowIndex,1,1,2)
      .setBackground("#efefef")
      .setBorder(true,true,true,true,true,true);
    
    var locations = [];
    for (b=0; b<numberOfLanguages; b++) {
      locations.push(tabsComplex[i].getRange(rowIndex,4+(3*b),1,2));
    }
    for (c=0; c<locations.length; c++) {
      locations[c]
      .setBackground("black")
      .setBorder(true,true,true,true,true,true)
      .setHorizontalAlignment("right");
    }

    for (a=0; a<form.language.length; a++) {
      var lang = parseInt(form.language[a]);
      var column = lang +4+(2*lang);
      tabsComplex[i].getRange(rowIndex,column,1,2).setBackground("white");
      if (i==0) {
        tabsComplex[0].getRange(rowIndex,column,1,2).setValue("0");
      }
    }
  }
}