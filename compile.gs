function compile() {
  Logger.log("called function compile()");
  var confirmed = confirmCompile();
  if (confirmed !== true) {
    return;
  }
  var ss = SpreadsheetApp.getActive();
  var In = ss.getSheetByName("Intake");
  var Out = ss.getSheetByName("Outtake");
  var Actual = ss.getSheetByName("Actual Inventory");
  var Logs = ss.getSheetByName("Logs");
  
  //creates 3 arrays containing the necessary data from the sheets.
  var intakeValues = In.getDataRange().getValues();
  var outtakeValues = Out.getDataRange().getValues();
  var actualRange = Actual.getDataRange();
  var actualValues = actualRange.getValues();
  
  //gets the height and width of the data
  var actualRangeHeight = actualRange.getHeight();
  var actualRangeWidth = actualRange.getWidth();
  
  //does all the calculating and output.
  for (c=0; c<actualRangeWidth; c++) {
    if (actualValues[2][c] == "Individuals") {
      for (r=3; r<actualRangeHeight; r++) {
        if (typeof intakeValues[r][c] == "number" || typeof outtakeValues[r][c] == "number") {
          Logger.log(r + " " + c);
          var difference =  intakeValues[r][c] - outtakeValues[r][c]; // the difference between the corresponding intake and outtake cells.
          var constant = actualValues[r][1]; //determines the number of individuals per set.
          Actual.getRange(r+1,c+1).setValue(actualValues[r][c] + difference); //sets the new value for the Individuals column in row r.
          actualValues[r][c] = actualValues[r][c] + difference; //updates the array.
          Actual.getRange(r+1,c).setValue(actualValues[r][c-1] + (difference/constant)); //sets the new value for the Sets column in row r based on the change in the adjacent Individuals column.
          actualValues[r][c-1] = actualValues[r][c-1] + (difference/constant); //updates the array.
          In.getRange(r+1,c+1).clearContent(); //clears the intake cell.
          Out.getRange(r+1,c+1).clearContent(); // clears the outtake cell.
        }
      }
    }
    if (actualValues[2][c] == "Sets") {
      for (r=3; r<actualRangeHeight; r++) {
        if (typeof intakeValues[r][c] == "number" || typeof outtakeValues[r][c] == "number") {
          Logger.log(r + " " + c);
          var difference =  intakeValues[r][c] - outtakeValues[r][c]; // the difference between the corresponding intake and outtake cells.
          var constant = actualValues[r][1]; //determines the number of individuals per set.
          Actual.getRange(r+1,c+1).setValue(actualValues[r][c] + difference); //sets the new value for the Sets column in row r.
          actualValues[r][c] = actualValues[r][c] + difference; //updates the array.
          Actual.getRange(r+1,c+2).setValue(actualValues[r][c+1] + (difference*constant)); //sets the new value for the Individuals column in row r based on the change in the adjacent Individuals column.
          actualValues[r][c+1] = actualValues[r][c+1] + (difference*constant); //updates the array.
          In.getRange(r+1,c+1).clearContent(); //clears the intake cell.
          Out.getRange(r+1,c+1).clearContent(); // clears the outtake cell.
        }
      }
    }
  }
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Intake has been added to the Actual Inventory and Outtake has been subtracted from the Actual Inventory.");
  Logger.log("finished function compile()");
}


function confirmCompile() {
  Logger.log("called function confirmCompile()");
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to submit the Intake and Outtake sheets? All the data in these sheets will be erased and added to the Actual Inventory sheet.',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    Logger.log("finished function confirmCompile()");
    return true;
  } else {
    Logger.log("finished function confirmCompile()");
    return false;
  }
}