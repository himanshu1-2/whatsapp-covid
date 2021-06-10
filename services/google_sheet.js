
async function sheetService(googleSheets) {

  // SERVICE METHODS

  async function addToSheet(document, sheetName, rowToAdd) {
    //const documents = await authGoogleSheets(document);
    const sheet = googleSheets[document].sheetsByTitle[sheetName];
    //const moreRows = await sheet.addRows(rowsToAdd);

    return await sheet.addRow(rowToAdd);
  }

  async function readSheet(document, sheetName) {
    // const documents = await authGoogleSheets(document);
    const sheet = googleSheets[document].sheetsByTitle[sheetName];
    return await sheet.getRows();
  }

  return {
    addToSheet,
    readSheet
  }
}

module.exports = { sheetService };
