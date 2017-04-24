function addItemDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Add Item')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(400)
      .setHeight(500);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Add an Item');
}


function removeItemDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Remove Item')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(300)
      .setHeight(300);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Remove an Item');
}


function editItemDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Edit Item')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(700)
      .setHeight(425);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Edit an Item');
}


function addCategoryDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Add Category')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(400)
      .setHeight(400);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Add a Category');
}


function editCategoryDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Edit Category')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(350)
      .setHeight(300);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Edit a Category');
}


function removeCategoryDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Remove Category')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(350)
      .setHeight(250);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Remove a Category');
}


function addLanguageDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Add Language')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(525)
      .setHeight(550);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Add a Language');
}


function removeLanguageDialogue() {
  var status = getStatus();
  if (status !== 0) {
    SpreadsheetApp.getUi().alert('You cannot make this change while the current supply orders are in progress. Please wait until the supplies are ordered.');
    return;
  }
  var html = HtmlService.createTemplateFromFile('Remove Language')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(325)
      .setHeight(200);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Remove a Language');
}