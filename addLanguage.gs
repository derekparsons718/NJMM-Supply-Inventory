function addLanguage(form) {
  Logger.log("called function addLanguage()");
  
  //verifies form.
  var formLength = 0;
  for (var key in form) {
    Logger.log(key + " -> " + form[key]);
    formLength += 1;
  }
  if (formLength<2 || form.nameOfLanguage.length<3) {
    broken();
    return;
  }
  
  SpreadsheetApp.getUi().alert("It may take a moment (no more than a minute or two) for the language to be added. Please be patient and do not edit or close the spreadsheet until it is finished adding the language.")
  
  //adds the language.
  var tabs = getTabs();
  var height = tabs[1][0].getDataRange().getHeight();
  var width = tabs[0][2].getDataRange().getWidth();
  for (i=0; i<tabs[0].length; i++) {
    tabs[0][i].insertColumnAfter(width);
    tabs[0][i].getRange(2,width+1).setValue(form.nameOfLanguage);
    tabs[0][i].getRange(1,1,1,width+1).merge();
    for (row=1; row<height+1; row++) {
      var background = tabs[0][i].getRange(row,1).getBackground();
      var currentItem = tabs[0][2].getRange(row,1).getValue();
      if (background == "#efefef") {
        tabs[0][i].getRange(row,width+1).setBackground("black").setBorder(true,true,true,true,true,true).setHorizontalAlignment('right');
        for (x in form.items) {
          if (form.items[x] == currentItem) {
            Logger.log("form.items[x] = " + form.items[x]);
            tabs[0][i].getRange(row,width+1).setBackground("white");
          }
        }
      }
    }
  }
  var width = tabs[1][0].getDataRange().getWidth();
  for (i=0; i<tabs[1].length; i++) {
    tabs[1][i].insertColumnsAfter(width,3);
    tabs[1][i].getRange(2,width+2,1,2).setValue(form.nameOfLanguage).merge();
    var color = tabs[1][i].getRange(2,1).getBackground();
    tabs[1][i].getRange(2,width+1,height,1).setBackground(color).setBorder(false,null,false,null,null,null);
    tabs[1][i].setColumnWidth(width+1,25);
    tabs[1][i].getRange(1,1,1,width+3).merge();
    for (row=1; row<=height; row++) {
      var background = tabs[1][i].getRange(row,1).getBackground();
      var currentItem = tabs[0][2].getRange(row,1).getValue();
      if (background == "#efefef") {
        var columns = tabs[1][i].getRange(row,width+2,1,2).setBackground("black").setBorder(true,true,true,true,true,true).setHorizontalAlignment('right');
        if (i==0) {
          columns.setValue(0);
        }
        for (x in form.items) {
          if (form.items[x] == currentItem) {
            tabs[1][i].getRange(row,width+2,1,2).setBackground("white");
          }
        }
      }
    }
  }
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Language Added Successfully.");
  Logger.log("finished function addLanguage()");
}