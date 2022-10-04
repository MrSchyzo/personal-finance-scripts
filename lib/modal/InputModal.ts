/// <reference path="../ui/Fragments.ts"/>
/// <reference path="../ui/ViewModels.ts"/>

namespace InputModal {
  export function show(
    fields: Map<string, ViewModels.DataField>,
    processorName: string,
    promptSection: string
  ) {
    const page = Fragments.htmlPage(
      [
        Fragments.defaultHead(
          Fragments.htmlStyle(`
            body     { font-family: Roboto, Arial, Consolas, sans-serif; }
            form     { display: table; padding: 10px; }
            form div { display: table-row; padding: 10px;  }
            label    { display: table-cell; padding: 10px; }
            input    { display: table-cell; padding: 10px; }
            button   { display: table-cell; padding: 10px; }
          `)
        ),
        Fragments.inputFragment(
          promptSection,
          fields,
          processorName,
          "submissionButton"
        ),
      ].join("\n")
    );

    const htmlDlg = HtmlService.createHtmlOutput(page)
      .setSandboxMode(HtmlService.SandboxMode.NATIVE)
      .setWidth(480)
      .setHeight(360);

    SpreadsheetApp.getUi().showModalDialog(htmlDlg, promptSection);
  }
}
