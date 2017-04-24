function removeLanguage(form) {
  Logger.log("called function removeLanguage()");
  var ui = SpreadsheetApp.getUi();

  //confirms action.
  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to delete this language? It will delete all item information pertaining to that language.',
      ui.ButtonSet.YES_NO);
  if (result !== ui.Button.YES) {
    return;
  }
  
  //verifies form.
  var formLength = 0;
  for (var key in form) {
    Logger.log(key + " -> " + form[key]);
    formLength += 1;
  }
  if (formLength<1) {
    broken();
    return;
  }
  
  //deletes the language.
  var tabs = getTabs();
  for (i=0; i<tabs[0].length; i++) {
    Logger.log(parseInt(form.language)+3);
    tabs[0][i].deleteColumn(parseInt(form.language)+3);
  }
  for (i=0; i<tabs[1].length; i++) {
    Logger.log((form.language*3)+3);
    tabs[1][i].deleteColumns((form.language*3)+3,3);
  }
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Language removed successfully");
  Logger.log("finished function removeLanguage()");
}