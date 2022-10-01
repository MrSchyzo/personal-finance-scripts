namespace TutorialModal {
  export function show() {
    const htmlDlg = HtmlService.createHtmlOutput(
      `
        <a href="https://script.google.com/home/projects/1_50nr6t33yvc3geRS2nVF6M1GeLyt97d66WOPqITO8C-LnMy03EMzeiC/edit" target="_blank" rel="noopener noreferrer">Scriptino</a>
        <br><br>
        <a href="https://developers.google.com/codelabs/apps-script-fundamentals-1#0" target="_blank" rel="noopener noreferrer">Google Apps Script</a>
        <br><br>
        <a href="https://stackoverflow.com/questions/71219901/google-apps-script-a-select-drop-down-list-in-google-sheet" target="_blank" rel="noopener noreferrer">Dropdown list</a>
      `
    )
      .setSandboxMode(HtmlService.SandboxMode.NATIVE)
      .setWidth(640)
      .setHeight(360);

    SpreadsheetApp.getUi().showModalDialog(htmlDlg, "Link utili");
  }
}
